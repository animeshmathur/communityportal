import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { searchPost } from '../../actions/post.action';

import './postSearch.style.css';

class PostSearchComponent extends Component {
    state = { showPopup: false };

    componentDidMount() {
        document.addEventListener('click', (event) => {
            if(this.wrapperRef && !this.wrapperRef.contains(event.target)) {            
                this.setState({ showPopup: false });
            }
        })
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    openPopup = () => {
        this.setState({ showPopup: true });
    }

    closePopup = (event) => {          
        this.setState({ showPopup: false });
    }

    triggerSearch = (event) => {  
        if (event.target.value) {
            this.props.searchPost(event.target.value);
            this.openPopup();
        } else {
            this.closePopup();
        }        
    }

    goToPost = (postId) => {
        this.props.history.push(`/post/${postId}`);   
    }

    render() {
        return (
            <div ref={this.setWrapperRef} className="search-typeahead">
                <input type="text" className={`form-control ${this.props.className}`} placeholder="Search for posts" onChange={this.triggerSearch}/>
                {
                    this.state.showPopup && 
                    <div className="result-list">
                    {
                        (this.props.searchResults && this.props.searchResults.length > 0) ? 
                        <ul className="list-unstyled">
                            {this.props.searchResults.map((post) => (
                                <li key={post._id} onClick={() => this.goToPost(post._id)}>{post.subject}</li>
                            ))}
                        </ul>
                        : <div>No results. Please refine your search.</div>
                    }
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    searchResults: state.postReducer.searchPostResults
})

const mapDispatchToProps = (dispatch) => ({
    searchPost: (keyword) => dispatch(searchPost(keyword))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostSearchComponent));