import React from 'react';

import WidgetTitleStoriesRow from './widget-title-stories-row.js';
import WidgetStoriesRow from './widget-stories-row';

import './widget-stories.css';

function WidgetStories (props) {
    return (
        <div className="row">
            <div className="col s12 stories-container">
                <WidgetTitleStoriesRow></WidgetTitleStoriesRow>
                {
                    props.storiesData.map((story) => {
                        return (
                            <WidgetStoriesRow {...story} key={story._id} userInfo={props.userInfo}></WidgetStoriesRow>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default WidgetStories;