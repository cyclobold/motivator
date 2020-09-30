"use strict"

import { weather } from './weather.js';

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

	let greetings = getGreetings(amPm, dateHours); //Get the appropriate greetings..

	if(dateHours > 12){
		dateHours = dateHours - 12;
		dateHours = dateHours.toString();
		if(dateHours.length == 1){
			dateHours = "0"+dateHours;
		}


	}else{
		if(dateHours == '0'){
			dateHours = '12';
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
					<h1>${dateHours}:${dateMinutes}<small>${amPm}</small><small style='font-size: .5em;'>${dateSeconds}</small><small style='font-size: 30px; position: relative;' onclick='return toggleClockMode()'><i class="fa fa-toggle-on"></i></small></h1>

		`;

	document.getElementById("action-query-id").children[0].innerHTML = greetings + "<hr>";

	clock_div.innerHTML = clockCode;


}, 1000);



function getGreetings(amOrPm, dateHours){
	return (amOrPm == "AM") ? getAmGreetings(amOrPm, dateHours) : getPmGreetings(amOrPm, dateHours);
}

function getAmGreetings(amOrPm, dateHours){

	return "Good morning,";
}

function getPmGreetings(amOrPm, dateHours){

	// /return (dateHours >= 5) ? "Good evening," : "Good afternoon,";
	return "Good afternoon, ";
}

//Make Action Clock swappable
//	
//	
//	




//Randomly selecting background images .. 
//Update the background Image to be loaded by JavaScript 
document.body.style.backgroundImage = "url('_thirdparties/images/gurkubondinn/peace.jpg')";





//Get the data from the textarea..
document.getElementById("create-action-button").addEventListener('click', function(){
	let action = document.querySelector("#new-action-id>textarea").value;
	//possible account creating syntax..
	
	if(action == 'Create new account'){
		test();
	}


});




