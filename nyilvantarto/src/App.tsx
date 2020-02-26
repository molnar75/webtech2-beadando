import React from 'react';
import './App.css';
import LoginPage from './login/login.page';
import Books from './main/books';
import { Book } from './models/book';
import { Publisher } from './models/publisher';
import { Author } from './models/author';
import Header from './header/header';

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
    name: 'TestAuthor',
    birthYear: 1968
  }

  this.state = {
    page: Pages.BOOKS,
    booksMock: [
      {title: 'test', pageNumber: 240, publicationYear: 2010, publisher: publisherMock, author: authorMock},
      {title: 'test2', pageNumber: 300, publicationYear: 2000, publisher: publisherMock, author: authorMock},
      {title: 'test3', pageNumber: 40, publicationYear: 2015, publisher: publisherMock, author: authorMock}
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
        { this.state.page === 'authors' && <h1>AUTHORS</h1>}
        { this.state.page === 'publishers' && <h1>PUBLISHERS</h1>}
      </div>
    );
  }
}

export default App;
