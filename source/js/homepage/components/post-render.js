import React from 'react';

import HeaderMyPosts from './header-my-post';
import HeaderOtherPosts from './header-other-posts';

import ImgPost from './img-post';
import FooterPost from './footer-post';

import './post-render.css';
import './header-post.css';

class PostRender extends React.Component {
    state = {
        liked: false,
    }

    toggleLiked = () => {
        this.setState({
            liked: !this.state.liked
        })
    }

    render() {
        return (
            this.props.postsData.map((post) => {
                //For user posts
                console.log(post.user._id, this.props.userID)
                if (post.user._id === this.props.userID) {
                    return (
                        <article ref={`article${post._id}`} className="post" key={post._id} data-key={post._id}>
                            <HeaderMyPosts {...post} toggleDeleteDropdown={this.props.toggleDeleteDropdown} postKey={this.props.postKey} deletePost={this.props.deletePost}></HeaderMyPosts>   
                            <ImgPost src={post.path}></ImgPost>
                            <FooterPost likes={post.likes} liked={this.state.liked} toggleLiked={this.toggleLiked} date={post.uploaded}></FooterPost>
                        </article>
                    )
                }
                // For other posts 
                else {
                    return (
                        <article className="post" key={post._id} data-key={post._id}>
                            <HeaderOtherPosts {...post}></HeaderOtherPosts>   
                            <ImgPost src={post.path}></ImgPost>
                            <FooterPost likes={post.likes} liked={this.state.liked} toggleLiked={this.toggleLiked} date={post.uploaded}></FooterPost>
                        </article>
                    )
                }
            })
        )
    }
}

export default PostRender;