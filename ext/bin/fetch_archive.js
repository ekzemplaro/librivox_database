#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	ext/bin/fetch_archive.js
//
//					Nov/25/2014
//
// ---------------------------------------------------------------
var fs = require("fs");

var filter_archive_exec=require ("./filter_archive_exec");
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
				var nn_key = parseInt (key.substring (3));

//				if (! ('publicdate' in data_unit))
				if ((8300 <= nn_key) && (nn_key<=8302))
					{
					console.log (key);
					filter_archive_exec.filter_archive_exec_proc (key,data_unit);
					}
				}
			}
		}
}

// ---------------------------------------------------------------
