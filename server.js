const path = require('path')
const express = require('express')
const app = express()
const port = 5000;
//filewriter is used to write and read gateway data to documents
var fileWriter = require('./filewriter.js')
//here we require the routing file and all its routes
var routing = require('./routing.js')

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
  //console.log(socket.id);
  var clients = io.sockets.clients();

    socket.on('message', function(data){
      //always when message comes

      //write the data from gateway to gateways own file
      fileWriter.writeToFile(data.found_devices);

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
//use the routing file to set the urls
app.use("/", routing);
