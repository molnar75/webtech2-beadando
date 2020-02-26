import React from 'react';
import * as BS from 'react-bootstrap';
import Header from '../header/header';
import './books.css';
import { Book } from '../models/book';

export interface BooksProps{
  books: Book[];
}

export interface BooksStates{}

class Books extends React.Component<BooksProps, BooksStates> {
  render() {
    return (
      <div>
        <div>
          <BS.Table striped bordered hover style={{width: '60%', margin: 'auto'}}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Number of pages</th>
                <th>Year of publication</th>
                <th>Publisher</th>
              </tr>
            </thead>
            <tbody>
              {this.props.books.map((book) => 
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.pageNumber}</td>
                  <td>{book.publicationYear}</td>
                  <td>{book.publisher.name}</td>
                </tr>
              )}
            </tbody>
          </BS.Table>
        </div>
      </div>
    );
  }
}

export default Books;
