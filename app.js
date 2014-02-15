var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(4000, "0.0.0.0");

function handler (req, res) {
  if(req.url === '/'){
    req.url = '/index.html';
  }
  fs.readFile(__dirname + req.url,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading ' + req.url);
    }

    res.writeHead(200);
    res.end(data);
  });
}

var redis = require('redis');
var red = redis.createClient();

red.on('error', function(err){
    console.log("Redis Error " + err);
});


io.sockets.on('connection', function(socket){
    socket.on('button_pressed', function(button){
        console.log(button);
        red.hincrby("button", button, "1"); 
        red.hget("button", button, function (err, reply) {
            console.log(reply.toString());
        });
    });
});
