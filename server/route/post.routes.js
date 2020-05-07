const Router = require('express').Router;
const bodyParser = require('body-parser');

const PostCtrl = require('../controllers/post.controller');

const postRouter = new Router();

postRouter.post('/api/post', PostCtrl.createPost);

postRouter.get('/api/posts', PostCtrl.getAllPosts);

postRouter.get('/api/post/:id', PostCtrl.getPostById);

postRouter.put('/api/post/:id', PostCtrl.updatePostById);

postRouter.delete('/api/post/:id', PostCtrl.deletePostById);

postRouter.get('/api/post/search/:keyword', PostCtrl.searchPost);

module.exports = postRouter;