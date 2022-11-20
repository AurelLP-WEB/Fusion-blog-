const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const Post = require('./database/models/post');
const app = new express();
app.use(fileUpload());
mongoose.connect('mongodb+srv://Aurel:maverick240399@fusion.zxq1hof.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});


app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname,'pages/contact.html'));
});

app.get('/post', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});
app.get('/posts/new', (req, res) => {
    res.render('create')
});
app.post("/posts/store", (req, res) => {
    const {
        image
    } = req.files

    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`
        }, (error, post) => {
            res.redirect('/');
        });
    })
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post('/posts/store', (req, res) => {
    console.log(req.body)
    res.redirect('/')
});

app.listen(4000, () => {
    console.log('App listening on port 4000')
});