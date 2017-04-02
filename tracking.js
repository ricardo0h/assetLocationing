var EddystoneBeaconScanner = require('eddystone-beacon-scanner');
var beacons = [];
var present = [];
var distances = [];
var fileWriter = require('./fileWriter.js');

EddystoneBeaconScanner.on('found', function(beacon){
	console.log("BEACON FOUND");
	present.push(beacon.instance);
	beacons.push(beacon);
	distances.push(beacon.distance);
	console.log(present.length);
	print_beacons();
});

EddystoneBeaconScanner.on('lost', function(beacon){
	console.log("BEACON LOST");
	var index = present.indexOf(beacon.instance);
	present.splice(index, 1);
	distances.splice(index, 1);
	beacons.splice(index, 1);
	console.log(present.length);

	print_beacons();
});

EddystoneBeaconScanner.startScanning(true);

function print_beacons(){
	var i = 0;
	console.log("present beacons");
	var fs = require("fs");
	fs.truncate("./temp.txt", 0);
	console.log("truncated file");
	while(i < present.length){
		if(i === 0){
			var gateway = fs.readFile("/sys/class/net/eth0/address", "utf8");
			//fs.writeFile("./temp.txt", "gateway1\n");
			console.log(gateway);
		}
		console.log("beacon: " + beacons[i].namespace + beacons[i].instance + " distance: " + beacons[i].distance);
		fs.appendFile("./temp.txt", beacons[i].namespace + beacons[i].instance + "\n");
		++i;

	}
	console.log("\n");
	return;
}
