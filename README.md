						Jul/05/2014
Scripts to create JSON

combined.json used for librivox_statistics

db_catalog.json used for librivox_catalog

	db_catalog.json includes information in combined.json.

How to update JSON.

1)	cd ext/update_ext
	make clean
	./go_all.sh

2)	cd tmp/jul05
	make clean
	edit gox		(Change the max id no)
	./go_all.sh

3)	cd ext/add_archive
	make clean
	./go_all.sh

		combined.json is created in gen_combined

4)	cd catalog
	make clean
	make

		db_catalog.json is created in db_merge

End
