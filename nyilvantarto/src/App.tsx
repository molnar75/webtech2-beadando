import React from 'react';
import './App.css';
import LoginPage from './components/login/login.page';
import Books from './components/books/books';
import { Book } from './components/models/book';
import { Publisher } from './components/models/publisher';
import { Author } from './components/models/author';
import { User } from './components/models/user';
import Header from './components/header/header';
import Authors from './components/authors/authors';
import Publishers from './components/publishers/publishers';
import Modal from './components/modal/modal';
import axios from 'axios';

export enum Pages {
  LOGIN = 'login',
  BOOKS = 'books',
  AUTHORS = 'authors',
  PUBLISHERS = 'publishers'
}

export interface AppProps {}

export interface AppStates {
  page: Pages;
  books: Book[];
  authors: Author[];
  publishers: Publisher[];
  users: User[];
  showModal: boolean;
  modalType: Pages;
}

class App extends React.Component<AppProps, AppStates> {

constructor(props: AppProps) {
  super(props)

  this.state = {
    page: Pages.LOGIN,
    books: [],
    authors: [],
    publishers: [],
    users: [],
    showModal: false,
    modalType: Pages.AUTHORS
  }
}

componentDidMount() {
  this.getDatas();
}

getDatas = () => {
  axios.get("http://localhost:9000/getAllUsers")
    .then(res => {
       this.setState({
         users: res.data
       })
    })

  axios.get("http://localhost:9000/authors/getAllAuthors")
  .then(res => {
      this.setState({
        authors: res.data
      })
  })

  axios.get("http://localhost:9000/publishers/getAllPublishers")
  .then(res => {
      this.setState({
        publishers: res.data
      })
  })

  axios.get("http://localhost:9000/books/getAllBooks")
  .then(res => {
      this.getAuhtorsAndPublishers(res.data);
  })
}

getAuhtorsAndPublishers = (req: any) => {
  const books: Book[] = req;
  for (let i = 0; i < req.length; i++) {
    for (const publisher of this.state.publishers) {
      if (req[i].publisher_name === publisher.name) {
          books[i].publisher = publisher;
      }
    }
    for (const author of this.state.authors) {
      if (req[i].author_name === author.penName) {
          books[i].author = author;
      }
    }
  }
  this.setState({
    books: books
  })
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
      const author = object as Author;
      axios.post("http://localhost:9000/authors/createAuthor", author)
      .then(res => {
        if (res.data.error !== true) {
          this.getDatas();
        } else {
          if (res.data.error === true) {
            alert('An author with this name is already exists!')
          }
        }
      })
      break;
    case Pages.BOOKS:
      const book = object as Book;
      axios.post("http://localhost:9000/books/createBook", book)
      .then(res => {
        if (res.data.error !== true) {
          this.getDatas();
        } else {
          if (res.data.error === true) {
            alert('A book with this title is already exists!')
          }
        }
      })
      break;
    case Pages.PUBLISHERS:
      const publisher = object as Publisher
      axios.post("http://localhost:9000/publishers/createPublisher", publisher)
      .then(res => {
        if (res.data.error !== true) {
          this.getDatas();
        } else {
          if (res.data.error === true) {
            alert('A publisher with this name is already exists!')
          }
        }
      })
      break;
  } 
}

onDelete(type: Pages, object: Author | Book | Publisher) {
  if (type === Pages.AUTHORS) {
    let author = object as Author;
    axios.delete("http://localhost:9000/authors/deleteAuthorByPenName/" + author.penName)
      .then(res => {
        if(res.data.ok === 1){
          this.getDatas();
        }
      })
  }
  if (type === Pages.BOOKS) {
    let book = object as Book;
    axios.delete("http://localhost:9000/books/deleteBookByTitle/" + book.title)
      .then(res => {
        if(res.data.ok === 1){
          this.getDatas();
        }
      })
  }
  if (type === Pages.PUBLISHERS) {
    let publisher = object as Publisher;
    axios.delete("http://localhost:9000/publishers/deletePublisherByName/" + publisher.name)
      .then(res => {
        if(res.data.ok === 1){
          this.getDatas();
        }
      })
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
            users={this.state.users}
          /> 
          }
        { 
          this.state.page === 'books' && 
          <Books 
            books={this.state.books}
            showModal={(type: Pages) => this.showModal(type)}
            onDelete={(type: Pages, object: Author | Book | Publisher) => this.onDelete(type, object)}
          />
          }
        { this.state.page === 'authors' && 
          <Authors
            authors={this.state.authors}
            showModal={(type: Pages) => this.showModal(type)}
            onDelete={(type: Pages, object: Author | Book | Publisher) => this.onDelete(type, object)}
          />
        }
        { this.state.page === 'publishers' &&
          <Publishers
            publishers={this.state.publishers}
            showModal={(type: Pages) => this.showModal(type)}
            onDelete={(type: Pages, object: Author | Book | Publisher) => this.onDelete(type, object)}
          />
        }
        { this.state.showModal &&
          <Modal
            onModalClose={() => this.onModalClose()}
            onSave={(type: Pages, object: Author | Book | Publisher) => this.onSave(type, object)}
            type={this.state.modalType}
            authors={this.state.authors}
            publishers={this.state.publishers}
          ></Modal>
        }
      </div>
    );
  }
}

export default App;
