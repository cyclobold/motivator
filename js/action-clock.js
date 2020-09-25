"use strict"
//get the clock div 
let clock_div = document.getElementById("action-clock-id");

//get the childNodes of new_action_id
let new_action_id = document.getElementById("new-action-id");

let textarea = new_action_id.children[0];

//Pull the placeholder from the server..
//Placeholders will be changing periodically...
textarea.placeholder = "Meeting with James at 12pm tomorrow";

setInterval(function(){
	//get the current time 
	const date = new Date();
	//get the minutes ..
	let dateMinutes = date.getMinutes();
	//get the hours 
	let dateHours = date.getHours();

	let dateSeconds = date.getSeconds();
	//Set the hours from 24hrs to 12hrs .. 
	//Set AM and PM
	const amPm = (dateHours >= 12) ? "PM" : "AM";

	if(dateHours > 12){
		dateHours = dateHours - 12;
		dateHours = dateHours.toString();
		if(dateHours.length == 1){
			dateHours = "0"+dateHours;
		}
	}

	
	//set the use minutes 
	dateMinutes = dateMinutes.toString();
	if(dateMinutes.length == 1){
		dateMinutes = "0"+dateMinutes;
	}

	dateSeconds = dateSeconds.toString();
	if(dateSeconds.length == 1){
		dateSeconds = "0"+dateSeconds;
	}


	let clockCode = `
					<h1>${dateHours}:${dateMinutes}<small>${amPm} </small><small style='font-size: .5em;'>${dateSeconds}</small></h1>

		`;

	clock_div.innerHTML = clockCode;


}, 1000);


//Make Action Clock swappable
//	