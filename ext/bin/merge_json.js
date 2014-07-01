#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	merge_json.js
//
//					Nov/08/2013
//
// ---------------------------------------------------------------
var fs = require("fs");
// ---------------------------------------------------------------
// console.log ("*** 開始 ***");

var file_list=process.argv[2];
var file_json_merged=process.argv[3];

console.log (file_list);
console.log (file_json_merged);

var data_merged = new Object ();

var data = fs.readFileSync (file_list);
var lines_in = ("" + data).split ("\n");
for (var it=0; it< lines_in.length; it++)
	{
//	console.log (lines_in[it]);
	var file_json_in = lines_in[it];
	if (3 < file_json_in.length)
		{
	var json_str_in = fs.readFileSync (file_json_in);
	if (1 < json_str_in.length)
		{
		var data_in = JSON.parse (json_str_in);
		data_merged=merge_proc (data_merged,data_in);
		}
		}
	}

	var json_str_out = JSON.stringify (data_merged);

	fs.writeFile (file_json_merged,json_str_out);
/*



//	console.log (data_bb);

	}

*/
console.log ("*** 終了 ***");
// ---------------------------------------------------------------
function merge_proc (data_merged,data_in)
{
//	console.log (data_aa.books);
	for (var key in data_in)
		{
		var value = data_in[key];

//		console.log (key);
//		console.log (value);
		data_merged[key] = value;
		}

	return	data_merged;
}

// ---------------------------------------------------------------
