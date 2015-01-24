#! /bin/bash
#
#	update_ext/go_all.sh
#
#				Jan/24/2015
#
# --------------------------------------------------------------
#
cd ../data
#
../bin/update_ext.js combined.json update.log
#
#
#
#mv ft*.json ../filter_ext
#
#mv id*.json ../get_archive
#mv is*.json ../filter_archive
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
# --------------------------------------------------------------
