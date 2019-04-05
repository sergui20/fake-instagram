import React from 'react';
import axios from 'axios';
import webcam from 'webcamjs';

import HomepageLayout from '../components/homepageLayout';
import FeedContainer from '../components/feedContainer';
import Widgets from './widgetsContainer';
import Loader from '../../widgets/loader';
import FileForm from '../../widgets/file-form';

class Homepage extends React.Component {
    state = {
        user: null,
        posts: [],
        loading: true,
        location: null,
        uploading: false,
        modalCamera: false,
        defaultButtons: true,
        userID: null,
        fileButtons: false,
        filePath: null
    }

    setForm = (form) => {
        this.form = form
        console.log(this.form)
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
                            },
                            loading: false
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }, (error) => {
                if (error.code == error.PERMISSION_DENIED) {
                    this.setState({
                        location: null,
                        loading: false
                    })

                    console.log("You denied Geolocation")
                }
            })  

        } else {
            console.log('Geolocation is not supported');
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
                    posts
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

            let url

            if (this.state.location) {
                url = `/api/posts?_id=${ID}&location=${this.state.location.county}, ${this.state.location.state}`
            } else {
                url = `/api/posts?_id=${ID}`
            }

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

    handleFile = (ev) => {
        console.log(ev.target.files)
        const fileName = ev.target.files[0].name

        this.setState({
            filePath: fileName,
            fileButtons: true
        })
    }

    cancelFile = () => {
        this.setState({
            fileButtons: false
        })
    }

    submitFile = (ev) => {
        ev.preventDefault()

        this.setState({
            uploading: true
        })

        const ID = this.getUserID()

        let url

        if (this.state.location) {
            url = `/api/posts?_id=${ID}&location=${this.state.location.county}, ${this.state.location.state}`
        } else {
            url = `/api/posts?_id=${ID}`
        }


        const formData = new FormData(this.form)

        axios.post(url, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
                if (res.data.ok) {
                    this.setState({
                        fileButtons: false,
                        modalCamera: false,
                        uploading: false
                    })

                    this.getPosts()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <HomepageLayout>
                {
                    this.state.loading ?
                    <Loader></Loader>
                    :
                    <div>
                        <FileForm setForm={this.setForm} uploading={this.state.uploading} userID={this.state.user.id} fileButtons={this.state.fileButtons} filePath={this.state.filePath} handleFile={this.handleFile} submitFile={this.submitFile} cancelFile={this.cancelFile} openModal={this.openModal} freeze={this.freeze} unfreeze={this.unfreeze} location={this.state.location} postSnap={this.postSnap} closeModal={this.closeModal} uploading={this.state.uploading} modalCamera={this.state.modalCamera} defaultButtons={this.state.defaultButtons}></FileForm>
                        <FeedContainer postsData={this.state.posts}></FeedContainer>
                        <Widgets userInfo={this.state.user}></Widgets>
                    </div>
                }
            </HomepageLayout>
        )
    }
}

export default Homepage;