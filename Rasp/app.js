var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/index.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

var client = require('socket.io-client');
//socket to the cloud server
//var socket1 = client.connect('https://assetlocationing.herokuapp.com/', { reconnect: true });
//socket to to localhost
var socket1 = client.connect('http://localhost:5000/', { reconnect: true });


// Send messages to connected client === cloudserver
function sendMessageToCloud() {
    var file;
    file = fs.readFileSync('found_devices.txt', "utf8");
    console.log("file: " + file);
    //socket1.emit('message', { time: new Date().toJSON() });
    socket1.emit('message', { found_devices: file });
}

// Send message to cloud server every 10 secs
setInterval(sendMessageToCloud, 10000);


// Emit welcome message on connection
socket1.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('connectionStarted', { message: 'this is hello from rasp'});
});

app.listen(3000);
