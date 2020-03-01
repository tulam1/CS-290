document.addEventListener('DOMContentLoaded', bindButton);

function bindButton() {
	document.getElementById("POST_url").addEventListener('click', function(event) {
		var req = new XMLHttpRequest()
		var url_link = `http://httpbin.org/post`;
		var information = {"student_name": null, "id_number": null, "email_address": null};
		information.student_name = document.getElementById("user_name").value;
		information.id_number = document.getElementById("id_number").value;
		information.email_address = document.getElementById("email").value;

		req.open("POST", url_link, true);
		req.setRequestHeader("Content-Type", "application/json");

		req.addEventListener('load', function () {
			if (req.status >= 200 & req.status < 400) {
				var report = JSON.parse(JSON.parse(req.responseText).data);
				studentInfo(report);
			}
			
			else {
				console.log("ERROR!");
			}
		});

		req.send(JSON.stringify(information));
		event.preventDefault();
	});
}

function studentInfo(report) {
    document.getElementById("st_name").textContent = report.student_name;       
    document.getElementById("num_id").textContent = report.id_number;
    document.getElementById("email_add").textContent = report.email_address;
}