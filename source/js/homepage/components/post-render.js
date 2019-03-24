import React from 'react';

import HeaderPost from './header-post';
import ImgPost from './img-post';
import FooterPost from './footer-post';

// import data from '../../../../api.json';

import './post-render.css';

// const posts = data.posts;

class PostRender extends React.Component {
    state = {
        liked: false
    }

    toggleLiked = () => {
        this.setState({
            liked: !this.state.liked
        })
    }

    render() {
        return (
            this.props.postsData.map((post) => {
                return (
                    <article className="post" key={post._id}>
                        <HeaderPost {...post}></HeaderPost>   
                        <ImgPost src={post.path}></ImgPost>
                        <FooterPost likes={post.likes} liked={this.state.liked} toggleLiked={this.toggleLiked}></FooterPost>
                    </article>
                )
            })
        )
    }
}

export default PostRender;