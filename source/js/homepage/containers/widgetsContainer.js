import React from 'react';

import WidgetUserInfo from '../components/widget-user-info';
import WidgetStories from '../components/widget-stories';
import NoStoriesWidget from '../../widgets/no-stories'

const story = null;

class Widgets extends React.Component {
    render() {
        return(
            <div className="col m4 l4 hide-on-small-only">
                <WidgetUserInfo userInfo={this.props.userInfo}></WidgetUserInfo>
                {
                    story ?
                    <WidgetStories storiesData={story} userInfo={this.props.userInfo}></WidgetStories>
                    :
                    <NoStoriesWidget></NoStoriesWidget>
                }
            </div>
        )
    }
}

export default Widgets;