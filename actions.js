$(document).ready(function() {
	$(document).on( "mousedown", ".cover", function(event) {
		switch (event.which) {
		        case 1: // left mouse click
		            if ($(this).html().length == 0) {
		            	$(this).remove(); // if the left-clicked, covered cell has no flag indicator, then the cover is removed

		            	activeCell = ($(this).attr('id')).substring(6);
		            	activeClass = $('#' + activeCell).attr('class');

		            	switch (activeClass) {
		            		case '9': 
		            			$('div').remove('.cover'); // if player uncovers a bomb, the player loses, all covers dissapear and game stops
		            			break;
		            		case '0':
		            			activeCellCoords = activeCell.split("_");
		            			blankClick(parseInt(activeCellCoords[0]), parseInt(activeCellCoords[1])); // if player uncovers a blank space, the blankClick function executes
		            		default:
		            			if ($( '.cover' ).length == $( '.9' ).length) { // if the number of covers remaining equals the number of bombs, the player wins!
		            				$( '.cover' ).addClass( 'win' ).removeClass( 'cover' );
		            				alert('You Win!');
		            			}
		            			break;
		            	}
		            }
		            break;
		        case 2: // middle mouse click
		        	break; // middle click does nothing
		        case 3: // right mouse click
		            if ($(this).html().length == 0) {
		            	$(this).html("&#9872"); // if the right-clicked, covered cell has no flag indicator, then a flag indicator is created
		            }
		            else {
		            	$(this).html(""); // if the right-clicked, covered cell has a flag indicator, then the flag indicator is removed
		            }
		            break;
		}
	});
});