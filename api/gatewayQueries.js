//functions in this file read data from files in server memory and
//send the read files to view.
//these need to be called throught the routing
var fs = require("fs");
var fileWriter = require("../fileWriter");
exports.getAllGateways = (req,res,next) =>{
  console.log("called qateway queries");
  fs.readFile("./GatewayInformation/listOfGateways.txt", "utf8",function(err, data){
    if (err){
      res.send(err);
      return console.log(err);

    }
    console.log(data);
  //!!!!!!!!!!!!HERE ROW IS SOMEHOW AGEIN R NOT N!!!!!!!!!!!
    listOfGateways = data.split("\r\n");
    listOfGateways.pop();//remove the "" from last element
    res.send(listOfGateways);

  });
}

exports.getBeaconsFromGateway = (req,res,next,nameOfGateway) =>{
  console.log("called qateway queries");
  fs.readFile("./GatewayInformation/" + nameOfGateway + ".txt", "utf8",function(err,file){
    if (err){
      res.send(err);
      return console.log(err);

    }
    listOfBeacons = file.split("\r\n");
    listOfBeacons.pop(); //remove the "" from last element
    listOfBeacons.shift(); //remove the name of gateway from start
    res.send(listOfBeacons);
  });


}
