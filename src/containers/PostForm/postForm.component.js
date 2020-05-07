import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import './postForm.style.css';

import {CardComponent as Card} from '../../components/Card/card.component';

import { submitPost, updatePost } from '../../actions/post.action';
import { UserContext } from '../../App';

class PostFormComponent extends Component {

    state = { post: {} };

    componentWillMount() {
        if (this.props.hasOwnProperty('post') && this.props.post.hasOwnProperty('_id')) {
            this.setState( { post: this.props.post } );
        } else {            
            this.setState({
                post: {
                    subject: "",
                    summary: "",
                    content: ""
                }
            });
        }
    }

    cancelForm = () => {
        if(this.props.onCancel) {
            this.props.onCancel();
        } else {            
            this.props.history.push('/');
        }
    }

    createForm = (defaultPost, isNew) => (
        <Formik
            initialValues={defaultPost}
            onSubmit={(values, {setSubmitting}) => {
                if (isNew) {
                    this.props.submitPost(values, () => {
                        this.cancelForm();
                        setSubmitting(false);
                    });
                } else {
                    this.props.updatePost(values, () => {
                        this.cancelForm();
                        setSubmitting(false);
                    });
                }                
            }}
            validate={values => {
                let errors = {};
                if (!values.subject) {
                    errors.subject = "Your post should have a subject or heading."
                }
                if (!values.content) {
                    errors.content = "Content can not be empty."
                }
                return errors;
            }}
        >
            {
                ({ isSubmitting }) => (
                    <Form className="post-form">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Subject <span className="text-danger">*</span></label>
                                    <Field type="text" name="subject" className="form-control" />
                                    <ErrorMessage name="subject" component="div" className="text-danger" />
                                </div>
                                <div className="form-group">
                                    <label>Summary</label>
                                    <Field component="textarea" name="summary" className="form-control" rows="3" maxLength="300"/>
                                </div>
                                <div className="form-group">
                                    <label>Content <span className="text-danger">*</span></label>
                                    <Field component="textarea" name="content" className="form-control" rows="10" />
                                    <ErrorMessage name="content" component="div" className="text-danger" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Save</button>
                                    <button type="button" className="btn btn-link" disabled={isSubmitting} onClick={this.cancelForm}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )
            }
        </Formik>
    )

    render() {
        return (
            <UserContext.Consumer>
                {
                    username => (
                        <Card>
                            <h2>{this.state.post._id ? 'Edit Post' : 'New Post'}</h2>
                            {this.createForm({...this.state.post, createdBy: username}, !this.state.post.hasOwnProperty('_id'))}
                        </Card>
                    )
                }
            </UserContext.Consumer>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    submitPost, 
    updatePost: (post, callback) => dispatch(updatePost(post, callback))
});

export default connect(null, mapDispatchToProps)(PostFormComponent);