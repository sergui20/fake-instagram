import React from 'react';

import FeedPostsBox from '../components/feed-posts-box';
import FeedRow from '../components/feed-row';
import Posts from '../components/post-render';

function FeedContainer (props) {
    return (
        <FeedPostsBox>
            <FeedRow>
                <Posts postsData={props.postsData}></Posts>
            </FeedRow>
        </FeedPostsBox>
    )   
}

export default FeedContainer;