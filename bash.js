
var command = require('./command');


process.stdout.write('prompt > ');

process.stdin.on('data', function(data){

	
	var cmdList = data.toString().trim().split(/\s*\|\s*/g);
	cmdList = cmdList.map(function(e){
		return e.split(' ');
	});
	var cmdInit = cmdList[0][0];
	console.log(cmdList[0].slice(1));
	command[cmdInit](null, cmdList[0].slice(1));
	//command[cmdList[0][0]](null, cmdList[0].slice(1), done);
	//console.log(cmdList);
	//var cmd = input[0];
	//var file = input.slice(1);

	//command[cmd](file, done); // why does this work without invoking the function as well?
	function done(output){
		process.stdout.write(output);
		process.stdout.write('\nprompt > ');
	}

});



