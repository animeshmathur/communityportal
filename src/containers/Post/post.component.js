import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './post.style.css';

import { CardComponent as Card } from '../../components/Card/card.component';
import Modal from '../../components/Modal/modal.component';
import Spinner from '../../components/Spinner/spinner.component';
import PostForm from '../PostForm/postForm.component';

import { getPost, deletePost, deactivatePost } from '../../actions/post.action';

import { UserContext } from '../../App';

export class PostComponent extends Component {

    state = {
        isEditable: false,
        showDeleteConfirmation: false
    }

    componentWillMount() {
        const postId = this.props.match.params.id;
        this.props.getPost(postId);
    }

    componentWillReceiveProps(newProps) {
        if (this.props.match.params.id !== newProps.match.params.id) {
            this.props.getPost(newProps.match.params.id);
        }
    }

    componentWillUnmount() {
        this.props.deactivatePost();
    }
    
    onCancelEdit = () => this.setState({ isEditable: false })

    deletePost = () => this.props.deletePost(this.props.post._id, () => this.props.history.push('/'))

    render() {
        const { post } = this.props;
        if (!(post && post.hasOwnProperty('_id'))) {
            return (
                <Spinner forPage={true} />
            );
        }
        if (!this.state.isEditable) {
            return (
                <UserContext.Consumer>
                    {
                        (username) => (
                            <div>
                                <Card>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Link to="/" className="btn-link"><i className="glyphicon glyphicon-chevron-left"></i> Browse</Link>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            {
                                                (username === post.createdBy) && 
                                                    <div>
                                                        <button className="btn-link" onClick={() => this.setState({ isEditable: true })}><i className="glyphicon glyphicon-edit"></i> Edit</button> |  
                                                        <button className="btn-link" onClick={() => this.setState({showDeleteConfirmation: true})}><i className="glyphicon glyphicon-trash"></i> Delete</button>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="post">
                                        <h2>{post.subject}</h2>
                                        <p className="text-bold">{post.summary}</p>
                                        <pre>{post.content}</pre>
                                        <p>Posted by <span className="text-bold">{post.createdBy}</span></p>
                                    </div>
                                </Card>
                                <Modal size="small" show={this.state.showDeleteConfirmation}>
                                    <h3>Confirmation</h3>
                                    <p>You are about to delete this post.</p>
                                    <div className="text-right">
                                        <button className="btn btn-link" onClick={() => this.setState({showDeleteConfirmation: false})}>Cancel</button>
                                        <button className="btn btn-danger" onClick={this.deletePost}>Continue</button>
                                    </div>
                                </Modal>                             
                            </div>
                        )
                    }
                </UserContext.Consumer>
            );
        } else {
            return <PostForm post={post} onCancel={this.onCancelEdit} />;
        }
    }
}

const mapStateToProps = (state) => ({
    post: state.postReducer.post
});

const mapDispatchToProps = (dispatch) => ({
    getPost: postId => dispatch(getPost(postId)),
    deletePost,
    deactivatePost: () => dispatch(deactivatePost())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostComponent);