import React from 'react';
import axios from 'axios';

import HomepageLayout from '../components/homepageLayout';
import FeedContainer from '../components/feedContainer';
import Widgets from './widgetsContainer';
import Loader from '../../widgets/loader';

class Homepage extends React.Component {
    state = {
        user: null,
        posts: null,
        loading: true
    }

    componentWillMount() {
        const user = localStorage.getItem('user')
        const userInfo = JSON.parse(user)

        this.setState({
            user: userInfo
        })
    }

    componentDidMount() {
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

    render() {
        return (
            <HomepageLayout>
                {
                    this.state.loading ?
                    <Loader></Loader>
                    :
                    <div>
                        <FeedContainer postsData={this.state.posts}></FeedContainer>
                        <Widgets userInfo={this.state.user}></Widgets>
                    </div>
                }
            </HomepageLayout>
        )
    }
}

export default Homepage;