import React from 'react';

import HeaderMyPosts from './header-my-post';
import ImgPost from './img-post';
import FooterPost from './footer-post';

class MyPosts extends React.Component {
    state = {
        liked: false,
        heart: false
    }

    toggleLiked = () => {
        if (this.state.liked) {
            this.setState({
                liked: false,
                heart: false
            })
        } else {
            this.setState({
                liked: true,
                heart: true
            })

            setTimeout(() => {
                this.setState({
                    heart: false
                })
            }, 1000)
        }
    }

    render() {
        return (
            <article ref={`article${this.props.post._id}`} className="post" data-key={this.props.post._id}>
                <HeaderMyPosts {...this.props.post} toggleDeleteDropdown={this.props.toggleDeleteDropdown} postKey={this.props.postKey} deletePost={this.props.deletePost}></HeaderMyPosts>   
                <ImgPost src={this.props.post.path} toggleLiked={this.toggleLiked} heart={this.state.heart}></ImgPost>
                <FooterPost likes={this.props.post.likes} liked={this.state.liked} toggleLiked={this.toggleLiked} date={this.props.post.uploaded}></FooterPost>
            </article>
        )
    }
}

export default MyPosts;