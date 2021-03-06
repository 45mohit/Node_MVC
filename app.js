const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes')

//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://<cluster_name>:<password>@nodetutor.fgdxe.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to MongoDB');
        app.listen(3000);

    }).catch((err) => {
        console.log(err);
    });

//regester view engine
app.set('view engine', 'ejs');

//static files & middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

//blog routes
app.use('/blogs',blogRoutes);

//404 error
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});
