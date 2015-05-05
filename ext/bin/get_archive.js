#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	get_archive.js
//
//					May/02/2015
//
// ---------------------------------------------------------------
var fs = require("fs");
// ---------------------------------------------------------------
// console.log ("*** 開始 ***");

var file_json_in=process.argv[2];

console.log (file_json_in);

var json_str = fs.readFileSync (file_json_in);

if (1 < json_str.length)
	{
	var data_aa = JSON.parse (json_str);
	filter_archive_proc (data_aa);
	}

// console.log ("*** 終了 ***");
// ---------------------------------------------------------------
function filter_archive_proc (data_aa)
{
	for (var key in data_aa)
		{
		var data_unit = data_aa[key];
		if ('url_iarchive' in data_unit)
			{
			if (0 < data_unit.url_iarchive.indexOf ('archive.org'))
				{
				if (! ('publicdate' in data_unit))
					{
					console.log (key);
					filter_archive_exec_proc (key,data_unit);
					}
				}
			}
		}
}

// ---------------------------------------------------------------
function filter_archive_exec_proc (key,data_unit)
{
	var url = '';

	var uua = data_unit.url_iarchive;

	uua = uua.replace ("www.archive.org","archive.org");
	uua = uua.replace ("http:","https:");

	if (uua != "")
		{
		url =  uua + '&output=json';
		archive_fetch_exec_proc (url,key)
		}

}

// ---------------------------------------------------------------
function archive_fetch_exec_proc (url,key)
{
	var file_json = key + '.json';

	console.log (url);
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

// <!DOCTYPE html>

	var head_portion = body.substr (0,9);
	console.log (head_portion);
	if (head_portion !== "<!DOCTYPE")
		{
	var data_aa = JSON.parse (body);
	var data_shorten = filter_arhive_shorten_proc (key,data_aa);
	var file_shorten_json = "is_" + file_json.substring (3);
		var json_str_out = JSON.stringify (data_shorten);
		fs.writeFile (file_shorten_json,json_str_out);
		}
	});

}).on('error', function(ee) {
	console.error(ee);
});
}

// ---------------------------------------------------------------
function filter_arhive_shorten_proc (key,data_aa)
{
	var data_shorten = new Object ();
	var unit_aa = new Object ();

//	console.log (data_aa.metadata.publicdate);
//	console.log (data_aa.item.downloads);

	unit_aa['publicdate'] = data_aa.metadata.publicdate[0];
	unit_aa['title'] = data_aa.metadata.title[0];

/*
	unit_aa['downloads'] = 0;

	if ('item' in data_aa)
		{
		if ('downloads' in data_aa.item)
			{
		unit_aa['downloads'] = data_aa.item.downloads;
			}
		}
*/

	data_shorten[key] = unit_aa;

	return	data_shorten;
}

// ---------------------------------------------------------------
