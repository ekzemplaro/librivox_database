all:
	cd ext;make
	cd catalog;make
clean:
	cd ext;make clean
	cd catalog;make clean
