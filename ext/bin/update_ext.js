#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	update_ext.js
//
//					Oct/23/2014
//
// ---------------------------------------------------------------
var fs = require("fs");
// ---------------------------------------------------------------
// console.log ("*** 開始 ***");

var file_json_in=process.argv[2];
var file_out=process.argv[3];

console.log (file_json_in);
console.log (file_out);

var json_str = fs.readFileSync (file_json_in);

if (1 < json_str.length)
	{
	var data_aa = JSON.parse (json_str);
	var keys_number=filter_proc (data_aa);

	var str_out = "";

	var ll_keys = keys_number.length;
 
	var key_max = keys_number[ll_keys - 1];

	for (var it=1;  it < 10; it++)
		{
		keys_number.push (key_max + it);
		}
 
	for (var it=0;  it < keys_number.length; it++)
		{
		var key_number=keys_number[it];

//		if (it < 4)
//		if (it < 3)
//			{
			fetch_proc (key_number);
//			}

		str_out += key_number + '\n';
		}

	fs.writeFile (file_out,str_out);
	}

// console.log ("*** 終了 ***");
// ---------------------------------------------------------------
// [4]:
function filter_proc (data_aa)
{
	var keys_number = new Array ();

	for (var key in data_aa)
		{
		var data_unit = data_aa[key];
		if (! ('publicdate' in data_unit))
			{
			var key_number = parseInt(key.substr (3));
			keys_number.push (key_number);
			}
		}

	return	keys_number;
}

// ---------------------------------------------------------------
// [6]:
function fetch_proc (key_number)
{
	var url_head='https://librivox.org/api/feed/audiobooks/?id='
	var url_tail='&extended=1&format=json'

	var key = key_number.toString(10);

	url = url_head + key + url_tail;

	fetch_exec_proc (url,key);
}

// ---------------------------------------------------------------
function fetch_exec_proc (url,key)
{
	var file_json = "ex_" + key + '.json';
	var file_ft_json = "ft_" + key + '.json';

	console.log (file_json);

	var https = require('https');

https.get(url, function(res) {
	var body = '';
	res.setEncoding('utf8');
	
	res.on ('data', function (chunk) {
	body += chunk;
	});

	res.on('end', function() {
	fs.writeFile (file_json,body);
	var json_str_ft = convert_proc (body);
	fs.writeFile (file_ft_json,json_str_ft);
	});

}).on('error', function(ee) {
	console.error(ee);
});
}

// ---------------------------------------------------------------
function convert_proc (json_str_ex)
{
	var data_ex = JSON.parse (json_str_ex);
	var data_ft = convert_exec_proc (data_ex);

	var json_str_ft = JSON.stringify (data_ft);

	return	json_str_ft;
}

// ---------------------------------------------------------------
function convert_exec_proc (data_aa)
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
