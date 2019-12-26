window.addEventListener('load', () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = "https://cors-anywhere.herokuapp.com/";
			const api = `${proxy}https://api.darksky.net/forecast/14d3d884aa990f4d73ce2890d1cc846e/${lat},${long}`;

			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);
					const { temperature, summary, icon } = data.currently;
					//Set DOM elemets from the API
					let helpTemperature = (temperature - 32) / 1.8000
					temperatureDegree.textContent = Math.ceil(helpTemperature);
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;
					//Set icon
					setIcons(icon, document.querySelector(".icon"));

				});

		});
	}

	function setIcons(icon, iconID){
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}

});