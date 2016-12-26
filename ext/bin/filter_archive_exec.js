#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	ext/bin/fetch_archive_exec.js
//
//					Dec/26/2016
//
// ---------------------------------------------------------------
var fs = require("fs")
var json_different_check = require ("./json_different_check")
// ---------------------------------------------------------------
exports.filter_archive_exec_proc = function (key,data_unit)
{
	var url = ''

	var uua = data_unit.url_iarchive

	uua = uua.replace ("www.archive.org","archive.org")
	uua = uua.replace ("http:","https:")

	if ((uua != "") && (uua.indexOf ("archive.org") != -1))
		{
		url =  uua + '&output=json'
		archive_fetch_exec_proc (url,key)
		}

}

// ---------------------------------------------------------------
function archive_fetch_exec_proc (url,key)
{
	const file_json = '../get_archive/' + key + '.json'

	var https = require('https')

https.get(url, function(res) {
	var body = ''
	res.setEncoding('utf8')
	
	res.on ('data', function (chunk) {
	body += chunk
	})

	res.on('end', function() {

	const hantei = json_different_check.json_different_check_proc
		(body,file_json)

	if (hantei != true)
		{
//		console.log ("*** archive *** different ***")
	fs.writeFile (file_json,body,function (err)
		{
		if (err) {
			console.error ("Error on write: " + err)
			}
		})

	var head_portion = body.substr (0,9)
	if (head_portion !== "<!DOCTYPE")
		{
	const data_aa = JSON.parse (body)
	const data_shorten = filter_arhive_shorten_proc (key,data_aa)
	const file_shorten_json = file_json.replace ("id_","is_")

//	console.log ("file_shorten_json = " + file_shorten_json)

		const json_str_out = JSON.stringify (data_shorten)
		fs.writeFile (file_shorten_json,json_str_out,function (err)
			{
			if (err) {
				console.error ("Error on write: " + err)
				}
			})
		}

		}
	else
		{
//		console.log ("*** archive *** equal ***")
		}
	})

}).on('error', function(ee) {
	console.error(ee)
})
}

// ---------------------------------------------------------------
function filter_arhive_shorten_proc (key,data_aa)
{
	var data_shorten = new Object ()
	var unit_aa = new Object ()

//	console.log (data_aa.metadata.publicdate)
//	console.log (data_aa.item.downloads)

	unit_aa['publicdate'] = data_aa.metadata.publicdate[0]
	unit_aa['downloads'] = 0

	if ('item' in data_aa)
		{
		if ('downloads' in data_aa.item)
			{
		unit_aa['downloads'] = data_aa.item.downloads
			}
		}

	data_shorten[key] = unit_aa

	return	data_shorten
}

// ---------------------------------------------------------------
