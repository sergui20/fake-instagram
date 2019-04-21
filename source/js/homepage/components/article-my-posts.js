import React from 'react';
import axios from 'axios';

import HeaderMyPosts from './header-my-post';
import ImgPost from './img-post';
import FooterPost from './footer-post';

class MyPosts extends React.Component {
    state = {
        liked: false,
        heart: false,
        likes: this.props.post.likes
    }

    setArticle = (article) => {
        this.article = article
    }

    toggleLiked = async (ev) => {
        const postID = this.article.getAttribute("data-key")

        if (this.state.liked) {
            await this.setState({
                liked: false,
                heart: false,
                likes: this.state.likes -1
            })
        } else {
            await this.setState({
                liked: true,
                heart: true,
                likes: this.state.likes +1
            })

            setTimeout(() => {
                this.setState({
                    heart: false
                })
            }, 1000)
        }

        axios.put(`/api/posts/${postID}/${this.state.likes}/${this.props.userID}/${this.state.liked}`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.props.post.likedBy.map( userID => {
            if (userID == this.props.userID) {
                this.setState({
                    liked: true
                })
            }
        })
    }

    render() {
        return (
            <article ref={this.setArticle} className="post" data-key={this.props.post._id}>
                <HeaderMyPosts {...this.props.post} toggleDeleteDropdown={this.props.toggleDeleteDropdown} postKey={this.props.postKey} deletePost={this.props.deletePost}></HeaderMyPosts>   
                <ImgPost src={this.props.post.path} toggleLiked={this.toggleLiked} heart={this.state.heart}></ImgPost>
                <FooterPost likes={this.state.likes} liked={this.state.liked} toggleLiked={this.toggleLiked} date={this.props.post.uploaded}></FooterPost>
            </article>
        )
    }
}

export default MyPosts;