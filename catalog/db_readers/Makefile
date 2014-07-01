all:
	ls ../data/ex*.json > list.txt
	./gen_readers.js list.txt db_readers.json
clean:
	rm -f *.json list.txt
