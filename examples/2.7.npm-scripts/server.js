const http = require('http');

process.title = 'myApp'

const server = http.createServer((req, res) => {
  res.end('hello world');
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8000,function() {
	console.log(`listen 8000`)
});