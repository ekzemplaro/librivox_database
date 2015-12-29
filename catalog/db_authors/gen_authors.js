#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	gen_authors.js
//
//					Feb/01/2015
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

	if (json_str.toString().substr (0,1) != '<')
	{
	if (5 < json_str.length)
		{
		try
                        {
		var data_aa = JSON.parse (json_str);
		if (! ("error" in data_aa))
			{
			data_bb=filter_proc (data_aa);
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
function filter_proc (data_aa)
{
	var data_bb = new Object ();

//	console.log (data_aa.books);

	for (var it in data_aa.books)
		{
		var book_cur = data_aa.books[it];
		var key = 'id_' + book_cur.id
		var unit_aa = new Object ();

		if ("authors" in book_cur)
			{
			if (book_cur.authors[0] != null)
				{
			if ("id" in book_cur.authors[0])
				{
		var id_author = book_cur.authors[0].id;
		unit_aa['last_name'] = book_cur.authors[0].last_name;
		unit_aa['first_name'] = book_cur.authors[0].first_name;

		var key = "a" + id_author;
		data_bb[key] = unit_aa;
				}
				}
			else
				{
	if (0 < book_cur["url_iarchive"].length)
			{
			console.log ("*** authors error *** " + key);
			}
				}
			}
		else
			{
			console.log ("*** authors error *** " + key);
			}
		}

	return	data_bb;
}

// ---------------------------------------------------------------
