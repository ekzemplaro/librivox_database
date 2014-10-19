#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	update_ext.js
//
//					Oct/19/2014
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
	var keys_number=filter_proc (data_aa);

	var str_out = "";

	var ll_keys = keys_number.length;
 
	var key_max = keys_number[ll_keys - 1];

	for (var it=1;  it < 10; it++)
		{
		keys_number.push (key_max + it);
		}
 
	for (var it=0;  it < keys_number.length; it++)
		{
		var key_number=keys_number[it];

//		if (it < 8)
//			{
			fetch_proc (key_number);
//			}

		str_out += key_number + '\n';
		}

	fs.writeFile (file_out,str_out);
	}

// console.log ("*** 終了 ***");
// ---------------------------------------------------------------
// [4]:
function filter_proc (data_aa)
{
	var keys_number = new Array ();

	for (var key in data_aa)
		{
		var data_unit = data_aa[key];
		if (! ('publicdate' in data_unit))
			{
			var key_number = parseInt(key.substr (3));
			keys_number.push (key_number);
			}
		}

	return	keys_number;
}

// ---------------------------------------------------------------
// [6]:
function fetch_proc (key_number)
{
	var url_head='https://librivox.org/api/feed/audiobooks/?id='
	var url_tail='&extended=1&format=json'

	var key = key_number.toString(10);

	var idx = key.replace ("_","=");
	var file_json = "ex_" + key + '.json';
	url = url_head + key + url_tail;

	fetch_exec_proc (url,file_json);
}

// ---------------------------------------------------------------
function fetch_exec_proc (url,file_json)
{
//	console.log (url);
	console.log (file_json);

	var https = require('https');

https.get(url, function(res) {
	var body = '';
	res.setEncoding('utf8');
	
	res.on ('data', function (chunk) {
	body += chunk;
	});

	res.on('end', function() {
	fs.writeFile (file_json,body);
	});

}).on('error', function(ee) {
	console.error(ee);
});
}

// ---------------------------------------------------------------
