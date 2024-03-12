const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log('request made', req.url, req.method);

  //   res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Type', 'text/html');
  //   res.write('Hello from server');
  //   res.write('<h2>Hello from server</h2>');
  //   res.write('<p>This text is in a p tag</p>');
  //   res.end();

  let path = './views/';

  switch (req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-me':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }

  //send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(3000, 'localhost', () => {
  console.log('Server listening on port 3000');
});
