const Express = require('express');
const Socket = require('socket.io');

const PORT = process.env.PORT || 3000;
const App = Express();

App.use(Express.static('public'));

const server = App.listen(PORT, ()=>console.log("listening on port", PORT));

//envokes socket.io
const IO = Socket(server);

//listens for connection then executes callback
IO.on("connection", OnConnection );

// callback function for IO.on
function OnConnection(socket)
{
	console.log("connected", socket.id);
	
	//listens for incomeing data named "message" from client
	socket.on("message", getMessage);


	// declared getMessage here so it has access to 'socket' variable.
	function getMessage(data)
	{
		// this sends the data to everyone but you
		//socket.broadcast.emit("message", data);

		//this send the data globally (to everyone)
		IO.sockets.emit("message", data);
		console.log(data);
	}
}


