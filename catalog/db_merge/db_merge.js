#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	db_merge.js
//
//					Mar/22/2014
//
// ---------------------------------------------------------------
var fs = require("fs");

// ---------------------------------------------------------------
function file_parse_proc (fname_in)
{
	var json_str = fs.readFileSync (fname_in,'utf8');
	var db_out = JSON.parse (json_str);

	return	db_out;
}

// ---------------------------------------------------------------
console.log ("*** 開始 ***");
//
var json_books=process.argv[2];
var json_authors=process.argv[3];
var json_readers=process.argv[4];
var json_genres=process.argv[5];
var json_languages=process.argv[6];
var json_out=process.argv[7];

console.log (json_books);
console.log (json_authors);
console.log (json_readers);
console.log (json_genres);
console.log (json_languages);
console.log (json_out);

var db_books = file_parse_proc (json_books);
var db_authors = file_parse_proc (json_authors);
var db_readers = file_parse_proc (json_readers);
var db_genres = file_parse_proc (json_genres);
var db_languages = file_parse_proc (json_languages);

var db_out = new Object ();
db_out['books']=db_books;
db_out['authors']=db_authors;
db_out['readers']=db_readers;
db_out['genres']=db_genres;
db_out['languages']=db_languages;

var json_str_out = JSON.stringify (db_out);

fs.writeFile (json_out,json_str_out);

console.log ("*** 終了 ***");
// ---------------------------------------------------------------
