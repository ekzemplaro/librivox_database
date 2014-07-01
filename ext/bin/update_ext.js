#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	update_ext.js
//
//					Nov/23/2013
//
// ---------------------------------------------------------------
var fs = require("fs");
// ---------------------------------------------------------------
// console.log ("*** 開始 ***");

var file_json_in=process.argv[2];
var file_out=process.argv[3];

console.log (file_json_in);
console.log (file_out);

var json_str = fs.readFileSync (file_json_in);

if (1 < json_str.length)
	{
	var data_aa = JSON.parse (json_str);
	var commands=filter_proc (data_aa);

	var str_out = "";

	for (var it=0;  it < commands.length; it++)
		{
		str_out += commands[it] + '\n';
		}

	fs.writeFile (file_out,str_out);
	}

// console.log ("*** 終了 ***");
// ---------------------------------------------------------------
function filter_proc (data_aa)
{
	var commands = new Array ();

	for (var key in data_aa)
		{
		var data_unit = data_aa[key];
		if (! ('publicdate' in data_unit))
			{
//			console.log (key);
			var command = filter_exec_proc (key);
			commands.push (command);
			}
		}

	return	commands
}

// ---------------------------------------------------------------
function filter_exec_proc (key)
{
	var url_head='https://librivox.org/api/feed/audiobooks/?'
	var url_tail='&extended=1&format=json'

	var command = '';

	var idx = key.replace ("_","=");
	var file_json = key.replace ("id","ex") + '.json';
	command = 'curl -k \'' +  url_head + idx + url_tail;
	command += '\' > ' + file_json;

	return	command;
}

// ---------------------------------------------------------------
