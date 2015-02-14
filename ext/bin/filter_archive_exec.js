#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	ext/bin/fetch_archive_exec.js
//
//					Jan/31/2015
//
// ---------------------------------------------------------------
var fs = require("fs");
var json_different_check = require ("./json_different_check");
// ---------------------------------------------------------------
exports.filter_archive_exec_proc = function (key,data_unit)
{
	var url = '';

	var uua = data_unit.url_iarchive;

	uua = uua.replace ("www.archive.org","archive.org");
	uua = uua.replace ("http:","https:");

	if ((uua != "") && (uua.indexOf ("archive.org") != -1))
		{
		url =  uua + '&output=json';
		archive_fetch_exec_proc (url,key)
		}

}

// ---------------------------------------------------------------
function archive_fetch_exec_proc (url,key)
{
//	var file_json = key + '.json';
	var file_json = '../get_archive/' + key + '.json';

//	console.log (url);
//	console.log (file_json);

	var https = require('https');

https.get(url, function(res) {
	var body = '';
	res.setEncoding('utf8');
	
	res.on ('data', function (chunk) {
	body += chunk;
	});

	res.on('end', function() {

	var hantei = json_different_check.json_different_check_proc
		(body,file_json);

	if (hantei != true)
		{
//		console.log ("*** archive *** different ***");
	fs.writeFile (file_json,body);

	var head_portion = body.substr (0,9);
	if (head_portion !== "<!DOCTYPE")
		{
	var data_aa = JSON.parse (body);
	var data_shorten = filter_arhive_shorten_proc (key,data_aa);
	var file_shorten_json = file_json.replace ("id_","is_");

//	console.log ("file_shorten_json = " + file_shorten_json);

		var json_str_out = JSON.stringify (data_shorten);
		fs.writeFile (file_shorten_json,json_str_out);
		}

		}
	else
		{
//		console.log ("*** archive *** equal ***");
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
