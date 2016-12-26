#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	db_merge.js
//
//					Dec/26/2016
//
// ---------------------------------------------------------------
var fs = require("fs")

// ---------------------------------------------------------------
function file_parse_proc (fname_in)
{
	const json_str = fs.readFileSync (fname_in,'utf8')
	const db_out = JSON.parse (json_str)

	return	db_out
}

// ---------------------------------------------------------------
console.log ("*** 開始 ***")
//
const json_books=process.argv[2]
const json_authors=process.argv[3]
const json_readers=process.argv[4]
const json_genres=process.argv[5]
const json_languages=process.argv[6]
const json_out=process.argv[7]

console.log (json_books)
console.log (json_authors)
console.log (json_readers)
console.log (json_genres)
console.log (json_languages)
console.log (json_out)

/*
var db_books = file_parse_proc (json_books)
var db_authors = file_parse_proc (json_authors)
var db_readers = file_parse_proc (json_readers)
var db_genres = file_parse_proc (json_genres)
var db_languages = file_parse_proc (json_languages)
*/

var db_out = new Object ()
db_out['books']= file_parse_proc (json_books)
db_out['authors']= file_parse_proc (json_authors)
db_out['readers']= file_parse_proc (json_readers)
db_out['genres']= file_parse_proc (json_genres)
db_out['languages']= file_parse_proc (json_languages)

const json_str_out = JSON.stringify (db_out)

fs.writeFile (json_out,json_str_out,function (err)
	{
	f (err) {
		console.error ("Error on write: " + err)
		}
	})

console.log ("*** 終了 ***")
// ---------------------------------------------------------------
