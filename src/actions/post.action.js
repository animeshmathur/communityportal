// Action creators for Post
import axios from 'axios';
import _ from 'lodash';

const BASE_URL = 'http://localhost:8080/api';
export const GET_ALL_POSTS = 'get_all_posts';
export const GET_POST = 'get_post';
export const DEACTIVATE_POST = 'deactivate_post';
export const UPDATE_POST = 'update_post';
export const SEARCH_POST = 'search_post';

export const getAllPosts = () => dispatch => {
    axios.get(`${BASE_URL}/posts`)
    .then((res) => {
        dispatch({
            type: GET_ALL_POSTS,
            payload: res.data
        })
    })
    .catch((err) => console.error(err));
}

export const submitPost = (data, callback) => {
    axios.post(`${BASE_URL}/post`, data)
    .then(res => callback())
    .catch(err => console.error(err));
}

export const getPost = (postId) => dispatch => {
    axios.get(`${BASE_URL}/post/${postId}`)
    .then(res => {
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    })
    .catch(err => console.error(err));
}

export const updatePost = (post, callback) => dispatch => {
    axios.put(`${BASE_URL}/post/${post._id}`, post)
    .then((res) => {
        dispatch({
            type: UPDATE_POST,
            payload: post
        });
        callback();
    })
    .catch(err => console.error(err));
}

export const deletePost = (postId, callback) => {
    axios.delete(`${BASE_URL}/post/${postId}`)
    .then(res => callback())
    .catch(err => console.error(err));
}

export const searchPost = (keyword) => dispatch => {
    (_.debounce(() => {        
        axios.get(`${BASE_URL}/post/search/${keyword}`)
        .then(res => dispatch({
            type: SEARCH_POST,
            payload: res.data
        }))
        .catch(err => console.error(err));
    }, 100))();
}

export const deactivatePost = () => dispatch => {
    dispatch({
        type: DEACTIVATE_POST,
        payload: null
    });
}