#! /bin/bash
#
#	update_ext/go_all.sh
#
#				Dec/27/2015
#
# --------------------------------------------------------------
#
cd ../data
#
../bin/update_ext.js combined.json update.log
#
#
mv ft*.json ../filter_ext
#
mv ../get_archive/is*.json ../filter_archive
#
../bin/post_process.sh
#
# --------------------------------------------------------------
