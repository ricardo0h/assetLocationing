const path = require('path')
const express = require('express')



const app = express()
//const http = require('http').Server(app);


const port = 5000;


// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});



app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }



  console.log(`server is listening on ${port}`)
})
