/**
 * JavaScript WorkUnit Interface
 * @author Henko
 */

// ***********************************
// Global variables
// ***********************************
var program = new Function("");
var data = {};
var checkpoint = null;
var lastprogress = 0;

// ***********************************
// Public Interface for the WokUnit
// ***********************************

var js = {};

// Evaluates Json string to Javascript object
js.evalJson = function(json)
{
	//Disable functions to restrict access
	var data 				= undefined;
	var checkpoint			= undefined;
	var lastprogress		= undefined;
	
	var run_program			= undefined;
	var onmessage 			= undefined;
	var postMessage 		= undefined;
	var Send				= undefined;
	var Run					= undefined;
	var Exception			= undefined;
	var arguments			= undefined;

	return eval("(" + json + ")");
}

// Converts a JavaScript object to Json string
js.toJson = function(obj)
{
	return "";
}

js.output = {};

// Writes output string into a stream with the given name
js.output.write = function(name, str)
{
	Send("write", { "name": name, "str": str} );
}

// Writes output string into a stream with the given name
js.output.writeLine = function(name, str)
{
	Send("write", { "name": name, "str": str + "\n"} );
}

js.input = {};

// Retrieves the content of a data file with the given name as a string
// If no such data was found, it returns null
js.input.read = function(name)
{
	return data[name];
}

js.work = {};

// Retrieves the content of a data file with the given name as a string
// If no such data was found, it returns null
js.work.getData = function(name)
{
	return data[name];
}

// Sets the current progress to the given rate between 0.0 and 1.0
js.work.setProgress = function(rate)
{
	var percent = Math.round(rate * 1000);
	if (percent > lastprogress) 
	{ 
		Send("progress", percent / 1000);
		lastprogress = percent;
	} 
}

// Saves the current state object as a checkpoint
js.work.setCheckpoint = function(state)
{
	Send("checkpoint", state);
	checkpoint = state; 
}

// Retrieves the last state object as a checkpoint
js.work.getCheckpoint = function()
{
	return checkpoint;
}

// Sends a debug message to the client framework
js.work.debug = function(message)
{
	 Send("debug", message); 
}

js.canvas = {};

// Notimplemented yet
js.canvas.clear = function() {}
js.canvas.beginPath = function() {}
js.canvas.moveTo = function() {}
js.canvas.lineTo = function() {}
js.canvas.arc = function() {}
js.canvas.stroke = function() {}
js.canvas.fill = function() {}
js.canvas.fillRect = function() {}
js.canvas.fillText = function() {}
js.canvas.setFillStyle = function() {}
js.canvas.setLineWidth = function() {}
js.canvas.setFont = function() {}
js.canvas.draw = function() {}


// Sends a message to the framework
function Send(command, data) 
{	
	postMessage({"command": command, "data": data});
};

// When a message arrives from the framework
onmessage = function (e)
{
	// Receive message data
	var command = e.data.command;
	var commanddata = e.data.data;
	
	// Set the workunit program code
	if (command == "program")
	{
		try
		{
			program = new Function("js", commanddata);
		}
		catch (x)
		{
			Send("exception", { "type" : "syntax", "exception" : x });
		}
		
		return;
	}
	
	// Set workunit data
	if (command == "data")
	{
		Send("debug", "Received input data: "+commanddata.openname); 
		data[commanddata.openname] = commanddata.inputdata;
		
		return;
	}
	
	// Set workunit checkpoint
	if (command == "checkpoint")
	{
		checkpoint = commanddata;
		
		return;
	}
	
	// Run the workunit program
	if (command == "run")
	{
		try
		{
			Send("running");
			
			var exit = run_program();
			if (exit == undefined) exit = 0;
			
			Send("done", exit);
		}
		catch (x)
		{
			Send("exception", { "type" : "runtime", "exception" : x });
		}
		
		return;
	}
}

// Excecute the program code
function run_program()
{
	//Disable functions to restrict access
	var data 				= undefined;
	var checkpoint			= undefined;
	var lastprogress		= undefined;
	
	var run_program			= undefined;
	var onmessage 			= undefined;
	var postMessage 		= undefined;
	var Send				= undefined;
	var Run					= undefined;
	var Exception			= undefined;
	var arguments			= undefined;

	//Run the code
	return program(js);
}