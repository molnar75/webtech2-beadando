import React from 'react';
import * as BS from 'react-bootstrap';
import { Book } from '../models/book';

export interface BooksProps{
  books: Book[];
}

export interface BooksStates{}

class Books extends React.Component<BooksProps, BooksStates> {
  render() {
    return (
      <div className={'backgorundStyle'}>
        <div>
          <br />
          <h1 style={{textAlign: 'center'}}>Books</h1>
          <div className={'tableStyle'}>
            <br />
            <BS.Table striped bordered hover style={{ margin: 'auto', backgroundColor: 'white'}}>
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
                    <td>{book.author.penName}</td>
                    <td>{book.pageNumber}</td>
                    <td>{book.publicationYear}</td>
                    <td>{book.publisher.name}</td>
                  </tr>
                )}
              </tbody>
            </BS.Table>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Books;
