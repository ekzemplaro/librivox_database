all:
	ls ../data/ex*.json > list.txt
	./gen_authors.js list.txt db_authors.json
clean:
	rm -f *.json list.txt
