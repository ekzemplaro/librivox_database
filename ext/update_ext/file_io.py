# -*- coding: utf-8 -*-
#
#	file_io.py
#
#					Sep/01/2014
#
#
import	sys
import	string
#
# --------------------------------------------------------------------
def	file_to_str_proc (file_in):
	lines = []
	try:
		fp_in = open (file_in)
		lines = fp_in.readlines ()
		fp_in.close ()
	except Exception as ee:
		sys.stderr.write ("*** error *** file_to_str_proc ***\n")
		sys.stderr.write (str (ee))
#
	str_out = ""
	for line in lines:
		str_out += line
#
#
	return	str_out
# --------------------------------------------------------------------
def file_write_proc (file_name,str_out):
#
	fp_out = open (file_name,mode='w',encoding='utf-8')
	fp_out.write (str_out)
	fp_out.close ()
#
# --------------------------------------------------------------------
