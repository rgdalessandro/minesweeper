// grid must be between 8x8 and 40x30
// min mines must be at least 1
// max mines must be less than columns*rows

function testInput() { // function to validate user inputs
	var columns = document.getElementById("x-axis").value;
	var rows = document.getElementById("y-axis").value;
	var mines = document.getElementById("mines").value;
	

	if(columns<8 || rows<8 || columns>40 || rows>30) { // test that grids are within bounds
		alert("Sorry, please enter a grid size between 8x8 and 40x30.");
	}
	else if (mines>=(columns*rows) || mines < 1) { // test that the number of mines does not exceed the grid area and is greater than 1
		alert("Sorry, please enter a number of mines greater than 0 and less than " + (columns*rows));
	}
	else {
		createGrid(columns, rows, mines);
	}
}

function createGrid(columns, rows, mines) { // function to create the grid area
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
    		cell.setAttribute("id", i + "_" + j) // Sets ID of cell equal to its coordinates
    		cell.setAttribute("class", 0); // Sets class of empty cell equal to zero

    		$('table').append($newRow);
    	}
	}

	generateMines(columns, rows, mines);
}

function generateMines(columns, rows, mines) { // function to generate bombs
	var xLocation;
	var yLocation;
	var i;
	var cell;

	for (i=0; i<mines; i++) {
		xLocation = (Math.floor(Math.random() * rows));
		yLocation = (Math.floor(Math.random() * columns));
		cell = "#" + xLocation + "_" + yLocation;
		if ($(cell).hasClass("9")) {
			i--; // If randomly chosen cell already has a bomb, go back through this loop without incrementing i
		}
		else {
			$(cell).attr("class", "9"); // Sets class of randomly chosen bomb cell to 9
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

				if (!(bombCounter == 0)) { // only if there is an adjacent mine do we display a number, otherwise leave blank
					$(cell).html(bombCounter);
				}
			}

			else {
				$(cell).html("&#9873;"); // if cell contains a bomb, it gets filled with a solid flag
			}
		}
	}
	coverGrid(columns, rows);
}

function coverGrid(columns, rows) { // function to create divs to overlay and block the view of the grid underneath
	var i, j;
	var cell, cover;

	for (i=0; i<rows; i++) {
		for (j=0; j<columns; j++) {

			cell = "#" + i + "_" + j;
			cover = "cover_" + i + "_" + j;

			$(cell).append("<div id='" + cover +"' class='cover'></div>")
		}
	}	

	$("table").on("contextmenu", function(evt) {evt.preventDefault();}); // prevent right-click from displaying default context menu
}

function blankClick(row, column) { // function to automatically clear blank cells
	

	borderSquares = ["top_left","top_center","top_right","left","right","bot_left","bot_center","bot_right"];

	$("#cover_" + row + "_" + column).remove();

	console.log("(" + row + ", " + column + ") BLANK");

	for ( i in borderSquares )
	{
		a = {};
		a.top_left = (row - 1) + "_" + (column - 1);
		a.top_center = (row - 1) + "_" + column;
		a.top_right = (row - 1) + "_" + (column + 1);
		a.left = row + "_" + (column - 1);
		a.right = row + "_" + (column + 1);
		a.bot_left = (row + 1) + "_" + (column - 1);
		a.bot_center = (row + 1) + "_" + column;
		a.bot_right = (row + 1) + "_" + (column + 1);

		console.log(a);
		coords = a[borderSquares[i]].split("_");
		console.log("Checking " + borderSquares[i] + " Cords: (" + coords[0] + ", " + coords[1] + ")" + " Root: (" + row + ", " + column + ")" );

		if ($("#" + a[borderSquares[i]]).hasClass("0") && $("#cover_" + coords[0] + "_" + coords[1]).length ) {
			console.log(borderSquares[i] + " is Blank");
			blankClick(parseInt(coords[0]), parseInt(coords[1]));
		}
		else
		{
			$("#cover_" + a[borderSquares[i]] ).remove();
		}

		a={};

	}


	return;
}