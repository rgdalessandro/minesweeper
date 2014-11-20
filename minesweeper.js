// grid must be between 8x8 and 40x30
// min mines must be at least 1
// max mines must be less than columns*rows

function testInput() { // function to validate user inputs
	columns = document.getElementById("x-axis").value;
	rows = document.getElementById("y-axis").value;
	mines = document.getElementById("mines").value;
	

	if(columns<8 || rows<8 || columns>40 || rows>30) { // test that grids are within bounds
		alert("Sorry, please enter a grid size between 8x8 and 40x30.");
	}
	else if (mines > (columns*rows) - 1 || mines < 1) { // test that the number of mines does not exceed the grid area and is greater than 1
		alert("Sorry, please enter a number of mines greater than 0 and less than " + (columns*rows));
	}
	else {
		createGrid(columns, rows, mines);
	}
}

function createGrid(columns, rows, mines) { // function to create the grid area
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
	
	borderSquares = ["top_left","top_center","top_right","left","right","bot_left","bot_center","bot_right"]; // array for iterating through broder squares

	$("#cover_" + row + "_" + column).remove(); // removes cover for blanks that were not directly clicked on

	for ( i in borderSquares )
	{
		a = {};	// object holding the coordinates to clear and check for blanks
		a.top_left = (row - 1) + "_" + (column - 1);
		a.top_center = (row - 1) + "_" + column;
		a.top_right = (row - 1) + "_" + (column + 1);
		a.left = row + "_" + (column - 1);
		a.right = row + "_" + (column + 1);
		a.bot_left = (row + 1) + "_" + (column - 1);
		a.bot_center = (row + 1) + "_" + column;
		a.bot_right = (row + 1) + "_" + (column + 1);

		coords = a[borderSquares[i]].split("_");

		if ($("#" + a[borderSquares[i]]).hasClass("0") && $("#cover_" + coords[0] + "_" + coords[1]).length ) {
			blankClick(parseInt(coords[0]), parseInt(coords[1])); // if bordersquare is a blank and still has a cover, send it through blankClick()
		}
		else
		{
			$("#cover_" + a[borderSquares[i]] ).remove(); // if not, just clear its cover
		}
	}
}

function autoClick(row, column, cellClass) { // function to clear the bordering squares of "saturated" cells
	borderSquares = ["top_left","top_center","top_right","left","right","bot_left","bot_center","bot_right"]; // array for iterating through broder squares
	bombCounter = 0;

	for ( i in borderSquares )
	{
		b = {};	// object holding the coordinates to surrounding square covers
		b.top_left = "cover_" + (row - 1) + "_" + (column - 1);
		b.top_center = "cover_" + (row - 1) + "_" + column;
		b.top_right = "cover_" + (row - 1) + "_" + (column + 1);
		b.left = "cover_" + row + "_" + (column - 1);
		b.right = "cover_" + row + "_" + (column + 1);
		b.bot_left = "cover_" + (row + 1) + "_" + (column - 1);
		b.bot_center = "cover_" + (row + 1) + "_" + column;
		b.bot_right = "cover_" + (row + 1) + "_" + (column + 1);

		if (($( ('#' + b[borderSquares[i]]) ).hasClass('flagged'))) {
			bombCounter++;
		}
	}

	if ( bombCounter == cellClass ) { // the following code only runs if the correct number of mines are flagged
		for ( j in borderSquares ) {
			if (!($(('#' + b[borderSquares[j]])).hasClass('flagged'))) {
				$(('#' + b[borderSquares[j]])).remove(); // if the covered cell has no flag indicator, then the cover is removed

				activeCell = b[borderSquares[j]].substring(6);
				activeClass = $('#' + activeCell).attr('class');

				switch (activeClass) {
					case '9': 
						$('div').remove('.cover'); // if player uncovers a bomb, the player loses, all covers dissapear and game stops
						break;
					case '0':
						activeCellCoords = activeCell.split('_');
						blankClick(parseInt(activeCellCoords[0]), parseInt(activeCellCoords[1])); // if player uncovers a blank space, the blankClick function executes
					default:
						if ($( '.cover' ).length == $( '.9' ).length && activeClass != '9' ) { // if the number of covers remaining equals the number of bombs, the player wins!
							$( '.cover' ).addClass( 'win' ).removeClass( 'cover' );
							alert('You Win!');
						}
						break;
				}
			}
		}
	}
}