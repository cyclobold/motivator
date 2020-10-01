export function weather(){

	//get the user's current location.. 
	if(navigator.geolocation){
			//get the longitude and latitude of this user 
			navigator.geolocation.getCurrentPosition(showPosition);
	
	}

}

async function showPosition(position){
	//document.getElementById("nav-middle").innerHTML = `You are here: Longitude: ${position.coords.longitude}, Latitude: ${position.coords.latitude}`;

	//resolve
	await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=172292c16873f81dd92079617fb3e269`)
	.then((result)=>result.json())
	.then((result) =>{
		//console.log(result);
		//get the weather code ..
		const weather_code = result['weather'][0]['icon'];
		const humidity = result['main']['humidity'];
		const temp = result['main']['temp'];
		const pressure = result['main']['pressure'];
		const weather_description = result['weather'][0]['description'];

		const weather_icon = `<div id='weather-info-id'> 
							<div id='weather-img-id'><img src='http://openweathermap.org/img/wn/${weather_code}@2x.png' style='margin-top: -30px;'></div>
								<!--<div id='weather-desc'><small>${weather_description}</small></div>-->
								<div id='weather-meta-id'><small>humidity: ${humidity} temp: ${temp}</small></div>
							
							</div>`;

		document.getElementById("nav-middle").innerHTML = weather_icon;

	})
	

}
weather();
setInterval(weather, 1800000);//Call every 30 minutes
