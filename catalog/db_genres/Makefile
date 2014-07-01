all:
	ls ../data/ex*.json > list.txt
	./gen_genres.js list.txt db_genres.json
clean:
	rm -f *.json list.txt
