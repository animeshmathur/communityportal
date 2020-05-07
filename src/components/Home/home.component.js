import React from 'react';
import PostsList from '../../containers/PostsList/postsList.component';

import './home.style.css';

export default () => {
    return (
        <div>
            <div className="posts-list-grid hidden-xs hidden-sm">
                <PostsList />
            </div>
            <div className="visible-xs visible-sm">
                <PostsList />
            </div>
        </div>
    )
}