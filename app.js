require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

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

// mongoose and mongodb sandbox routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'adding a new blog',
    snippet: 'catchy additional blog',
    body: 'adding another blog - this should be different',
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get('/all-blogs', (req, res) => {
  const allBlogs = Blog.find();
  allBlogs
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get('/single-blog', (req, res) => {
  const singleBlog = Blog.findById('65f1fa8ead2c56fd6471df4e');
  singleBlog
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

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

app.get('/', (req, res) => {
  //   res.send('<p>Hello from Express World</p>');
  //   res.sendFile('./views/index.html', { root: __dirname });
  res.redirect('/blogs');
});

// blog routes
app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All blogs', blogs: result });
    })
    .catch((err) => console.log(err));
});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => console.log(err));
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((blog) => {
      res.render('details', { title: 'Blog details', blog: blog });
    })
    .catch((err) => console.log(err));
});
app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => console.log(err));
});

app.get('/about', (req, res) => {
  //   res.send('<h2>This is an h2 tag on the about page</h2>');
  //   res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'About' });
});

//redirects
// app.get('/about-me', (req, res) => {
//   //   res.redirect('/about');
//   res.render('about');
// });

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create' });
});

//404
app.use((req, res) => {
  //   res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render('404', { title: '404' });
});
