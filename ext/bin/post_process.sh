#! /bin/bash
#
#	post_process.sh
#
#						Feb/14/2015
#
EXT="/home/uchida/librivox/api/new_api/ext"
BIN=$EXT"/bin"
FILTER_EXT=$EXT"/filter_ext"
MERGE_FT=$EXT"/merge_ft"
FILTER_ARCHIVE=$EXT"/filter_archive"
GEN_COMBINED=$EXT"/gen_combined"
#
ls $FILTER_EXT/ft_*.json > $MERGE_FT"/list.txt"
$BIN/merge_json.js $MERGE_FT"/list.txt" $MERGE_FT"/merged_librivox.json"
#
ls $FILTER_ARCHIVE/is_*.json > $FILTER_ARCHIVE"/list.txt"
$BIN/merge_json.js $FILTER_ARCHIVE"/list.txt" \
	$FILTER_ARCHIVE"/merged_archive.json"
#
#
$BIN/gen_combined.js $GEN_COMBINED/merged_librivox.json \
	$GEN_COMBINED/merged_archive.json \
	$GEN_COMBINED/wiki.json \
	$GEN_COMBINED/combined.json
#
#
