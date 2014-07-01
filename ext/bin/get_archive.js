#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	get_archive.js
//
//					Nov/17/2013
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
		if ('url_iarchive' in data_unit)
			{
			if (0 < data_unit.url_iarchive.indexOf ('archive.org'))
				{
				if (! ('publicdate' in data_unit))
					{
			console.log (key);
			var command = filter_exec_proc (key,data_unit);
			commands.push (command);
					}
				}
			}
		}

	return	commands
}

// ---------------------------------------------------------------
function filter_exec_proc (key,data_unit)
{
	var command = '';

	var uua = data_unit.url_iarchive;

	uua = uua.replace ("www.archive.org","archive.org");
	if (uua != "")
		{
//			console.log (key);
//			console.log (uua);
		var file_json = key + '.json';
		command = 'curl \'' +  uua + '&output=json\'';
		command += ' > ' + file_json;
		}

	return	command;
}

// ---------------------------------------------------------------
