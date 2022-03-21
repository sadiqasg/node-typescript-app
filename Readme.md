# Project Title

## Books API

### Description

A Books API with CRUD functionality

### Built with

* NodeJS
* ExpressJS
* Typescript
* PostgreSQL
* Eslint
* Prettier

## Getting Started
### Installing and Executing program

```
* fork and clone the repo
* checkout to book-API branch
* run npm install to install dependencies
* run npm start to start the project
```

## Endpoints
| Method   | URL           | Description                              | 
| -------- | --------------| ---------------------------------------- | 
| `GET`    | `/books`      | Retrieve all books |
| `POST`   | `/books`      | Create a new book. Takes in {title, author, total_pages, type, and summary} | 
| `GET`    | `/book/:id`   | Retrieve a book with a passed id |
| `PUT`  | `/book/:id`     | Update a book data with the passed id |
| `DELETE` | `/book/:id`   | Delete a book with a passed id |

## Authors
Abubakar Sadiq [@arafat_sambo](https://twitter.com/arafat_sambo)

## Version History

* 1.0
    * Initial Release


<!-- ## Acknowledgments -->
<!-- * [awesome-readme](https://github.com/matiassingers/awesome-readme) -->
