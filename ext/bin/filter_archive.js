#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	filter_archive.js
//
//					Dec/26/2016
//
// ---------------------------------------------------------------
var fs = require("fs")
// ---------------------------------------------------------------
// console.log ("*** 開始 ***")
const id=process.argv[2]
const file_json_in=process.argv[3]

const key = 'id_' + id
const file_json_out = 'is_' + id + '.json'
// console.log (file_json_in)
// console.log (file_json_out)

const json_str = fs.readFileSync (file_json_in)

if (1 < json_str.length)
	{
	console.log (key)
	const data_aa = JSON.parse (json_str)
	const data_bb=filter_archive_proc (key,data_aa)

	const json_str_out = JSON.stringify (data_bb)

	fs.writeFile (file_json_out,json_str_out,function (err)
		{
		if (err) {
			console.error ("Error on write: " + err)
			}
		})
	}

// console.log ("*** 終了 ***")
// ---------------------------------------------------------------
function filter_archive_proc (key,data_aa)
{
	var data_bb = new Object ()
	var unit_aa = new Object ()

//	console.log (data_aa.metadata.publicdate)
//	console.log (data_aa.item.downloads)

	unit_aa['publicdate'] = data_aa.metadata.publicdate[0]
	unit_aa['title'] = data_aa.metadata.title[0]

	data_bb[key] = unit_aa

	return	data_bb
}

// ---------------------------------------------------------------
