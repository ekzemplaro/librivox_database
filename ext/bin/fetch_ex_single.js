#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	ext/bin/fetch_ex_single.js
//
//					Dec/23/2015
//
// ---------------------------------------------------------------
var fs = require("fs");
var filter_archive_exec=require ("./filter_archive_exec");
var json_different_check = require ("./json_different_check");
// ---------------------------------------------------------------
// [6]:
exports.fetch_ex_single_proc = function (key_number)
{
	var key = key_number.toString(10);

	fetch_ex_single_exec_proc (key);
}

// ---------------------------------------------------------------
function fetch_ex_single_exec_proc (key)
{
	var file_json = "ex_" + key + '.json';
	var file_ft_json = "ft_" + key + '.json';

//	console.log (file_json);

	var https = require('https');

	var path_head='/api/feed/audiobooks/?id='
	var path_tail='&extended=1&format=json'

	var path_aa = path_head + key + path_tail;
	var options = {
	host: 'librivox.org',
	port: 443,
	path: path_aa,
	rejectUnauthorized: false,
};

https.get(options, function(res) {
	var body = '';
	res.setEncoding('utf8');
	
	res.on ('data', function (chunk) {
	body += chunk;
	});

	res.on('end', function() {

	var hantei = json_different_check.json_different_check_proc (body,file_json);

	if (hantei != true)
		{
		console.log ("*** different ***");
		fs.writeFile (file_json,body);
		try
			{
		var json_str_ft = convert_to_ft_proc (body);
			}
		catch (e)
			{
		console.log ("*** error ***");
		console.log ("key = " + key);
			}

		fs.writeFile (file_ft_json,json_str_ft);
		}
	else
		{
		var json_str_ft = convert_to_ft_proc (body);
//		console.log ("*** equal ***");
		}
	});

}).on('error', function(ee) {
	console.error(ee);
});
}

// ---------------------------------------------------------------
function convert_to_ft_proc (json_str_ex)
{
	var data_ex = JSON.parse (json_str_ex);
	var array = convert_to_ft_exec_proc (data_ex);

	var key = array[0];
	var data_ft = array[1];

	if (key in data_ft)
	{
	var data_unit = data_ft[key];
//	console.log ("key = " + key);

	if ('url_iarchive' in data_unit)
		{
//		console.log ("*** url_iarchive ***");
		if (0 < data_unit.url_iarchive.indexOf ('archive.org'))
			{
//			console.log (data_ft[key].url_iarchive);
			filter_archive_exec.filter_archive_exec_proc (key,data_unit);
			}
		}
	}

	var json_str_ft = JSON.stringify (data_ft);

	return	json_str_ft;
}

// ---------------------------------------------------------------
function convert_to_ft_exec_proc (data_aa)
{
	var data_bb = new Object ();

	for (var it in data_aa.books)
		{
//		console.log (it);
//		console.log (data_aa.books[it].title);
//		console.log (data_aa.books[it].language);
//		console.log (data_aa.books[it].url_librivox);
//		console.log (data_aa.books[it].url_iarchive);

		var key = 'id_' + data_aa.books[it].id
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

	return	[key,data_bb];
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
