const path = require('path')
const express = require('express')
const app = express()
const port = 5000;

//here server is created
var server = require('http').createServer(app);
//this is the socket object
var io = require('socket.io')(server);

//server listens on port 5000 if on localhost and some other port when on heroku
server.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
});

var client = require('socket.io-client');
//socket to the cloud server


// Socket.io server listens to our app
io.on('connection', function(socket) {
    //here write to console
    socket.on('message', console.log);
    socket.on('connectionStarted', console.log);
    //send to client:
    socket.emit('message', 'dataa');
});




// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});
