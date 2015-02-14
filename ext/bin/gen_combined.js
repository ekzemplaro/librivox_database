#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	gen_combined.js
//
//					Feb/14/2015
//
// ---------------------------------------------------------------
var fs = require("fs");
// ---------------------------------------------------------------
// console.log ("*** 開始 ***");
var file_json_librivox=process.argv[2];
var file_json_archive=process.argv[3];
var file_json_wiki=process.argv[4];
var file_json_out=process.argv[5];

console.log (file_json_librivox);
console.log (file_json_archive);
console.log (file_json_wiki);
console.log (file_json_out);

var json_str_librivox = fs.readFileSync (file_json_librivox);
var json_str_archive = fs.readFileSync (file_json_archive);
var json_str_wiki = fs.readFileSync (file_json_wiki);

if ((1 < json_str_librivox.length) && (1 < json_str_archive.length))
	{
	var data_librivox = JSON.parse (json_str_librivox);
	var data_archive = JSON.parse (json_str_archive);
	var data_wiki = JSON.parse (json_str_wiki);

	var data_out=merge_filter_proc (data_librivox,data_archive,data_wiki);

	var json_str_out = JSON.stringify (data_out);

	fs.writeFile (file_json_out,json_str_out);
	}

// console.log ("*** 終了 ***");
// ---------------------------------------------------------------
function merge_filter_proc (data_librivox,data_archive,data_wiki)
{
	var data_out = new Object ();
	var unit_aa = new Object ();

/*
	for (var key_wiki in data_wiki)
		{
		console.log (key_wiki);


		var key_id = "id_" + key_wiki.slice (1);
		if (key_id in data_librivox)
			{
			console.log (data_librivox[key_id].title);
			}
		}
*/

	for (var key in data_librivox)
		{
		data_out[key] = data_librivox[key];

		if (key in data_archive)
			{
			for (var item in data_archive[key])
				{
				data_out[key][item] = data_archive[key][item];
				}
			}

//	Feb/14/2015
		data_out[key]["status"] = -1;

		var key_wiki = "b" + key.slice (3);
		if (key_wiki in data_wiki)
			{
//			var key_id = "id_" + key_wiki.slice (1);
			console.log (key);
			data_out[key]["status"] = data_wiki[key_wiki].status;
			}
		}


	return	data_out;
}

// ---------------------------------------------------------------
