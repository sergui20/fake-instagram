import React from 'react';

function WidgetStoriesRow () {
    return (
        <div className="row">
            <div className="col s12 title-stories-container">
                <div className="title-div-stories">
                    <span className="title-stories">Stories</span>
                </div>
                <div className="see-all-stories-anchor">
                    <a href="#">See all</a>
                </div>
            </div>
        </div>
    )
}

export default WidgetStoriesRow;