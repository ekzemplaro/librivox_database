// ---------------------------------------------------------------
//	ext/bin/json_different_check.js
//
//					Jan/14/2015
//
// ---------------------------------------------------------------
var fs = require("fs");

// ---------------------------------------------------------------
exports.json_different_check_proc = function (str_json,file_name)
{
	rvalue = true;

//	console.log ("file_name = " + file_name);

	if (fs.existsSync (file_name))
	{

	var str_json_old = fs.readFileSync (file_name);

//	console.log ("str_json.length = " + str_json.length);
//	console.log ("str_json_old.length = " + str_json_old.length);
 

	if (str_json != str_json_old)
		{
//		console.log (" *** different *** " + file_name);
		rvalue = false;
		}
	else
		{
//		console.log (" *** equal *** ");
		}
	}
	else
		{
		rvalue = false;
		}

	return	rvalue;
}

// ---------------------------------------------------------------
