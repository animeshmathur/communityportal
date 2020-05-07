// Reducer for Post
import { GET_ALL_POSTS, GET_POST, UPDATE_POST, SEARCH_POST, DEACTIVATE_POST } from '../actions/post.action';

const initialState = {
  posts: [],
  post: {},
  searchPostResults: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload
      }
    case UPDATE_POST:
      return {
        ...state,
        post: action.payload
      }
    case SEARCH_POST:
      return {
        ...state,
        searchPostResults: action.payload
      }
    case DEACTIVATE_POST:
      return {
        ...state,
        post: action.payload
      }
    default:
    return state;
  }
}