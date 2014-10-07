// testInput function ensures all numbers input by the user are valid for the game
// grid must be between 8x8 and 40x30
// max mines must be less than columns*rows

function testInput() { // function to validate user inputs
	alert("working...");
	var columns = document.getElementById("x-axis").value;
	var rows = document.getElementById("y-axis").value;
	var mines = document.getElementById("mines").value;
	

	if(columns<8 || rows<8 || columns>40 || rows>30) { // test that grids are within bounds
		alert("Sorry, please enter a grid size between 8x8 and 40x30.");
	}
	else if (mines>=(columns*rows)) { // test that the number of mines does not exceed the grid area
		alert("Sorry, please enter a number of mines less than " + (columns*rows));
	}
	else {
		var popup_message = "Your minesweeper grid will be: " 
		+ document.getElementById("x-axis").value
		+ " by "
		+ document.getElementById("y-axis").value;
		alert(popup_message);

		createGrid(columns, rows, mines);
	}
}

function createGrid(columns, rows, mines) { // function to create the grid area
	alert("activation complete... all systems go!");
	var $newRow;
	var $myGrid;
	var cell;
	var i, j;

	$('table').html(""); // this line will remove a previous grid when creating a new one

	for (i=0; i<rows; i++) {
    	$newRow = $('<tr></tr>');

    	for (j=0; j<columns; j++) {
    		cell = document.createElement("td");
        	$newRow.append(cell); // Append an empty <td> element to the row that we are building.
    		cell.setAttribute("id", i + "_" + j)
    		//cell.setAttribute("class", "unclicked");
    		cell.setAttribute("class", 0);

    		$('table').append($newRow);
    	}
    	alert("row added");
	}

	generate(columns, rows, mines);
}

function generate(columns, rows, mines) { // function to generate bombs
	var xLocation;
	var yLocation;
	var i;
	var cell;

	for (i=0; i<mines; i++) {
		xLocation = (Math.floor(Math.random() * rows));
		yLocation = (Math.floor(Math.random() * columns));
		cell = "#" + xLocation + "_" + yLocation;
		if ($(cell).hasClass("9")) {
			i--;
		}
		else {
			$(cell).attr("class", "9");
		}
	}

	bombCount(columns, rows);
}

function bombCount(columns, rows) { // function to generate numbers on non-mine squares
	var i, j;
	var cell;
	var bombCounter;
	var top_left;
	var top_center;
	var top_right;
	var left;
	var right;
	var bot_left;
	var bot_center;
	var bot_right;

	for (i=0; i<rows; i++) {
		for (j=0; j<columns; j++) {

			cell = "#" + i + "_" + j;
			top_left = "#" + (i-1) + "_" + (j-1);
			top_center = "#" + (i-1) + "_" + j;
			top_right = "#" + (i-1) + "_" + (j+1);
			left = "#" + i + "_" + (j-1);
			right = "#" + i + "_" + (j+1);
			bot_left = "#" + (i+1) + "_" + (j-1);
			bot_center = "#" + (i+1) + "_" + j;
			bot_right = "#" + (i+1) + "_" + (j+1);

			bombCounter = 0;

			if (!($(cell).hasClass("9"))) {

				if ($(top_left).hasClass("9")) {
					bombCounter++;
				}
				if ($(top_center).hasClass("9")) {
					bombCounter++;
				}
				if ($(top_right).hasClass("9")) {
					bombCounter++;
				}
				if ($(left).hasClass("9")) {
					bombCounter++;
				}
				if ($(right).hasClass("9")) {
					bombCounter++;
				}
				if ($(bot_left).hasClass("9")) {
					bombCounter++;
				}
				if ($(bot_center).hasClass("9")) {
					bombCounter++;
				}
				if ($(bot_right).hasClass("9")) {
					bombCounter++;
				}

				$(cell).attr("class", bombCounter);

				if (!(bombCounter == 0)) { // only if there is an adjacent mine do we display a number
					$(cell).html(bombCounter);
				}
			}
		}
	}
}