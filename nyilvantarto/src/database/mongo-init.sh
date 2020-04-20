#!/bin/bash

mongoimport --host localhost --db webtech_2 --collection users --file json/users.json --jsonArray
mongoimport --host localhost --db webtech_2 --collection authors --file json/authors.json --jsonArray
mongoimport --host localhost --db webtech_2 --collection books --file json/books.json --jsonArray
mongoimport --host localhost --db webtech_2 --collection publishers --file json/publishers.json --jsonArray