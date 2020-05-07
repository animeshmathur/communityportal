import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { HeaderComponent } from '../Header/header.component';
import HomeComponent from '../Home/home.component';
import PostFormComponent from '../../containers/PostForm/postForm.component';
import PostComponent from '../../containers/Post/post.component';

const PageLayoutComponent = () => (
    <div>             
        <div className="container-fluid">
            <Router>
                <div>
                    <HeaderComponent />
                    <Switch>
                        <Route path="/post/:id" component={PostComponent} />
                        <Route path="/newPost" component={PostFormComponent}  />
                        <Route path="/editPost/:id" component={PostFormComponent} />
                        <Route path="/" component={HomeComponent}  />
                    </Switch>
                </div>
            </Router>
        </div>
    </div>
)

export default PageLayoutComponent;
