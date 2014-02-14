var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(4000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}
/*
var redis = require('redis');
var red = redis.createClient();

red.on('error', function(err){
    console.log("Redis Error " + err);
});

red.subscribe('buttons');
*/
io.sockets.on('connection', function(socket){
    socket.on('button_press', function(button){
        console.log(button);
        //red.incr(button); 
    });
});
