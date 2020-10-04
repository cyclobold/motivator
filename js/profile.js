"use strict"


//Once the page loads ...
//Check the localStorage for the background Image ..
//This may need to be cached to prevent the flipping ..
window.addEventListener("DOMContentLoaded", function(){

	let background_settings = localStorage.getItem('action-background-settings');

	if(background_settings){
		background_settings = JSON.parse(background_settings);
		//use the background instead..
		if(background_settings['show_background'] == true){
			document.body.style.background = "url('" + background_settings['background_url'] + "')";
			document.body.style.backgroundRepeat = "no-repeat";
			document.body.style.backgroundSize = 'cover';
			document.body.style.backgroundAttachment = "fixed";

		}else{
			/**
			background: url('../_thirdparties/images/gurkubondinn/peace.jpg');
			background-size: cover;
			background-repeat: no-repeat;
			background: black
			color: white;
			background-attachment: fixed;
			font-family: 'IBM Plex Mono', monospace;
			 */
			document.body.style.background = "#000";

		}

	}else{
		document.body.style.background = "#000";
	}

});


/**
 * Opens the Create Profile Form
 */
function test(){
		//brings up the form.. 
		const create_profile_button = document.getElementById("create-profile-id");
		const oldContent = JSON.stringify(create_profile_button.parentElement.innerHTML);

		let formCode = `
						<div class='form-box'>
						
							<button class='close-modal btn-cancel-sm btn-transparent' onclick='return cancelCreateProfile(${oldContent})'>Cancel</button>
						<form class='form'>
							<h2>Create Account</h2>
							<div class='form-group'>
								<label>First name</label>
								<input type='text' name='firstname' class='' placeholder='Your First name'>
							</div>

							<div class='form-group'>
								<label>Last name</label>
								<input type='text' name='lastname' class='' placeholder='Your Last name'>
							</div>

							<div class='form-group'>
								<label>Email</label>
								<input type='email' name='email' class='' placeholder='Your Email'>
							</div>

							<div class='form-group'>
								<label>Password</label>
								<input type='password' name='password' class='' placeholder='Your Password'>
							</div>

							<div class='form-group'>
								<button type='button' class='btn-create-lg'>Create Profile</button>
							</div>

						</form>
						</div>`;


		//add this form to the page..
		create_profile_button.parentElement.innerHTML = formCode;

}


function cancelCreateProfile(oldContent){
	//remove this form.. 
	document.getElementById("right-navlinks").innerHTML = oldContent;
	
}
