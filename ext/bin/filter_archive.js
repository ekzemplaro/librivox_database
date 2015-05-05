#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	filter_archive.js
//
//					May/02/2015
//
// ---------------------------------------------------------------
var fs = require("fs");
// ---------------------------------------------------------------
// console.log ("*** 開始 ***");
var id=process.argv[2];
var file_json_in=process.argv[3];

var key = 'id_' + id;
var file_json_out = 'is_' + id + '.json';
// console.log (file_json_in);
// console.log (file_json_out);

var json_str = fs.readFileSync (file_json_in);

if (1 < json_str.length)
	{
	console.log (key);
	var data_aa = JSON.parse (json_str);
	var data_bb=filter_archive_proc (key,data_aa);

	var json_str_out = JSON.stringify (data_bb);

	fs.writeFile (file_json_out,json_str_out);
	}

// console.log ("*** 終了 ***");
// ---------------------------------------------------------------
function filter_archive_proc (key,data_aa)
{
	var data_bb = new Object ();
	var unit_aa = new Object ();

//	console.log (data_aa.metadata.publicdate);
//	console.log (data_aa.item.downloads);

	unit_aa['publicdate'] = data_aa.metadata.publicdate[0];
	unit_aa['title'] = data_aa.metadata.title[0];

	data_bb[key] = unit_aa;

	return	data_bb;
}

// ---------------------------------------------------------------
