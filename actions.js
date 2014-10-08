$(document).ready(function() {
	$(document).on( "mousedown", ".cover", function(event) {
		switch (event.which) {
		        case 1: // left mouse click
		            $(this).remove();
		            break;
		        case 2: // middle mouse click
		        	break;
		        case 3: // right mouse click
		            if ($(this).html().length == 0) {
		            	$(this).html("&#9872");
		            }
		            else {
		            	$(this).html("");
		            }
		            break;
		}
	});
});