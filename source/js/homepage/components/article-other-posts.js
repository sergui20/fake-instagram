import React from 'react';

import HeaderOtherPosts from './header-other-posts';
import ImgPost from './img-post';
import FooterPost from './footer-post';

class OtherPosts extends React.Component {
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
            <article className="post" data-key={this.props.post._id}>
                <HeaderOtherPosts {...this.props.post}></HeaderOtherPosts>   
                <ImgPost src={this.props.post.path} toggleLiked={this.toggleLiked} heart={this.state.heart}></ImgPost>
                <FooterPost likes={this.props.post.likes} liked={this.state.liked} toggleLiked={this.toggleLiked} date={this.props.uploaded}></FooterPost>
            </article>
        )
    }
}

export default OtherPosts;