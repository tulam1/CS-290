document.addEventListener('DOMContentLoaded', bindButtons);

	//This function bind buttons after press into the table
	function bindButtons() {
		document.getElementById('submit_input').addEventListener('click', function(event) {
			var req = new XMLHttpRequest();
			var insert_data_url = 'http://flip3.engr.oregonstate.edu:2492/?name=';
			var name_in = document.getElementById('name').value;
			var reps_in = document.getElementById('reps').value;
			var weight_in = document.getElementById('weight').value;
			var date_in = document.getElementById('date').value;

			if (name_in != "") {
				insert_data_url += name_in;
			}

			else {
				insert_data_url += name_in;
				alert("Cannot have an empty spot in: Name");
				return;
			}

			if (reps_in != "") {
				insert_data_url += '&reps=' + reps_in;
			}

			if (weight_in != "") {
				insert_data_url += '&weight=' + weight_in;
			}

			if (date_in != "") {
				insert_data_url += '&date=' + date_in;
			}

			if (document.getElementById('lbs_true').checked) {
				insert_data_url += '&lbs=1';
			} 
			
			else if (document.getElementById('lbs_false').checked) {
				insert_data_url += '&lbs=0';
			}

			console.log(url);
			req.open('GET', insert_data_url, true);
			req.addEventListener('load', function() {
				if(req.status >= 200 && req.status < 400) {
					var resp = JSON.parse(req.responseText);
					var table = document.getElementById('table_result');
					var row = document.createElement("tr");
					for (var i in resp) {
						if (resp.hasOwnProperty(i)) {
							var cells = document.createElement("td");
							cells.textContent = resp[i];
							cells.id = i;
							if (cells.id == 'id') {
								cells.style.display = "none";
							}
							row.appendChild(cells);
						}
					}

					var delete_i = document.createElement("td");
					delete_i.id = "delete"
					delete_i.innerHTML = "<input type='button' value='delete' onClick='delete_item(this)'>"
					row.appendChild(delete_i);

					var edit_i = document.createElement("td");
					edit_i.id = "edit"
					edit_i.innerHTML = "<input type='button' value='edit' onClick='edit_item(this)'>"
					row.appendChild(edit_i);
					table.appendChild(row);
				}

				else {
					console.log("Error in network request: " + req.statusText);
				}
			});
			req.send(null);
			event.preventDefault();
		});
	}


	//This function is bind with the delete functionality
	function delete_item(item) {
		try {
			var req = new XMLHttpRequest();
			var table = document.getElementById('workout_legend');
			var address = `http://flip3.engr.oregonstate.edu:2492/?id=` + item.parentNode.parentNode.cells[0].innerHTML;

			req.open('GET', address, true);
			req.addEventListener('load', function() {
				if (req.status >= 200 && req.status < 400) {
				}

				else {
					console.log("Error in network request: " + req.statusText);
				}
			});
			req.send(null);
			event.preventDefault();

			var row_list = table.rows.length;
		    for (var n = 0; n < row_list; n++) {
				var id_row = table.rows[i];
				if (row == current_row.parentNode.parentNode) {
					table.deleteRow(n);
		            row_list--;
		            n--;
		        }
		    }
		}

		catch (e) {
			alert(e);
		}
	}


	//This is for the edit functionality
	function edit_item(current_item) {
			console.log("Hit edit button");
			location.href = "/edit?id=" + current_item.parentNode.parentNode.cells[0].innerHTML;
	}