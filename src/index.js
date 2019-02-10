const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
io.origins("*:*");

mongoose.connect('mongodb://xxxlucasxxx:lucasxxx123@ds058739.mlab.com:58739/api-blog', {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

app.use(cors());

app.use((req, res, next) => {
    req.io = io;
    return next();
});

const routes = require('./routes');
app.use(routes);

var port = process.env.PORT || 3001;

server.listen(port, () => {
    console.log(`Server listening on port ${port} (:`)
})