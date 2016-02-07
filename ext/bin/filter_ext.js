#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	filter_ext.js
//
//					Feb/07/2016
//
// ---------------------------------------------------------------
var fs = require("fs");
// ---------------------------------------------------------------
// console.log ("*** 開始 ***");

var file_json_in=process.argv[2];
var file_json_out=process.argv[3];

// console.log (file_json_in);
// console.log (file_json_out);

var json_str = fs.readFileSync (file_json_in);

if (1 < json_str.length)
	{
	var data_aa = JSON.parse (json_str);
	var data_bb=filter_proc (data_aa);

	var json_str_out = JSON.stringify (data_bb);

	fs.writeFile (file_json_out,json_str_out);
	}

// console.log ("*** 終了 ***");
// ---------------------------------------------------------------
function filter_proc (data_aa)
{
	var data_bb = new Object ();

//	console.log (data_aa.books);
	for (var it in data_aa.books)
		{
//		console.log (it);
//		console.log (data_aa.books[it].title);
//		console.log (data_aa.books[it].language);
//		console.log (data_aa.books[it].url_librivox);
//		console.log (data_aa.books[it].url_iarchive);

		var idx = data_aa.books[it].id
		if (idx.length == 3)
			{
			idx = '0' + idx
			}
		else if (idx.length == 2)
			{
			idx = '00' + idx
			}

		var key = 'id_' + idx
		var unit_aa = new Object ();
		unit_aa['title'] = data_aa.books[it].title;
		unit_aa['language'] = data_aa.books[it].language;
		unit_aa['totaltime'] = data_aa.books[it].totaltime;
		unit_aa['url_librivox'] = data_aa.books[it].url_librivox;
		unit_aa['url_iarchive'] = data_aa.books[it].url_iarchive;
		unit_aa['readers'] = get_readers_proc (data_aa.books[it]);

		if (0 < data_aa.books[it].authors.length)
			{
			unit_aa['authors'] = data_aa.books[it].authors[0].id;
			}

		if (0 < data_aa.books[it].genres.length)
			{
			unit_aa['genres'] = data_aa.books[it].genres[0].name;
			}

		data_bb[key] = unit_aa;
		}

	return	data_bb;
}

// ---------------------------------------------------------------
function get_readers_proc (book_in)
{
	var array_readers = new Array ();

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
			var reader = section['readers'][jt]['reader_id'];
				array_readers.push (reader);
				}
			}
			}
			}
		}

	var array_out = array_readers.filter(function (x, i, self) {
            return self.indexOf(x) === i;
        });

	return	array_out.sort ();
}

// ---------------------------------------------------------------
