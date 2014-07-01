#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	gen_combined.js
//
//					Sep/21/2013
//
// ---------------------------------------------------------------
var fs = require("fs");
// ---------------------------------------------------------------
// console.log ("*** 開始 ***");
var file_json_librivox=process.argv[2];
var file_json_archive=process.argv[3];
var file_json_out=process.argv[4];

console.log (file_json_librivox);
console.log (file_json_archive);
console.log (file_json_out);

var json_str_librivox = fs.readFileSync (file_json_librivox);
var json_str_archive = fs.readFileSync (file_json_archive);

if ((1 < json_str_librivox.length) && (1 < json_str_archive.length))
	{
	var data_librivox = JSON.parse (json_str_librivox);
	var data_archive = JSON.parse (json_str_archive);

	var data_out=filter_proc (data_librivox,data_archive);

	var json_str_out = JSON.stringify (data_out);

	fs.writeFile (file_json_out,json_str_out);
	}

// console.log ("*** 終了 ***");
// ---------------------------------------------------------------
function filter_proc (data_librivox,data_archive)
{
	var data_out = new Object ();
	var unit_aa = new Object ();

//	console.log (data_aa.metadata.publicdate);
//	console.log (data_aa.item.downloads);

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
		}

//	data_bb[key] = unit_aa;

	return	data_out;
}

// ---------------------------------------------------------------
