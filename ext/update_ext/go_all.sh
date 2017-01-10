#! /bin/bash
#
#	update_ext/go_all.sh
#
#				Jan/10/2017
#
# --------------------------------------------------------------
#
cd ../data
#
../bin/update_ext.js combined.json update.log
#
#
if ls ft*.json > /dev/null 2>&1
then
	mv ft*.json ../filter_ext
fi
#
if ls ../get_archive/is*.json > /dev/null 2>&1
then
	mv ../get_archive/is*.json ../filter_archive
fi
#
../bin/post_process.sh
#
# --------------------------------------------------------------
