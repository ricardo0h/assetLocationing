//here do the routing of the urls to views
const gatewayQueries = require("./api/gatewayQueries");
const express = require('express')
var router = express.Router();
const fileWriter = require("./fileWriter")

router.get('/', function(req, res, next) {
  console.log('called /');
  res.render('pages/index.ejs', {someData: "here is some static data from server"});
});

router.get("/login",function(req, res, next) {
  console.log('called /login');
  res.render('pages/', {someData: "here is some static data from server"});
});

router.get("/trackingStatus",function(req, res, next) {
  console.log('called tracking status');
  res.render('pages/trackingStatus.ejs', {someData: "here is some static data from server"});
});

//make here rest api that can be used to load data to the view.
router.get("/api/gateway",function(req, res, next) {
  console.log('called api gateways');
  //the function then returns the values to view when callback happens
  //no need to send anything here
  gatewayQueries.getAllGateways(req,res,next);
});



module.exports = router;
