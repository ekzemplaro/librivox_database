						Oct/19/2014
Scripts to create JSON

combined.json used for librivox_statistics

db_catalog.json used for librivox_catalog

	db_catalog.json includes information in combined.json.

How to update JSON.


1)	cd ext
	make

		combined.json is created in gen_combined

2)	cd catalog
	make clean
	make

		db_catalog.json is created in db_merge

End
