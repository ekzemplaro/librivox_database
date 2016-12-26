#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	merge_json.js
//
//					Dec/26/2016
//
// ---------------------------------------------------------------
var fs = require("fs")
// ---------------------------------------------------------------
// console.log ("*** 開始 ***")

const file_list=process.argv[2]
const file_json_merged=process.argv[3]

console.log (file_list)
console.log (file_json_merged)

var data_merged = new Object ()

const data = fs.readFileSync (file_list)
const lines_in = ("" + data).split ("\n")
for (var it=0; it< lines_in.length; it++)
	{
//	console.log (lines_in[it])
	var file_json_in = lines_in[it]
	if (3 < file_json_in.length)
		{
	var json_str_in = fs.readFileSync (file_json_in)
	if (1 < json_str_in.length)
		{
	if (json_str_in.toString().substr (0,3) != 'und')
		{
		try
			{
		const data_in = JSON.parse (json_str_in)
		data_merged=merge_proc (data_merged,data_in)
			}
		catch (e)
			{
			console.log ("*** error ***" + lines_in[it])
			}
		}
		}
		}
	}

	const json_str_out = JSON.stringify (data_merged)

	fs.writeFile (file_json_merged,json_str_out,function (err)
		{
		if (err) {
			console.error ("Error on write: " + err)
			}
		})
console.log ("*** 終了 ***")
// ---------------------------------------------------------------
function merge_proc (data_merged,data_in)
{
//	console.log (data_aa.books)
	for (var key in data_in)
		{
		const value = data_in[key]

		data_merged[key] = value
		}

	return	data_merged
}

// ---------------------------------------------------------------
