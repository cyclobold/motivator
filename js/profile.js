"use strict"

/**
 * Opens the Create Profile Form
 */

const create_profile_button = document.getElementById("create-profile-id");

create_profile_button.addEventListener("click", function(){
		
		//brings up the form.. 
		
		let formCode = `
						<div>
						<form class=''>
							<div>
								<label>First name</label>
								<input type='text' name='firstname' class=''>
							</div>

							<div>
								<label>Last name</label>
								<input type='text' name='lastname' class=''>
							</div>

							<div>
								<label>Email</label>
								<input type='email' name='email' class=''>
							</div>

							<div>
								<label>Password</label>
								<input type='password' name='password' class=''>
							</div>


						</form>
						</div>`;


		//add this form to the page..
		console.log(create_profile_button.parentElement);




})

