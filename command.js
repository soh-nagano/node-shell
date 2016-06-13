var fs = require('fs');

var request = require('request');

module.exports = {
	pwd: function (stdin, file, done) {
		process.stdout.write(process.cwd());
		process.stdout.write('\nprompt > ');
	},

	date: function (stdin, file, done) {
		var date = new Date();
		process.stdout.write(date.toString());
		process.stdout.write('\nprompt > ');
	},
	
	ls: function (stdin, file, done) {
		fs.readdir('.', function(err, files){
			if(err) throw err;
			files.forEach(function(file) {
				process.stdout.write(file.toString() + '\n');
			})
			process.stdout.write('prompt > ');
		});
	},
	echo: function(stdin, file, done) {
		var i = 0;
		while(file[i]){
			if(file[i][0] === "$" && process.env[file[i].slice(1)] !== null) {
				process.stdout.write(process.env[file[i].slice(1)] + " ");
			} else {
				process.stdout.write(file[i] + " ");
			}
			i++;
		}
		process.stdout.write('\nprompt > ');
	},
	cat: function(stdin, file, done) {
		fs.readFile(file[0], 'utf8', function(err, data){
			if(err) throw err;
			process.stdout.write(data);
			process.stdout.write('\nprompt > ');
		});
	},
	head: function(stdin, file, done) {
		fs.readFile(file[0], 'utf8', function(err, data){
			if(err) throw err;
			var lines = data.split('\n');
			var i = 0;
			var output = '';
			while(i < 5 && lines[i]!== undefined){
				output = output + lines[i] + '\n';
				i++;
			}
			done(output);
		});
	},
	sort: function(stdin, file, done) {
		fs.readFile(file[0], 'utf8', function(err, data){
			if(err) throw err;
			var lines = data.split('\n');
			for (var j = 0; j < lines.length; j++){
				lines[j] = lines[j].trim();
			}
			lines.sort();
			var output = "";
			var i = 0;
			while(lines[i]!== undefined){
				output = output + lines[i] + '\n';
				i++;
			}
			done(output);
		});
	},
	wc: function(stdin, file, done) {
		fs.readFile(file[0], 'utf8', function(err, data){
			if(err) throw err;
			var lines = data.split('\n');
			var count = lines.length;
			done(count.toString());
		});
	},
	curl: function(stdin, file, done) {
		var url = 'http://www.' + file[0];
		request(url, function (error, response, body) {
			if (!error && response.statusCode == 200) {
			done(body); // Show the HTML for the Google homepage.
			}
		});
		
	}
}
