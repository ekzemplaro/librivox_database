#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	gen_authors.js
//
//					Mar/22/2014
//
// ---------------------------------------------------------------
var fs = require("fs");
// ---------------------------------------------------------------
console.log ("*** 開始 ***");

var file_in=process.argv[2];
var file_json_out=process.argv[3];

console.log (file_in);
// console.log (file_json_out);

var data = fs.readFileSync (file_in,'utf8');

var lines_in = ("" + data).split ("\n");

var db_authors = new Object ();
for (var it=0; it< lines_in.length; it++)
	{
	if (0 < lines_in[it].length)
		{
//		console.log (it + "\t" + lines_in[it]);
		var data_bb = process01 (lines_in[it]);
		if (0 < Object.keys (data_bb).length)
			{
			for (var key in data_bb)
				{
			db_authors[key] = data_bb[key];
				}
			}
		}
	}

console.log (Object.keys (db_authors).length);

		var json_str_out = JSON.stringify (db_authors);
//		console.log (json_str_out);

fs.writeFile (file_json_out,json_str_out, function (err)
		{
		if (err) {
		console.log("Error on write: " + err)
		} else {
		console.log("File written.");
		}
		});

console.log ("*** 終了 ***");
// ---------------------------------------------------------------
function process01 (file_json_in)
{
	var data_bb = new Object ();

	var json_str = fs.readFileSync (file_json_in);

	if (5 < json_str.length)
		{
		var data_aa = JSON.parse (json_str);

		if (! ("error" in data_aa))
			{
			data_bb=filter_proc (data_aa);
			}
		}

	return	data_bb;
}

// ---------------------------------------------------------------
function filter_proc (data_aa)
{
	var data_bb = new Object ();

//	console.log (data_aa.books);

	for (var it in data_aa.books)
		{
		var key = 'id_' + data_aa.books[it].id
		var unit_aa = new Object ();

		if ("authors" in data_aa.books[it])
			{
			if (data_aa.books[it].authors[0] != null)
				{
			if ("id" in data_aa.books[it].authors[0])
				{
		var id_author = data_aa.books[it].authors[0].id;
		unit_aa['last_name'] = data_aa.books[it].authors[0].last_name;
		unit_aa['first_name'] = data_aa.books[it].authors[0].first_name;

		var key = "a" + id_author;
		data_bb[key] = unit_aa;
				}
				}
			else
				{
			console.log ("*** error ***" + key);
				}
			}
		else
			{
			console.log ("*** error ***" + key);
			}
		}

	return	data_bb;
}

// ---------------------------------------------------------------
