#
#	go_fetch.sh
#
#					Dec/08/2014
#
rm -f fetch_ext.log
#
#../bin/fetch_ext.js combined.json fetch_ext.log 1 1000
#../bin/fetch_ext.js combined.json fetch_ext.log 1000 2000
#../bin/fetch_ext.js combined.json fetch_ext.log 2000 3000
#../bin/fetch_ext.js combined.json fetch_ext.log 3000 4000
#../bin/fetch_ext.js combined.json fetch_ext.log 4000 5000
#../bin/fetch_ext.js combined.json fetch_ext.log 5000 6000
#
#../bin/fetch_ext.js combined.json fetch_ext.log 6000 7000
#
#../bin/fetch_ext.js combined.json fetch_ext.log 7000 8000
#../bin/fetch_ext.js combined.json fetch_ext.log 8000 9000
cd ../data
#
#../bin/fetch_ext.js fetch_ext.log 421 421
#../bin/fetch_ext.js fetch_ext.log 5073 5073
#../bin/fetch_ext.js fetch_ext.log 7747 7747
#../bin/fetch_ext.js fetch_ext.log 9274 9274
#../bin/fetch_ext.js fetch_ext.log 9280 9320
../bin/fetch_ext.js fetch_ext.log 9310 9320
#
#
#
mv ft*.json ../filter_ext
#
#mv id*.json ../get_archive
mv ../get_archive/is*.json ../filter_archive
#
../bin/post_process.sh
#
#
