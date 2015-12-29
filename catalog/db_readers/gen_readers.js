#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	gen_readers.js
//
//					Dec/27/2015
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

	var db_readers = new Object ();
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
			db_readers[key] = data_bb[key];
				}
			}
		}
	}

console.log (Object.keys (db_readers).length);

		var json_str_out = JSON.stringify (db_readers);

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

if (json_str.toString().substr (0,1) != '<')
{
if (5 < json_str.length)
	{
	try
		{
	var data_aa = JSON.parse (json_str);

	if (! ("error" in data_aa))
		{
		var data_bb=readers_filter_proc (data_aa);
		}
		}
	catch (e)
		{
		console.log ("*** error *** process01 ***");
		}
	}
}

	return	data_bb;
}
// ---------------------------------------------------------------
function readers_filter_proc (data_aa)
{
	var data_bb = new Object ();

	for (var it in data_aa.books)
		{
		var key = 'id_' + data_aa.books[it].id
		var unit_aa = new Object ();
		data_bb = get_readers_proc (data_aa.books[it]);
		}

	return	data_bb;
}

// ---------------------------------------------------------------
function get_readers_proc (book_in)
{
	var data_bb = new Object ();

	for (var it in book_in.sections)
		{
		var section = book_in.sections[it];
		if ('readers' in section)
			{
			if (0 < section['readers'].length)
			{
			for (var jt in section['readers'])
			{
			if ('reader_id' in section['readers'][jt])
				{
			var id = "r" + section['readers'][jt]['reader_id'];
			var display_name = section['readers'][jt]['display_name'];
				data_bb[id] = display_name;
				}
			}
			}
			}
		}

	return	data_bb;
}

// ---------------------------------------------------------------
