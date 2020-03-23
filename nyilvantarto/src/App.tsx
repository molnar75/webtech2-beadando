import React from 'react';
import './App.css';
import LoginPage from './login/login.page';
import Books from './books/books';
import { Book } from './models/book';
import { Publisher } from './models/publisher';
import { Author } from './models/author';
import Header from './header/header';
import Authors from './authors/authors';
import Publishers from './publishers/publishers';
import Modal from './modal/modal';

export enum Pages {
  LOGIN = 'login',
  BOOKS = 'books',
  AUTHORS = 'authors',
  PUBLISHERS = 'publishers'
}

export interface AppProps {}

export interface AppStates {
  page: Pages;
  booksMock: Book[];
  authorsMock: Author[];
  publishersMock: Publisher[];
  showModal: boolean;
  modalType: Pages;
}

class App extends React.Component<AppProps, AppStates> {

constructor(props: AppProps) {
  super(props)
  const publisherMock: Publisher = {
    name: 'testPublisher',
    address: 'testAddress',
    fundationYear: 2000
  }
  const authorMock: Author = {
    penName: 'TestAuthor',
    realName: 'TestAuthorReal',
    birthYear: 1968
  }

  this.state = {
    page: Pages.BOOKS,
    booksMock: [
      {title: 'test', pageNumber: 240, publicationYear: 2010, publisher: publisherMock, author: authorMock},
      {title: 'test2', pageNumber: 300, publicationYear: 2000, publisher: publisherMock, author: authorMock},
      {title: 'test3', pageNumber: 40, publicationYear: 2015, publisher: publisherMock, author: authorMock}
    ],
    authorsMock: [
      {penName: 'penName', realName: 'realName' , birthYear: 1960},
      {penName: 'penName2', realName: 'realName2' , birthYear: 1985},
      {penName: 'penName3', realName: 'realName3' , birthYear: 1975}
    ],
    publishersMock: [
      {name: 'test', address: '3580 Tiszaújváros Izabella út 8.' , fundationYear: 1960},
      {name: 'test2', address: '3580 Tiszaújváros Izabella út 8.' , fundationYear: 1985},
      {name: 'test3', address: '3580 Tiszaújváros Izabella út 8.' , fundationYear: 1975}
    ],
    showModal: false,
    modalType: Pages.AUTHORS
  }
}

setPage = (page: Pages) => {
  this.setState({
    page: page
  })
}

showModal(type: Pages) {
  this.setState({
    showModal: true,
    modalType: type
  })
}

onModalClose() {
  this.setState({
    showModal: false
  })
}

onSave(type: Pages, object: Author | Book | Publisher) {
  this.setState({
    showModal: false
  })
  switch(type) {
    case Pages.AUTHORS:
      this.state.authorsMock.push(object as Author);
      break;
    case Pages.BOOKS:
      this.state.booksMock.push(object as Book);
      break;
    case Pages.PUBLISHERS:
      this.state.publishersMock.push(object as Publisher)
      break;
  } 
}

onDelete(type: Pages, object: Author | Book | Publisher) {
  if (type === Pages.AUTHORS) {
    let author = object as Author;
    for (let i = 0; i < this.state.authorsMock.length; i++) {
      if (author.penName === this.state.authorsMock[i].penName) {
        this.state.authorsMock.splice(i, 1)
      }
    }
  }
  if (type === Pages.BOOKS) {
    let book = object as Book;
    for (let i = 0; i < this.state.booksMock.length; i++) {
      if (book.title === this.state.booksMock[i].title) {
        this.state.booksMock.splice(i, 1)
      }
    }
  }
  if (type === Pages.PUBLISHERS) {
    let publisher = object as Publisher;
    for (let i = 0; i < this.state.publishersMock.length; i++) {
      if (publisher.name === this.state.publishersMock[i].name) {
        this.state.publishersMock.splice(i, 1)
      }
    }
  }
}

  render() {
    return (
      <div>
        {
          this.state.page !== 'login' &&
            <Header 
              onPageChange={this.setPage}
            />
        }
        { 
          this.state.page === 'login' && 
          <LoginPage 
            onPageChange={this.setPage}
          /> 
          }
        { 
          this.state.page === 'books' && 
          <Books 
            books={this.state.booksMock}
            showModal={(type: Pages) => this.showModal(type)}
            onDelete={(type: Pages, object: Author | Book | Publisher) => this.onDelete(type, object)}
          />
          }
        { this.state.page === 'authors' && 
          <Authors
            authors={this.state.authorsMock}
            showModal={(type: Pages) => this.showModal(type)}
            onDelete={(type: Pages, object: Author | Book | Publisher) => this.onDelete(type, object)}
          />
        }
        { this.state.page === 'publishers' &&
          <Publishers
            publishers={this.state.publishersMock}
            showModal={(type: Pages) => this.showModal(type)}
            onDelete={(type: Pages, object: Author | Book | Publisher) => this.onDelete(type, object)}
          />
        }
        { this.state.showModal &&
          <Modal
            onModalClose={() => this.onModalClose()}
            onSave={(type: Pages, object: Author | Book | Publisher) => this.onSave(type, object)}
            type={this.state.modalType}
            authors={this.state.authorsMock}
            publishers={this.state.publishersMock}
          ></Modal>
        }
      </div>
    );
  }
}

export default App;
