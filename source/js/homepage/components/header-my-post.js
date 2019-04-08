import React from 'react';

import ProfileImgStory from './div-img-story';

import PostDropdown from '../../widgets/post-dropdown';

function HeaderMyPosts (props) {
    return (
        <div className="header-post">
            <div className="header-info">
                <ProfileImgStory src={props.user.img}></ProfileImgStory>
                <div className="post-info">
                    <a href="#">
                        <span>{props.user.username}</span>
                    </a>
                    <span>{props.location}</span>
                </div>
                <div className="div-post-options">
                    <a className="dropdown-trigger btn-flat btn-post-options" data-target="dropOptions"><i className="fas fa-ellipsis-v" onClick={props.toggleDeleteDropdown}></i></a>
                    {
                        props.postKey === props._id &&
                        <PostDropdown deletePost={props.deletePost}></PostDropdown>
                    }
                </div>
            </div>
        </div>
    )
}

export default HeaderMyPosts;