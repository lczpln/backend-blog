const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended: false }));

const postController = require('./controllers/postController');

route.get('/', (req, res, next) => {
    res.status(200).send({
        "API-name": "api-blog",
        "version": "v1.1"
    });
});

route.post('/posts', postController.store);
route.get('/posts', postController.index);
route.get('/posts/:url', postController.search);
route.delete('/posts/:id', postController.delete);

module.exports = route;