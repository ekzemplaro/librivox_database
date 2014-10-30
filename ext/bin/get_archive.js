#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	get_archive.js
//
//					Oct/30/2014
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
	var commands=filter_archive_proc (data_aa);

	var str_out = "";

	for (var it=0;  it < commands.length; it++)
		{
		str_out += commands[it] + '\n';
		}

	fs.writeFile (file_out,str_out);
	}

// console.log ("*** 終了 ***");
// ---------------------------------------------------------------
function filter_archive_proc (data_aa)
{
	var urls = new Array ();

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
			var url = filter_archive_exec_proc (key,data_unit);
			urls.push (url);
					}
				}
			}
		}

	return	urls
}

// ---------------------------------------------------------------
function filter_archive_exec_proc (key,data_unit)
{
	var url = '';

	var uua = data_unit.url_iarchive;

	uua = uua.replace ("www.archive.org","archive.org");
	if (uua != "")
		{
//			console.log (key);
//			console.log (uua);
		url =  uua + '&output=json';
		fetch_exec_proc (url,key)
		}

	return	url;
}

// ---------------------------------------------------------------
function fetch_exec_proc (url,key)
{
	var file_json = key + '.json';

	console.log (file_json);

	var http = require('http');

http.get(url, function(res) {
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
	unit_aa['downloads'] = 0;

	if ('item' in data_aa)
		{
		if ('downloads' in data_aa.item)
			{
		unit_aa['downloads'] = data_aa.item.downloads;
			}
		}

	data_shorten[key] = unit_aa;

	return	data_shorten;
}

// ---------------------------------------------------------------
