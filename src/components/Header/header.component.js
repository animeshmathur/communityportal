import React, { Component } from 'react';
import { Link }  from 'react-router-dom';

import PostSearch from '../../containers/PostSearch/postSearch.component';

import './header.style.css';

export class HeaderComponent extends Component {

    state = { hamburgerActive: false };

    toggleHamburger = () => {
        this.setState({ hamburgerActive: !this.state.hamburgerActive });
    }

    render() {
        return (
            <div>
                <header className="hidden-xs hidden-sm">
                    <div>
                        <h1>Demo Portal</h1>
                    </div>
                    <div className="text-right">
                        <Link to="/"><i className="glyphicon glyphicon-search"></i> Browse</Link>
                        <Link to="/newPost"><i className="glyphicon glyphicon-plus"></i> New Post</Link>
                    </div>
                    <PostSearch className="search-input" />
                </header>
                <header className="visible-xs visible-sm">                
                    <div className="row">
                        <div className="col-xs-8">
                            <h1>Demo Portal</h1>
                        </div>
                        <div className="col-xs-4 text-right">
                            <i className="hamburger glyphicon glyphicon-menu-hamburger" onClick={this.toggleHamburger}></i>
                        </div>
                    </div>
                    {
                        this.state.hamburgerActive && 
                        <div>
                            <div>
                                <Link to="/"><i className="glyphicon glyphicon-search"></i> Browse</Link>
                                <Link to="/newPost"><i className="glyphicon glyphicon-plus"></i> New Post</Link>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search for posts"/>
                            </div>
                        </div>
                    }
                </header>
            </div>
        );
    }
}