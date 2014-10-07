// testInput function ensures all numbers input by the user are valid for the game
// grid must be between 10x10 and 40x30
// max mines must be less than columns*rows
function testInput()
{
	alert("working...");
	var columns = document.getElementById("x-axis").value;
	var rows = document.getElementById("y-axis").value;
	var mines = document.getElementById("mines").value;
	

	if(columns<8 || rows<8 || columns>40 || rows>30) {
		alert("Sorry, please enter a grid size between 8x8 and 40x30.");
	}
	else if (mines>=(columns*rows)) {
		alert("Sorry, please enter a number of mines less than " + (columns*rows));
	}
	else {
		var popup_message = "Your minesweeper grid will be: " 
		+ document.getElementById("x-axis").value
		+ " by "
		+ document.getElementById("y-axis").value;
		alert(popup_message);
	}

	createGrid(columns, rows, mines);

}

function createGrid(columns, rows, mines) {
	alert("activation complete.. all systems go!");
	var $newRow;
	var $myGrid;
	var cell;
	var i, j;
	var cellID=1;
	var gridArea = columns*rows;
	this.mines = mines;

	for (i=0; i<rows; i++) {
    	$newRow = $('<tr></tr>');

    	for (j=0; j<columns; j++) {
    		cell = document.createElement("td");
        	$newRow.append(cell); // Append an empty <td> element to the row that we are building.
    		cell.setAttribute("id", cellID);
    		//cell.setAttribute("class", "unclicked");
    		cell.setAttribute("class", "notMine");
    		cellID++;
    	}

    	$('table').append($newRow);
    	
        alert("row added");
	}

	var myGrid = document.getElementById("#mainGrid");
	//var i; //index
	var mineLocation;
	var cell;


	for (i=0; i<mines; i++) {
		mineLocation = (Math.floor(Math.random() * gridArea));
		cell = myGrid.getElementById(mineLocation);
		if (cell.hasClass('isMine')) {
			mineLocation = (Math.floor(Math.random() * gridArea));
		}
		else {
			cell.setAttribute("class", "isMine");
		}
	}
	//$myGrid = $("#mainGrid");
	//placeMines(mines, gridArea, $myGrid);

}

/*function placeMines(mines, gridArea, $myGrid) {
	var i; //index
	var mineLocation;
	var cell;


	for (i=0; i<mines; i++) {
		mineLocation = (Math.floor(Math.random() * gridArea));
		cell = $(myGrid).getElementById(mineLocation);
		if (cell.hasClass('isMine')) {
			mineLocation = (Math.floor(Math.random() * gridArea));
		}
		else {
			cell.setAttribute("class", "isMine");
		}
	}
	

}*/