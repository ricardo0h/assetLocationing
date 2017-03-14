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

var allMessages = [];
// Socket.io server listens to our app

io.on('connection', function(socket) {
  //console.log(socket.id);
  var clients = io.sockets.clients();
  //console.log(clients);
    //here write to console
    socket.on('message', function(data){
    allMessages.push(data)
      console.log (data);
      //this propably sends to all sockets so it is not good on the long run
      io.emit("messageToView", data);
    });
    socket.on('connectionStarted', console.log);
    //send to client:
    socket.emit('messageToView', "jotain daaa");
});




// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});
