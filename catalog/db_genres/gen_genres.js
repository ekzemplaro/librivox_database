#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	gen_genres.js
//
//					Jan/29/2015
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

var db_genres = new Array ();
for (var it=0; it< lines_in.length; it++)
	{
	if (0 < lines_in[it].length)
		{
		var language = process01 (lines_in[it]);
		if (0 < language.length)
			{
			if (db_genres.indexOf (language) < 0)
				{
				db_genres.push (language);
				}
			}
		}
	}

db_genres.sort ();
console.log (db_genres.length);

		var json_str_out = JSON.stringify (db_genres);

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
	var genre = "";

	var json_str = fs.readFileSync (file_json_in);

	if (5 < json_str.length)
		{
		var data_aa = JSON.parse (json_str);

		if (! ("error" in data_aa))
			{
			genre=filter_proc (data_aa);
			}
		}

	return	genre;
}

// ---------------------------------------------------------------
function filter_proc (data_aa)
{
	var genre = "";

//	console.log (data_aa.books);

	for (var it in data_aa.books)
		{
		var key = 'id_' + data_aa.books[it].id
		var unit_aa = new Object ();

		if ("genres" in data_aa.books[it])
			{
			if (0 < data_aa.books[it]["genres"].length)
				{

			if ("name" in data_aa.books[it]["genres"][0])
				{
			genre = data_aa.books[it]["genres"][0]["name"];
				}
			else
				{
			console.log ("*** genres error ***" + key);
				}
				}
			else
				{
			console.log ("*** genres error ***" + key);
//			console.log (data_aa.books[it]["genres"].length);
				}
			}
		else
			{
			console.log ("*** genres error ***" + key);
			}
		}

	return	genre;
}

// ---------------------------------------------------------------
