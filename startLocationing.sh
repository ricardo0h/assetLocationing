#!/bin/bash

source ./number_of_beacons.sh

while true; do
	detect_bt=$(hcitool scan)

	i=1
	found_devices=0
	echo $(cat /sys/class/net/eth0/address) > found_devices.txt
	while [ $i -le $devices ];
	do
		found=$(echo $detect_bt |grep $(sed -n "$i"p conf.txt))
		if [[ ! -z "$found" ]];
		then
			echo $(sed -n "$i"p conf.txt) >> found_devices.txt
			let found_devices=found_devices+1
		fi
		i=$[i+1]
	done

	echo found $found_devices Bluetooth beacons
	sleep 5
done
