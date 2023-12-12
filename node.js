const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const port = 3000;

const server = http.createServer(function (req, res) {
  // Parse the request URL
  const parsedUrl = url.parse(req.url, true);

  // Extract the path from the URL
  const pathname = parsedUrl.pathname;

  // Map the path to the corresponding HTML file
  const filePath = path.join(__dirname, pathname === '/' ? 'index.html' : `${pathname}.html`);

  // Check if the file exists
  fs.readFile(filePath, function (error, data) {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('Error: File Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
    }
    res.end();
  });
});

server.listen(port, function () {
  console.log(`Server is running on http://localhost:${port}`);
});
