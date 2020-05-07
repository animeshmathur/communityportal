import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { CardComponent as Card } from '../../components/Card/card.component';
import Spinner from '../../components/Spinner/spinner.component';

import { getAllPosts } from '../../actions/post.action';

class PostsListComponent extends Component {

    componentDidMount() {
        this.props.getAllPosts();
    }

    showPosts = () => {
        return this.props.posts.map(post => {
            return (
                <Card key={post._id}>
                    <div className="post">
                        <h2>
                            <Link to={"/post/" + post._id}>{post.subject}</Link>
                        </h2>
                        <p className="text-bold">{post.summary}</p>
                        <p>
                            {post.content.length > 250 ? post.content.substring(0, 250) + "..." : post.content}
                            {post.content.length > 250 && <Link to={"/post/" + post._id}>read more</Link>}
                        </p>
                        <p>Posted by <span className="text-bold">{post.createdBy}</span></p>
                    </div>
                </Card>
            )
        })
    }

    render() {
        const { posts } = this.props;
        if(!posts) {
            return <Spinner forPage={true} />
        }
        return this.showPosts();
    }
}

const mapStateToProps = (state) => ({
    posts: state.postReducer.posts
});

const mapDispatchToProps = (dispatch) => ({
    getAllPosts: () => dispatch(getAllPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsListComponent);