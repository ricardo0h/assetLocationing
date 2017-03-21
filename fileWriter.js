
  //this writes data acquired from gateways
  // gateways data is written to file the same name as the gateway has
  //written file consist of list of beacons that gateway sees.
  //the name of the file is the first line of the data


exports.writeToFile =(data) => {
  var lines = data.split("\r");
  var fs = require("fs");
  fs.writeFile("./GatewayInformation/"+ lines[0].toString() +".txt", data, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
    });

  }

exports.readWholeFile = (nameOfFile) =>{
    var fs = require("fs");
    var file = fs.readFile("./GatewayInformation/" + nameOfFile + ".txt", "utf8",function(err){
      if (err){
        return console.log(err);
      }
    });
    return file;
}

exports.addNewGateway = (gatewayName) =>{
  fs.appendFile("./GatewayInformation/listOfGateways.txt", gatewayName, function (err) {
      if (err){
        return console.log(err);
      }
      console.log("Gateway: "+ gatewayName +" added to list");
  });

}
exports.removeGateway = (gatewayName) =>{
  var file = fs.readFile("./GatewayInformation/listOfGateways.txt",utf8,function(err){
      if (err){
        console.log("error in reading the gatewaylist")
        console.log(err)
      }
  });
  var lines = file.split("\n");
  lines.forEach(function(line, index){
    if (line == gatewayName){
      lines.splice(index,1);
    }
  });
  var data = lines.join("\n");

  fs.writeFile("./GatewayInformation/listOfGateways.txt", data, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("gateway removed");
    });


  }
