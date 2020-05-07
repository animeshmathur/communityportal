const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    subject: { type: String, required: true },
    summary: { type: String },
    content: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdOn: { type: Date, default: () => new Date() }
});

// Indexing all string fields for search
postSchema.index({'$**': 'text'});

const Post = mongoose.model('post', postSchema);

module.exports = Post;