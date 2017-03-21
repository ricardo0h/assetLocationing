
  //this writes data acquired from gateways
  // gateways data is written to file the same name as the gateway has
  //written file consist of list of beacons that gateway sees.
  //the name of the file is the first line of the data
exports.writeToFile = (data) =>{
  var reader = require('readline');
  var lines = data.split("\r");
  console.log(lines[0]);
  var fs = require('fs');
  fs.writeFile("./GatewayInformation/"+ lines[0].toString() +".txt", data, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
    });

  }
