//***************TWITTER  BOOTSTRAP MESSAGEBOX v1.0**********************
//***********************************************************************
//***********************************************************************
//***********************************************************************
//***a production of ADDY, ABDUL-RAHEEM OKAI; email:aroaddy@gmail.com****
//***********************************************************************
//***********************************************************************
//***********************************************************************
//***********************************************************************


//Constructs the messagebox by displaying the bootstrap modal box
//title --> Tile of the message
//text --> Body of the message box
//buttons --> An array of the buttons to display together with their functions for callback


//***********************************************************************
//This is an example of the function being called from another code
/*var buttons =  [
	{text: "Yaaay",
	  size: "xs",
	  background: "info",	
	  funct: function(){
	  	alert('Button one was clicked')
	  }},
	{text: "Not at all",
	  size: "md",
	  background: "warning",	
	  funct: function(){
	  	alert('Button two was clicked')
	  }},
	{text: "I'm not bothered!",
	  size: "lg",
	  background: "danger",
	  funct: function(){
	  	alert('Button three was clicked')
	}}
];

var message new Message(0, "Matrimony", "<h3>Do you want to take Nii Okai Addy as your lovely wedded husband?</h3>", buttons);
message.show()*/



//Function that applies the click action of the code
var actions = new Array();
var Message = function message(n, title, text, buttons) {

	$("body").append('<div class="modal fade" id="message' + n + '"></div>');

	//Template for the buttons
	var button = '<button onclick="APPLY" class="btn btn-SIZE btn-MODE"  data-dismiss="modal">TEXT</button>';

	//main message template for use
	var message = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header">' +
	'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
	'<h1 class="modal-title">TITLE</h1></div><div class="modal-body">TEXT</div>' +
	'<div class="modal-footer">BUTTONS</div></div></div>';
	
	var buts = "";
	
	actions = new Array();

	//Loop through all the submitted buttons and create their html data
	for (var i = 0; i < buttons.length; i++) {
		var but = button;
		but = but.replace("SIZE", buttons[i].size);
		but = but.replace("MODE", buttons[i].background);
		but = but.replace("TEXT", buttons[i].text);
		but = but.replace("APPLY", "caller(" + n + "," + i + ")");
		actions.push(buttons[i].funct);
		buts = buts + but;

	};

	//Swapping the message values
	message = message.replace("TITLE", title);
	message = message.replace("TEXT", text);
	message = message.replace("BUTTONS", buts);
	this.message = message;
	this.n = n;
}

Message.prototype.show = function() {
	//Displaying the message
	$(".modal-dialog").remove();
	$('#message' + this.n).append(this.message);
	$('#message' + this.n).modal('toggle');
}


function caller(n, index) {
	actions[index].apply();
	$('#message' + n).modal('toggle');
}
