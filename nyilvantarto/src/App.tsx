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

enum Pages {
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
}

class App extends React.Component<AppProps, AppStates> {

constructor(props: AppProps) {
  super(props)
  const publisherMock: Publisher = {
    name: 'testPublisher',
    address: 'testAddress',
    foundationYear: 2000
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
      {name: 'test', address: '3580 Tiszaújváros Izabella út 8.' , foundationYear: 1960},
      {name: 'test2', address: '3580 Tiszaújváros Izabella út 8.' , foundationYear: 1985},
      {name: 'test3', address: '3580 Tiszaújváros Izabella út 8.' , foundationYear: 1975}
    ]
  }

  
}

setPage = (page: Pages) => {
  this.setState({
    page: page
  })
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
          />
          }
        { this.state.page === 'authors' && 
          <Authors
            authors={this.state.authorsMock}
          />
        }
        { this.state.page === 'publishers' &&
          <Publishers
            publishers={this.state.publishersMock}
          />
        }
      </div>
    );
  }
}

export default App;
