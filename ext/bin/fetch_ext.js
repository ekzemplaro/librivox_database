#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	ext/bin/fetch_ext.js
//
//					Dec/26/2016
//
// ---------------------------------------------------------------
var fs = require("fs")
var fetch_ex_single = require ("./fetch_ex_single")
// ---------------------------------------------------------------
// console.log ("*** 開始 ***")

const file_log=process.argv[2]
const key_min = process.argv[3]
const key_max = process.argv[4] 

console.log (file_log)

var keys_number = new Array ()

var str_out = ""
 

console.log ("key_min = " + key_min)
console.log ("key_max = " + key_max)

for (var it=key_min; it <= key_max; it++)
	{
	keys_number.push (it)
	}


for (var it=0; it < keys_number.length; it++)
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

// console.log ("*** 終了 ***")
// ---------------------------------------------------------------
