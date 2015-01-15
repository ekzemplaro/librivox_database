#
cd ../data
#
../bin/update_ext.js combined.json update.log
#
#
#
mv ft*.json ../filter_ext
#
#mv id*.json ../get_archive
#mv is*.json ../filter_archive
#
../bin/post_process.sh
#
