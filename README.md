						Mar/02/2016
Scripts to create JSON

combined.json is used for librivox_statistics

				http://ekzemplaro.org/librivox/statistics/

db_catalog.json is used for librivox_catalog

				http://ekzemplaro.org/librivox/catalog/

	db_catalog.json includes information in combined.json.

How to update JSON.


1)	make clean
	make

		combined.json is created in ext/gen_combined
		db_catalog.json is created in catalog/db_merge


The meaning of the column wiki

	-1 ---> Not checked yet
	0 ---> Checked. No link to & from Wikipedia
	1 --> Checked. Exists link to Wikipedia
	2 --> Checked. Exists link from Wikipedia
	3 --> Checked. Exist links to & from Wikipedia

LibriVox API is uded
Example:
	curl -k https://librivox.org/api/feed/audiobooks/?id=1000&extended=1&format=json

Arhive.org API is used
Example:

	curl 'http://archive.org/details/loss_titanic_ah_librivox&output=json'

End

-----------------------------------------------------------------------

The MIT License (MIT)

Copyright (c) [2014] [ekzemplaro]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

-----------------------------------------------------------------------

