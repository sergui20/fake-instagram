import React from 'react';

import ProfileImgStory from './div-img-story';

function WidgetStoriesRow (props) {
    return (
        <div className="row">
            <div className="col s12">
                <div className="user-story">
                    <ProfileImgStory src={null}></ProfileImgStory>
                    <div className="story-info">   
                        <span className="username-story">{props.username}</span>
                        <span className="time-story">{`Hace ${props.time} minutos`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WidgetStoriesRow;