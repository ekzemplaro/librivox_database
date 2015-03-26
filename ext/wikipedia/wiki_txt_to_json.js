#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	wiki_txt_to_json.js
//
//					Mar/26/2015
//
// ---------------------------------------------------------------
var fs = require("fs");

// ---------------------------------------------------------------
function convert_proc (file_in)
{
	var data_aa = new Object ();

	var data = fs.readFileSync (file_in,'utf8');

	var lines_in = ("" + data).split ("\n");

	for (var it in lines_in)
		{
		var line = lines_in[it]; 
		if (line.substring (0,1) != "#")
			{
			if (2 < line.length)
				{
				var rr = line.split ("\t");

				data_aa[rr[0]] = {"status": rr[1]};
				}
			}
		}

	return	data_aa;
}

// ---------------------------------------------------------------
console.log ("*** 開始 ***");
//
var file_in=process.argv[2];
var file_json=process.argv[3];

console.log (file_in);
console.log (file_json);

if (fs.existsSync(file_in))
	{
	var data_aa = convert_proc (file_in);
	var json_str = JSON.stringify (data_aa);
	console.log (json_str);

	fs.writeFile (file_json,json_str,function (err)
	{
	if (err) {
		console.log ("Error on write: " + err)
		}
	else {
		fs.chmodSync (file_json,0666);
		console.log ("File written.");
		console.log ("*** 終了 ***");
		}
	});
	}
else
	{
	console.log ("*** error *** " + file_in + " doesn't exist. ***");
	}
// ---------------------------------------------------------------

