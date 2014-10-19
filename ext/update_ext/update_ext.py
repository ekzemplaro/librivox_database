#! /usr/bin/python
# -*- coding: utf-8 -*-
#
#	update_ext.py
#
#					Oct/11/2014
#
# ------------------------------------------------------------------
import	sys
import	json
import	pycurl
sys.path.append ('/var/www/data_base/common/python_common')
from file_io import file_to_str_proc
from file_io	import file_write_proc
from curl_get import curl_get_proc
# ------------------------------------------------------------------
# [4]:
def fetch_data_proc (array_keys):
	url_head='https://librivox.org/api/feed/audiobooks/?'
	url_tail='&extended=1&format=json'
#
#	it = 0
	for key in array_keys:
		file_json = "ex_" + key[3:]
		url = url_head + "id=" + key[3:] + url_tail
#		if (it == 0):
#		str_json = curl_get_proc (url).decode('utf-8')
		str_json = curl_get_proc (url)
		file_write_proc (file_json,str_json)
#		it += 1
#		print (url)
# ------------------------------------------------------------------
# [2]:
def filter_proc (data_aa):
	array_keys = []
	max_number = 1
	for key in sorted (data_aa.keys()):
		data_unit = data_aa[key]
		if (not 'publicdate' in data_unit):
			number = int (key[3:])
			if (max_number < number):
				max_number = number
			array_keys.append (key)
#
	sys.stderr.write ("max_number = %d\n" % max_number)
#
	for it in range (1,21):
		number = max_number + it
		key = "id_%d" % number
		array_keys.append (key)
#
	return	array_keys
# ------------------------------------------------------------------
sys.stderr.write ("*** 開始 ***\n")

file_json_in = sys.argv[1]
sys.stderr.write (file_json_in + "\n")
#
array_keys = []
json_str = file_to_str_proc (file_json_in)
if (1 < len (json_str)):
	data_aa = json.loads (json_str)
	array_keys = filter_proc (data_aa)
#
fetch_data_proc (array_keys)
#
sys.stderr.write ("*** 終了 ***\n")
# ------------------------------------------------------------------
