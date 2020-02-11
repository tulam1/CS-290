document.addEventListener("DOMContentLoaded", function() {
	var html_body = document.body;
	var table1 = createTable();

	/*****************************************
	 * Creating a table
	*****************************************/
	function createTable() {
		var table_4x4 = document.createElement("table");
		var tablerow = document.createElement('tr');

		for (var i = 1; i <= 4; i++) {
			var tablerowchild = document.createElement('th');
			tablerowchild.textContent = ("Header " + i);
			tablerow.appendChild(tablerowchild);
		}
		table_4x4.appendChild(tablerow);	
		return table_4x4;
	}

	html_body.appendChild(table1);

	/************************************
	 *Creating the other table section
	 ***********************************/
	for (var i = 1; i <= 3; i++) {
		var NewRow = document.createElement('tr');

			for (var j = 1; j <= 4; j++) {
				var NewRowChild = document.createElement('td');
				NewRowChild.textContent = (i + " , " + j);
				NewRow.appendChild(NewRowChild);
				NewRowChild.style.textAlign = "center";
			}
		table1.appendChild(NewRow);
	}

	html_body.appendChild(table1);

	/**************************************
	 *Set the initial stage of the box
	 *************************************/
	 var x = 1;		//This served as coordinate in the x
	 var y = 0;		//This served as coordinate in the y
     var CellSelect = table1.children[x].children[y];
	 CellSelect.style.border = "3px solid";

	/**************************************
	 *This function is to update the cell
	 *************************************/
	function UpdateCell() {
		CellSelect.style.border = "none";
		CellSelect = table1.children[x].children[y];
		CellSelect.style.border = "3px solid";
		return CellSelect;
	
	}

	//This is for dividing the button from the table
	var divider = document.createElement("br");
	html_body.appendChild(divider);

	/***************************************
     *This is for creating the button
	 **************************************/
	var upbttn = document.createElement("button");
	upbttn.textContent = "Up";
	upbttn.id = "updir";
	upbttn.style.width = '100px';
	upbttn.style.height = '20px';
	html_body.appendChild(upbttn);

	var downbttn = document.createElement("button");
	downbttn.textContent = "Down";
	downbttn.id = "downdir";
	downbttn.style.width = '100px';
	downbttn.style.height = '20px';
	html_body.appendChild(downbttn);

	var lebttn = document.createElement("button");
	lebttn.textContent = "Left";
	lebttn.id = "leftdir";
	lebttn.style.width = '100px';
	lebttn.style.height = '20px';
	html_body.appendChild(lebttn);

	var ribttn = document.createElement("button");
	ribttn.textContent = "Right";
	ribttn.id = "rightdir";
	ribttn.style.width = '100px';
	ribttn.style.height = '20px';
	html_body.appendChild(ribttn);

	//Divider no.2
	var divider2 = document.createElement("br");
	html_body.appendChild(divider2);
	var divider3 = document.createElement("br");
	 html_body.appendChild(divider3);

	/*******************************************
	 *This is for the mark cell button
	 ******************************************/
	var mark = document.createElement("button");
	mark.textContent = "Mark Cell";
	mark.id = "markhit";
	mark.style.width = '100px';
	mark.style.height = '20px';
	html_body.appendChild(mark);

	/*******************************************
	 *This is for the controller of the button
	*******************************************/
	function controldown() {
		if ("downdir") {
			if (x < 3) {
				x++;
				CellSelect = UpdateCell();
			}
		}
	}

	function controlup() {
		if ("updir") {
		 	if (x > 1) {
			 	 x--;
				 CellSelect = UpdateCell();
			}
		}
	}

	function controlright() {
		if ("rightdir") {
		 	if (y < 3) {
			 	 y++;
				 CellSelect = UpdateCell();
			}
		}
	}

	function controlleft() {
		if ("leftdir") {
		 	if (y > 0) {
			 	 y--;
				 CellSelect = UpdateCell();
			}
		}
	}

	//This function is for selection of a cell to be color
	function selectMark() {
		if ("markhit") {
			CellSelect.style.backgroundColor = "yellow";
		}
	}

	//This section set the control for the button whe nthe user press it
	document.getElementById("downdir").addEventListener('click', function() {controldown()});
	document.getElementById("updir").addEventListener('click', function() {controlup()});
	document.getElementById("rightdir").addEventListener('click', function() {controlright()});
	document.getElementById("leftdir").addEventListener('click', function() {controlleft()});
	document.getElementById("markhit").addEventListener('click', function() {selectMark()});

});
