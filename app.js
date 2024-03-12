const express = require('express');

const app = express();

//register view engine
app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});

app.get('/', (req, res) => {
  //   res.send('<p>Hello from Express World</p>');
  res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  //   res.send('<h2>This is an h2 tag on the about page</h2>');
  res.sendFile('./views/about.html', { root: __dirname });
});

//redirects
app.get('/about-me', (req, res) => {
  res.redirect('/about');
});

//404
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname });
});
