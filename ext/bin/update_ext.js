#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	ext/bin/update_ext.js
//
//					Dec/26/2016
//
// ---------------------------------------------------------------
var fs = require("fs")
var fetch_ex_single = require ("./fetch_ex_single")
// ---------------------------------------------------------------
// console.log ("*** 開始 ***")

const file_json_in=process.argv[2]
const file_log=process.argv[3]

console.log (file_json_in)
console.log (file_log)

const json_str = fs.readFileSync (file_json_in)

if (1 < json_str.length)
	{
	const data_aa = JSON.parse (json_str)
	var keys_number=filter_publicdate_proc (data_aa)

	var str_out = ""

	const ll_keys = keys_number.length

	keys_number.sort(function(a, b) {
		return (parseInt(a) > parseInt(b)) ? 1 : -1
	}) 
 
	const key_max = keys_number[ll_keys - 1]
	console.log ("key_max = " + key_max)

	for (var it=1;  it < 10; it++)
		{
		keys_number.push (key_max + it)
		}

	console.log ("keys_number.length = " + keys_number.length)
	keys_number = absent_number_check_proc (key_max,data_aa,keys_number)
	console.log ("keys_number.length = " + keys_number.length)

	for (var it=0;  it < keys_number.length; it++)
		{
		const key_number=keys_number[it]

		fetch_ex_single.fetch_ex_single_proc (key_number)

		str_out += key_number + '\n'
		}

	fs.writeFile (file_log,str_out,function (err)
		{
		if (err) {
			console.error ("Error on write: " + err)
			}
		})
	}

// console.log ("*** 終了 ***")
// ---------------------------------------------------------------
function absent_number_check_proc (nn_max,data_aa,keys_number)
{
	console.log ("nn_max = " + nn_max)

	const nn_min = 1

	console.log ("nn_min = " + nn_min)

	for (var nn = nn_min; nn < nn_max; nn += 1)
		{
		const key = "id_" + nn

		if (! (key in data_aa))
			{
//			console.log ("*** lacking *** " + key)
			keys_number.push (nn)
			}
		}

	return	keys_number
}

// ---------------------------------------------------------------
// [4]:
function filter_publicdate_proc (data_aa)
{
	var keys_number = new Array ()

	for (var key in data_aa)
		{
		const data_unit = data_aa[key]
		if (! ('publicdate' in data_unit))
			{
			var key_number = parseInt(key.substr (3))
			keys_number.push (key_number)
			}
		}

	return	keys_number
}

// ---------------------------------------------------------------
