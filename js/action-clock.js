"use strict"
//import  { Elementree } from './elementree.js';

import { weather } from './weather.js';

//get the clock div 
let clock_div = document.getElementById("action-clock-id");

//get the childNodes of new_action_id
let new_action_id = document.getElementById("new-action-id");

let textarea = new_action_id.children[0];

//Pull the placeholder from the server..
//Placeholders will be changing periodically...
textarea.placeholder = "Finish a new chapter of my book before 12pm";

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

	let greetings = getGreetings(amPm, dateHours); //Get the appropriate greetings..
	

	
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
					<h1>${dateHoursString}:${dateMinutesString}<small>${amPm}</small><small style='font-size: .5em;'>${dateSecondsString}</small><small id='clock-toggle-id' style='font-size: 30px; position: relative;' title='change clock mode'>${clockModeToggleIcon}</small></h1>

		`;

		document.getElementById("action-query-id").children[0].innerHTML = greetings + "<hr style='margin-bottom: -10px;'>";

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
								<small id='clock-toggle-id' style='font-size: 30px;' title='change clock mode'>${clockModeToggleIcon}</small>
								</div>
								`;

	document.getElementById("action-query-id").children[0].innerHTML = greetings + "<hr style='margin-bottom: -10px;'>";

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

	return "Good morning, James ";
}

function getPmGreetings(amOrPm, dateHours){

	// /return (dateHours >= 5) ? "Good evening," : "Good afternoon,";
	//return "Good afternoon, ";
	//console.log(amOrPm);
	return (amOrPm == 'PM' && dateHours >= 5 && dateHours < 12 && dateHours != 12 ) ? "Good evening, James " : "Good afternoon, James ";


	
}


//Get the data from the textarea..
document.getElementById("create-action-button").addEventListener('click', function(){
	let action = document.querySelector("#new-action-id>textarea").value;
	//possible account creating syntax..
	
	if(action == 'Create new account'){
		test();
	}
});



/**
 * Clock Settings --
 */

document.getElementById("action-clock-tools").addEventListener('click', function(e){

	const toolsDialogElement  = document.createElement("div");

	//Add a class to this element 
	toolsDialogElement.classList.add('action-tools-class');

	const action_tools_div = document.getElementById("action-tools-div");
	action_tools_div.style.display = 'block';

	if(action_tools_div.children.length > 0){
			//There are children..
			const test_class = document.querySelectorAll("div.action-tools-class");

			for(let i = 0; i < test_class.length; i++){
				document.getElementById("action-tools-div").removeChild(test_class[i]);
			}	
		action_tools_div.style.display = 'none';
	}else{
		//there are no children .. 
		toolsDialogElement.innerHTML = `<h3>Tools and Preferences</h3>
									<hr>
									<form id='action-tools-settings-id'>
										<div>
											<label>Background Images</label>
											
											<div style='display: flex; margin-top: 10px;'>
												<input type='checkbox' name='show_background' id='action-show-background' value='on'> Show Background Image 
											</div>

										</div>

									</form>
									`;
		const appendedElement = document.getElementById("action-tools-div").appendChild(toolsDialogElement);

		//check the localStorage for the current background settings .. 
		let current_background_settings = localStorage.getItem("action-background-settings");
		if(current_background_settings){
				current_background_settings = JSON.parse(current_background_settings);
				//apply the current settings to the form ..
				if(current_background_settings['show_background'] == true){
					//the add "checked" to the attribute of the form ..
					document.getElementById("action-show-background").setAttribute("checked", "checked");
				}

		}



		//Settings for the Background Image.
		document.getElementById("action-show-background").onclick = function(e){

			if(this.checked){
				//the background image option is checked ..
				//add the background image 
				//Randomly selecting background images .. 
				//Update the background Image to be loaded by JavaScript 
				//Set the CSS of the background image from here ..
				document.body.style.background = "url('_thirdparties/images/gurkubondinn/peace.jpg')";
				document.body.style.backgroundRepeat = "no-repeat";
				document.body.style.backgroundSize = "cover";
				document.body.style.backgroundAttachment = "fixed";

				const backgroundSettings = {
					'show_background' : true,
					'background_url' : '_thirdparties/images/gurkubondinn/peace.jpg',
					'updated_at' : null,
				}

				//set the localStorage??? 
				//console.log(e.view.localStorage);
				localStorage.setItem('action-background-settings', JSON.stringify(backgroundSettings));
				

			}else{
				//the background image is removed ..
				//remove the background image and resolve back to the background color ..
				document.body.style.background = "#000";

				//Set this to the localStorage .. 
				const backgroundSettings = {
					'show_background' : false,
					'background_url' : null,
					'updated_at': null
				}

				localStorage.setItem('action-background-settings', JSON.stringify(backgroundSettings));

			}
			
	

		}


		
	}	


	


});


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}



function closeTool(){

	alert('working');

}




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



/**
 * Clicks on the body document directly ..
 */
document.onclick = function(){
		
		//remove any modals on the page ..
		//check if any modals is opened ..
		



}



