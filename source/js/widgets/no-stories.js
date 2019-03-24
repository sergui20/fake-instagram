import React from 'react';

import './no-stories.css';

import WidgetTitleStoriesRow from '../homepage/components/widget-title-stories-row';

function NoStoriesWidget () {
    return (
        <div className="row">
            <div className="col s12 stories-container">
                <WidgetTitleStoriesRow></WidgetTitleStoriesRow>
                <p className="no-stories-p">No stories yet</p>
            </div>
        </div>
    )
}   

export default NoStoriesWidget;