document.addEventListener('DOMContentLoaded', bindButton);

function bindButton() {
	document.getElementById("GET_url").addEventListener('click', function(event) {
		var req = new XMLHttpRequest();
		var zip_input = document.getElementById("zipcode").value;
		var city_input = document.getElementById("city").value;
		var ccode1	= document.getElementById("c1").value;
		var ccode2	= document.getElementById("c2").value;
		var url_link;

		if (zip_input.length == 5) {
			url_link = `https://api.openweathermap.org/data/2.5/weather?q=${zip_input},${ccode1}&units=imperial&appid=df4557e26e66197438934d55ef5c720a`;
		}
		
		else {
			url_link = `http://api.openweathermap.org/data/2.5/weather?q=${city_input},${ccode2}&units=imperial&appid=df4557e26e66197438934d55ef5c720a`;
		}

		req.open("GET", url_link, true);

		req.addEventListener('load', function () {
			if (req.status >= 200 & req.status < 400) {
				var report = JSON.parse(req.responseText);
				weatherInfo(report);
			}
			
			else {
				console.log("ERROR!");
			}
		});

		req.send();
		event.preventDefault();
	});
}

function weatherInfo(report) {
    document.getElementById("temperature").textContent = report.main.temp;       
    document.getElementById("humidity").textContent = report.main.humidity;
    document.getElementById("pressure").textContent = report.main.pressure;
    document.getElementById("sunrise").textContent = report.sys.sunrise;
}