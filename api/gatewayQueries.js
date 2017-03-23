//functions in this file read data from files in server memory and
//send the read files to view.
//these need to be called throught the routing

var fileWriter = require("../fileWriter");
exports.getAllGateways = (req,res,next) =>{
  console.log("called qateway queries");
  var fs = require("fs");
  fs.readFile("./GatewayInformation/listOfGateways.txt", "utf8",function(err, data){
    if (err){
      res.send(err);
      return console.log(err);

    }
    console.log(data);
  //!!!!!!!!!!!!HERE ROW IS SOMEHOW AGEIN R NOT N!!!!!!!!!!!
    listOfGateways = data.split("\n");
    res.send(listOfGateways);

  });
}

exports.getBeaconsFromGateway = (req,res,next,nameOfGateway) =>{
  console.log("called qateway queries");
  var fs = require("fs");
  fs.readFile("./GatewayInformation/" + nameOfGateway + ".txt", "utf8",function(err,file){
    if (err){
      res.send(err);
      return console.log(err);

    }
    listOfBeacons = file.split("\n");
    res.send(listOfBeacons);
  });


}
