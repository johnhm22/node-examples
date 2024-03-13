const express = require('express');
const morgan = require('morgan');

const app = express('public');

//register view engine
app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});

// static files
app.use(express.static('public'));

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
  const blogs = [
    {
      title: 'Yoshi finds eggs',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'Mario finds stars',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'How to defeat bowser',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
  ];
  res.render('index', { title: 'Home', blogs });
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
