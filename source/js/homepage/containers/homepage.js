import React from 'react';
import axios from 'axios';
import webcam from 'webcamjs';

import HomepageLayout from '../components/homepageLayout';
import FeedContainer from '../components/feedContainer';
import Widgets from './widgetsContainer';
import Loader from '../../widgets/loader';
import ModalCamera from '../../widgets/modal-camera';

class Homepage extends React.Component {
    state = {
        user: null,
        posts: null,
        loading: true,
        location: null,
        uploading: false,
        modalCamera: false,
        defaultButtons: true,
        userID: null
    }

    componentWillMount() {
        const user = localStorage.getItem('user')
        const userInfo = JSON.parse(user)

        this.setState({
            user: userInfo
        })
    }

    getUserLocation =  () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( (position) => {

                axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=614cbe4035a04205bc7d3451acfe5004`)
                    .then(res => {
                        const components = res.data.results[0].components

                        const county = components.county
                        const state = components.state_code

                        this.setState({
                            location: {
                                county,
                                state
                            }
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })  

        } else {
            console.log('Geolocation is not supported')
        }
        
    }

    getPosts = () => {
        axios.get('/api/posts')
            .then(res => {
                const posts = res.data.posts

                if (!posts) {
                    console.log('No posts yet')
                }

                return posts
            })
            .then(posts => {
                return this.setState({
                    posts,
                    loading: false
                })
                
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.getPosts()
        this.getUserLocation()
    }

    openModal = async () => {
        await this.setState({
            modalCamera: true,
            defaultButtons: true
        })

        webcam.set({
            width: 350,
            height: 260,
            flip_horiz: true
        })

        webcam.attach('#open-camera')
    }

    freeze = async () => {
        webcam.freeze()

        await this.setState({
            defaultButtons: false
        })
    }

    unfreeze = async () => {
        webcam.unfreeze()

        await this.setState({
            defaultButtons: true
        })
    }

    getUserID = () => {
        const user = localStorage.getItem('user')
        const userParsed = JSON.parse(user)

        const ID = userParsed.id

        return ID
    }

    postSnap = () => {
        webcam.snap((photo_uri) => {
            this.setState({
                uploading: true
            })

            const ID = this.getUserID()
            const url = `/api/posts?_id=${ID}&location=${this.state.location.county}, ${this.state.location.state}`

            webcam.upload(photo_uri, url, (code, text) => {
                if (code === 200) {
                    this.setState({
                        uploading: false
                    })

                    this.closeModal()
                    this.getPosts()
                }
            })
            
        })
    }

    closeModal = async () => {
        await this.setState({
            modalCamera: false
        })

        webcam.reset()
    }

    render() {
        return (
            <HomepageLayout>
                {
                    this.state.loading ?
                    <Loader></Loader>
                    :
                    <div>
                        <ModalCamera userID={this.state.user.id} openModal={this.openModal} freeze={this.freeze} unfreeze={this.unfreeze} location={this.state.location} postSnap={this.postSnap} closeModal={this.closeModal} uploading={this.state.uploading} modalCamera={this.state.modalCamera} defaultButtons={this.state.defaultButtons}></ModalCamera>
                        <FeedContainer postsData={this.state.posts}></FeedContainer>
                        <Widgets userInfo={this.state.user}></Widgets>
                    </div>
                }
            </HomepageLayout>
        )
    }
}

export default Homepage;