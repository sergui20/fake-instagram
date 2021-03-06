import React from 'react';

import ProfileImgStory from './div-img-story';

function HeaderOtherPosts (props) {
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
            </div>
        </div>
    )
}

export default HeaderOtherPosts;