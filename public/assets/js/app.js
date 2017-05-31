var	socket = io.connect(window.location.href);// gets location from window object

//listens for incomeing data named "message" from server
socket.on("message", addToChat );

//on click function
$('#message-form').submit(function(e){
	e.preventDefault();
	let message = $("#message").val().trim();	
	$("#message").val('');
	postMessage(message);
	
});

//function to sent to server
function postMessage(message)
{
	let data = {
		text: message
	};
	//this sends the data object to the server with the name "message"
	socket.emit('message', data);
}


function addToChat(message)
{

	let p = $('<p>');
	p.html("> "+ message.text);
	$("#chat-box").append(p);

	//this adjusts scroll to bottom of div.
 	let elem = document.getElementById('chat-box');
 	elem.scrollTop = elem.scrollHeight;

 	/*
	 	//Same as above but using Jquery.
	 	// .scrollHeight is a js property. so to go it in jquery we use .prop()
	 	let elem = $("#chat-box");
	 	elem.scrollTop(test.prop('scrollHeight'));
 	*/	
}