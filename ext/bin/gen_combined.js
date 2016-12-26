#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	gen_combined.js
//
//					Dec/26/2016
//
// ---------------------------------------------------------------
var fs = require("fs")
// ---------------------------------------------------------------
// console.log ("*** 開始 ***")
const file_json_librivox=process.argv[2]
const file_json_archive=process.argv[3]
const file_json_wiki=process.argv[4]
const file_json_out=process.argv[5]

console.log (file_json_librivox)
console.log (file_json_archive)
console.log (file_json_wiki)
console.log (file_json_out)

const json_str_librivox = fs.readFileSync (file_json_librivox)
const json_str_archive = fs.readFileSync (file_json_archive)
const json_str_wiki = fs.readFileSync (file_json_wiki)

if ((1 < json_str_librivox.length) && (1 < json_str_archive.length))
	{
	const data_librivox = JSON.parse (json_str_librivox)
	const data_archive = JSON.parse (json_str_archive)
	const data_wiki = JSON.parse (json_str_wiki)

	const data_out=merge_filter_proc (data_librivox,data_archive,data_wiki)

	const json_str_out = JSON.stringify (data_out)

	fs.writeFile (file_json_out,json_str_out,function (err)
		{
		if (err) {
			console.error ("Error on write: " + err)
			}
		})
	}

// console.log ("*** 終了 ***")
// ---------------------------------------------------------------
function merge_filter_proc (data_librivox,data_archive,data_wiki)
{
	var data_out = new Object ()
	var unit_aa = new Object ()

	for (var key in data_librivox)
		{
		data_out[key] = data_librivox[key]

		if (key in data_archive)
			{
			for (var item in data_archive[key])
				{
				data_out[key][item] = data_archive[key][item]
				}
			}

		data_out[key]["status"] = -1

		const key_wiki = "b" + key.slice (3)
		if (key_wiki in data_wiki)
			{
			data_out[key]["status"] = data_wiki[key_wiki].status
			}
		}


	return	data_out
}

// ---------------------------------------------------------------
