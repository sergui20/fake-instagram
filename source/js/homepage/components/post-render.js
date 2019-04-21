import React from 'react';

import MyPosts from './article-my-posts';
import OtherPosts from './article-other-posts';

import './post-render.css';
import './header-post.css';

class PostRender extends React.Component {
    render() {
        return (
            this.props.postsData.map((post) => {
                //For user posts
                if (post.user._id === this.props.userID) {
                    return (
                        <MyPosts key={post._id} post={post} userID={this.props.userID} toggleDeleteDropdown={this.props.toggleDeleteDropdown} postKey={this.props.postKey} deletePost={this.props.deletePost}></MyPosts>
                    )
                }
                // For other posts 
                else {
                    return (
                        <OtherPosts key={post._id} post={post} userID={this.props.userID}></OtherPosts>
                    )
                }
            })
        )
    }
}

export default PostRender;