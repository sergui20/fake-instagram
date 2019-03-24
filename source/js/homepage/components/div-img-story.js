import React from 'react';

function ProfileImgStory (props) {
    return (
        <div className="story">
            <span className="user-feed-images-container">
                <img src={props.src} className="user-feed-images"></img>
            </span>
        </div>
    )
}

export default ProfileImgStory;