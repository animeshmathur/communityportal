const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const router = express.Router();

// env variables
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://animesh:animesh123@ds137281.mlab.com:37281/commportaldb';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true
});

app.use(bodyParser.json(), cors());

app.use(require('../route/post.routes'));

app.all('*', (request, response) => {
    console.log('Returning a 404 from the catch-all route');
    return response.sendStatus(404);
});

// error middleware
// app.use(require('./error-middleware'));

const start = () => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port: ${PORT}`);
    })
}

const stop = () => {
    app.close(PORT, () => {
        console.log(`Server had shut down on port: ${PORT}`);
    })
}

module.exports = {start, stop};