//functions in this file read data from files in server memory and
//send the read files to view.
//these need to be called throught the routing

var fileWriter = require("../fileWriter");
exports.getAllGateways = (req,res,next) =>{
  console.log("called qateway queries");
  var fs = require("fs");
  fs.readFile("./GatewayInformation/listOfGateways.txt", "utf8",function(err, data){
    if (err){
      return console.log(err);
    }
    console.log(data);
    res.send(data);

  });
}
