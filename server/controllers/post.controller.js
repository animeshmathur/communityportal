
const Post = require('../model/post');

const Error = function(type, message) {
    this.type = type;
    this.message = message;
}

const PostCtrl = {
    createPost: (req, res) => {
        Post.create(req.body)
        .then(() => res.sendStatus(200))
        .catch((err) => {
            res.status(500).send(new Error('INSERT', err));
        });
    },
    getAllPosts: (req, res) => {
        Post.find((err, docs) => {
            if (err) {
                res.status(500).send(new Error('GET_ALL', err));
            } else {
                res.send(docs);
            }
        })
    },
    getPostById: (req, res) => {
        Post.findById(req.params.id, (err, doc)=> {
            if (err) {
                res.status(500).send(new Error('GET', err));
            } else {
                res.send(doc);
            }
        });
    },
    updatePostById: (req, res, next) => {
        Post.updateOne({ _id: req.params.id }, { $set: req.body }, (err, data) => {
            if (err) {
                res.status(500).send(new Error('UPDATE', err));
                next();
            } else {
                res.send(data);
            }
        });
    },
    deletePostById: (req, res) => {
        Post.deleteOne({ _id: req.params.id }, (err) => {
            if (err) {
                res.status(500).send(new Error('DELETE', err));
                next();
            } else {
                res.sendStatus(200);
            }
        });
    },
    searchPost: (req, res) => {
        if (req.params.keyword.length === 0) {
            res.send([]);
        } else {
            Post.find({ '$text': { '$search': req.params.keyword } } )
            .select({'_id': 1, 'subject': 1})
            .limit(10)
            .exec((err, docs) => {
                if (err) {
                    res.status(500).send(new Error('SEARCH', err));
                } else {
                    res.send(docs);
                }
            });
        }
    }
}

module.exports = PostCtrl;