require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express('public');

//register view engine
app.set('view engine', 'ejs');

const DB_URI = process.env.MONGODB_URL;

mongoose
  .connect(DB_URI)
  .then((result) => {
    console.log('connected to mongodb');
    app.listen(3000, () => {
      console.log('Express server listening on port 3000');
    });
  })
  .catch((err) => {
    console.log(err);
  });

// static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// middleware
app.use(morgan('dev'));
// app.use((req, res, next) => {
//   console.log('New request made');
//   // console.log('host', req.hostname);
//   // console.log('path', req.path);
//   // console.log('method', req.method);
//   next();
// });

// app.use((req, res, next) => {
//   console.log('In the next middleware');
//   next();
// });

// routes
app.get('/', (req, res) => {
  //   res.send('<p>Hello from Express World</p>');
  //   res.sendFile('./views/index.html', { root: __dirname });
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  //   res.send('<h2>This is an h2 tag on the about page</h2>');
  //   res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'About' });
});

//blog routes
app.use('/blogs', blogRoutes);

//404
app.use((req, res) => {
  //   res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render('404', { title: '404' });
});
