#! /bin/bash
#
#	update_ext/go_fetch.sh
#
#					Jan/24/2015
#
# ------------------------------------------------------------
#
MIN=9300
MAX=9420
cd ../data
rm -f fetch_ext.log
#
../bin/fetch_ext.js fetch_ext.log $MIN $MAX
#
#
#
#if [ -e ft*.json ]
#then
	mv ft*.json ../filter_ext
#fi
#
#if [ -e ../get_archive/is*.json ]
#then
	mv ../get_archive/is*.json ../filter_archive
#fi
#
../bin/post_process.sh
#
#
# ------------------------------------------------------------
