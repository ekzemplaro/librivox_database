#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	gen_languages.js
//
//					Mar/23/2014
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

var db_languages = new Array ();
for (var it=0; it< lines_in.length; it++)
	{
	if (0 < lines_in[it].length)
		{
		var language = process01 (lines_in[it]);
		if (0 < language.length)
			{
			if (db_languages.indexOf (language) < 0)
				{
				db_languages.push (language);
				}
			}
		}
	}

db_languages.sort ();
console.log (db_languages.length);

		var json_str_out = JSON.stringify (db_languages);

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
	var language = "";

	var json_str = fs.readFileSync (file_json_in);

	if (5 < json_str.length)
		{
		var data_aa = JSON.parse (json_str);

		if (! ("error" in data_aa))
			{
			language=filter_proc (data_aa);
			}
		}

	return	language;
}

// ---------------------------------------------------------------
function filter_proc (data_aa)
{
	var language = "";

//	console.log (data_aa.books);

	for (var it in data_aa.books)
		{
		var key = 'id_' + data_aa.books[it].id
		var unit_aa = new Object ();

		if ("language" in data_aa.books[it])
			{
			language = data_aa.books[it]["language"];
			}
		else
			{
			console.log ("*** error ***" + key);
			}
		}

	return	language;
}

// ---------------------------------------------------------------
