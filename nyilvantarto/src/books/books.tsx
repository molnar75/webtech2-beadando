import React from 'react';
import * as BS from 'react-bootstrap';
import { Book } from '../models/book';
import { Pages } from '../App'
import Popup from '../modal/popup';

export interface BooksProps{
  books: Book[];
  showModal: ((type: Pages)=> void)
}

export interface BooksStates{
  showPopup: boolean
}

class Books extends React.Component<BooksProps, BooksStates> {
  constructor(props: BooksProps){
    super(props)

    this.state = {
      showPopup: false
    }
}

onDelete(book: Book) {
  this.setState({
    showPopup: true
  });
}

onPopupClose(result: boolean) {
  this.setState({
    showPopup: false
  });
  if (result) {
    console.log('delete')
  }
}

  render() {
    return (
      <>
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
                    <td align="center" style={{width: '10%'}}>
                      <BS.Button onClick={() => this.onDelete(book)} variant="danger">Delete</BS.Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </BS.Table>
            <br />
          <BS.Button variant='secondary' size='lg' className={'adNewButton'} onClick={() => this.props.showModal(Pages.BOOKS)}>
            Add new
          </BS.Button>
          </div>
        </div>
      </div>
      { this.state.showPopup &&
        <Popup
          message="Are you sure you want to delete this?"
          onClose= {(result: boolean) => this.onPopupClose(result)}
        ></Popup>
      }
      </>
    );
  }
}

export default Books;
