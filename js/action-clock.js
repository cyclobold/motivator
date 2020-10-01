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

startClock();
setInterval(startClock, 1000);

function startClock(){
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

	let dateHoursString = null;

	if(dateHours > 12){
		dateHours = dateHours - 12;
		dateHoursString = dateHours.toString();
		if(dateHoursString.length == 1){
			dateHoursString = "0"+dateHoursString;
		}


	}else{
		if(dateHours == 0){
			dateHoursString = '12';
		}else{
			dateHoursString = dateHours.toString();
		}
	}

	

	
	//set the use minutes 
	let dateMinutesString = dateMinutes.toString();
	if(dateMinutesString.length == 1){
		dateMinutesString = "0"+dateMinutesString;
	}

	let dateSecondsString = dateSeconds.toString();
	if(dateSecondsString.length == 1){
		dateSecondsString = "0"+dateSecondsString;
	}

	//Get the Current Clock Mode ..
	let currentClockMode = localStorage.getItem('clock-mode');
	currentClockMode = (!currentClockMode) ? 'digital' : JSON.parse(currentClockMode);

	let clockModeToggleIcon = (currentClockMode['mode'] == 'digital') 
							? `<i class="fa fa-toggle-on"></i>`
							: `<i class="fa fa-toggle-off"></i>`;

	//load the appropriate clockMode..
	let clockCode = null;

	if(currentClockMode['mode'] == 'digital'){

		clockCode = `
					<h1>${dateHoursString}:${dateMinutesString}<small>${amPm}</small><small style='font-size: .5em;'>${dateSecondsString}</small><small id='clock-toggle-id' style='font-size: 30px; position: relative;'>${clockModeToggleIcon}</small></h1>

		`;

		document.getElementById("action-query-id").children[0].innerHTML = greetings + "<hr>";

		clock_div.innerHTML = clockCode;
	}else{

		//Analog Mode..
		let dateSecondsRatio = dateSeconds / 60;
		let dateMinutesRatio = (dateSecondsRatio + dateMinutes) / 60;
		let dateHoursRatio = (dateMinutesRatio + dateHours) / 12;


	
	
	//Create the elements
	clockCode = `		<div class='digital-clock-box'>
						<div class='digital-clock'>
									<div class='hand hour' data-hour></div>
									<div class='hand minute' data-minute></div>
									<div class='hand second' data-second></div>
									<div class='number num12'>|</div>
									<div class='number num3'>|</div>
									<div class='number num6'>|</div>
									<div class='number num9'>|</div>
								</div>
								<small id='clock-toggle-id' style='font-size: 30px;'>${clockModeToggleIcon}</small>
								</div>
								`;

	document.getElementById("action-query-id").children[0].innerHTML = greetings + "<hr>";

	clock_div.innerHTML = clockCode;
	//add this newly created element to the DOM..
		//document.getElementById("action-clock-id").innerHTML = clockCode; 
		//get data attributes from the document
		const hourHand = document.querySelector("[data-hour]");
		const minuteHand = document.querySelector("[data-minute]");
		const secondHand = document.querySelector("[data-second]");

		if(hourHand != null){
			setHandRotation(hourHand, dateHoursRatio);
		}

		if(minuteHand != null){
			setHandRotation(minuteHand, dateMinutesRatio);
		}

		if(secondHand != null){
			setHandRotation(secondHand, dateSecondsRatio);
		}

		//remove the photo By info in the bottom left corner ..
		document.getElementById("left-footer-links").innerHTML = "Explore Analog";

		

	}





	document.getElementById('clock-toggle-id').addEventListener('click', toggleClockMode);


}





// --- Continue --
// 

function setHandRotation(element, rotationRatio){
	element.style.setProperty('--rotation', rotationRatio * 360);
}


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
//document.body.style.backgroundImage = "url('_thirdparties/images/gurkubondinn/peace.jpg')";





//Get the data from the textarea..
document.getElementById("create-action-button").addEventListener('click', function(){
	let action = document.querySelector("#new-action-id>textarea").value;
	//possible account creating syntax..
	
	if(action == 'Create new account'){
		test();
	}
});


/**
 * Toggles the Clock Mode between Digital and Analog
 * - The default mode is 'digital'
 * @return {[type]} [description]
 */
function toggleClockMode(){

	//when clicked changes the mode to analog..
	//check the current clock mode..
	//settings for the clock is saved to the localStorage..
	let clockMode = localStorage.getItem("clock-mode");
	clockMode = (!clockMode) ? 'digital' : JSON.parse(clockMode);

	if(clockMode['mode'] == 'digital'){
		//change to analog..and
		//change the switch icon
		let clockModeObj = {
			'mode' : 'analog',
			'settings': {},
			'updated_at' : {}
		}

		localStorage.setItem('clock-mode', JSON.stringify(clockModeObj));
		//call the loadAnalogClock() function
		loadAnalogClock();
	}else{
		//change to digital..
		//change the switch icon
		let clockModeObj = {
			'mode' : 'digital',
			'settings': {},
			'updated_at' : {}
		}

		localStorage.setItem('clock-mode', JSON.stringify(clockModeObj));
		//call the loadDigitalClock() function
		loadDigitalClock();
		
		
	}

}

function loadAnalogClock(){

	//change the switch icon..
	//<i class="fa fa-toggle-off"></i>
	document.getElementById("clock-toggle-id").innerHTML = `<i class="fa fa-toggle-off"></i>`;
	//alert("Changed to Analog");
	//
	//Create the elements
	let analogClockContainer = `<div class='digital-clock'>
									<div class='hand hour'></div>
									<div class='hand minute'></div>
									<div class='hand second'></div>
									<div class='number num12'>12</div>
									<div class='number num3'>3</div>
									<div class='number num6'>6</div>
									<div class='number num9'>9</div>
								</div>`;



	//add this newly created element to the DOM..
	document.getElementById("action-clock-id").innerHTML = analogClockContainer; 



}

function loadDigitalClock(){
	document.getElementById("clock-toggle-id").innerHTML = `<i class="fa fa-toggle-on"></i>`;
	//alert("Changed to digital");
	location.reload();
}


document.getElementById("action-clock-tools").addEventListener('click', loadClockTools);



/**
 * Loads the Clock Tools...
 * Allows the following settings..
 * 
 * @return {[type]} [description]
 */
function loadClockTools(){
	event.preventDefault();
	
}




