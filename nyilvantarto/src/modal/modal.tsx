import React from 'react';
import * as BS from 'react-bootstrap';
import { Pages } from '../App'
import { Author } from '../models/author';
import { Publisher } from '../models/publisher';
import { Book } from '../models/book';
import Popup from './popup';
import { Error } from '../models/error';

export interface ModalProps{
  onModalClose: () => void;
  type: Pages;
  authors: Author[];
  publishers: Publisher[];
}

export interface ModalStates{
    showModal: boolean
    type: string
    newAuthor: Author;
    newPublisher: Publisher;
    newBook: Book;
    showPopup: boolean;
    isTouched: Error;
}

class Modal extends React.Component<ModalProps, ModalStates> {
    constructor(props: ModalProps){
        super(props)

        const newAuthor: Author = {
          penName: '',
          realName: '',
          birthYear: 0
        };
        const newPublisher: Publisher = {
          name: '',
          address: '',
          fundationYear: 0
        };
        this.state = {
            showModal: true,
            type: this.props.type.slice(0, this.props.type.length-1),
            newAuthor: newAuthor,
            newPublisher: newPublisher,
            newBook: {
              title: '',
              pageNumber: 0,
              publicationYear: 0,
              publisher: newPublisher,
              author: newAuthor
            },
            showPopup: false,
            isTouched: {
              author : {
                penName: false,
                realName: false,
                birthYear: false
              },
              publisher: {
                  name: false,
                  address: false,
                  fundationYear: false
              },
              book: {
                  title: false,
                  pageNumber: false,
                  publicationYear: false,
                  publisher: false,
                  author: false
              }
            }
        }
    }

    onClose() {
        this.setState({
            showModal: false
        });
        this.props.onModalClose();
    }

    onSave() {
      if (this.props.type === Pages.AUTHORS) {
        if (this.validateElement(this.state.newAuthor.penName) &&
            this.validateElement(this.state.newAuthor.realName) &&
            this.validateElement(this.state.newAuthor.birthYear)
            ) {
              this.setState({
                showPopup: true
              });
        } else {
          console.log('error')
        }
      }

      if (this.props.type === Pages.BOOKS) {
        if (this.validateElement(this.state.newBook.pageNumber) &&
            this.validateElement(this.state.newBook.publicationYear) &&
            this.validateElement(this.state.newBook.title) &&
            this.validateElement(this.state.newBook.author.penName) &&
            this.validateElement(this.state.newBook.publisher.name)
            ) {
              this.setState({
                showPopup: true
              });
        } else {
          console.log('error')
        }
      }
      if (this.props.type === Pages.PUBLISHERS) {
        if (this.validateElement(this.state.newPublisher.name) &&
            this.validateElement(this.state.newPublisher.address) && 
            this.validateElement(this.state.newPublisher.fundationYear)
            ) {
              this.setState({
                showPopup: true
              });
        } else {
          console.log('error')
        }
      }
    }

    onPopupClose(result: boolean) {
      this.setState({
        showPopup:false
      })
      if (result) {
        console.log('save')
      } 
    }

    onPenNameChange(penName: string) {
      this.setState((prevState) => {
        let state: ModalStates = { ...prevState };
        state.newAuthor.penName = penName;
        state.isTouched.author.penName = true;

        return state;
      })
    }

    onRealNameChange(realName: string) {
      this.setState((prevState) => {
        let state: ModalStates = { ...prevState };
        state.newAuthor.realName = realName;
        state.isTouched.author.realName = true;

        return state;
      })
    }

    onBirthYearChange(birthYear: string) {
      this.setState((prevState) => {
        let state: ModalStates = { ...prevState };
        state.newAuthor.birthYear = +(birthYear);
        state.isTouched.author.birthYear = true;

        return state;
      })
    }

    onTitleChange(title: string) {
      this.setState((prevState) => {
        let state: ModalStates = { ...prevState };
        state.newBook.title = title;
        state.isTouched.book.title = true;

        return state;
      })
    }

    onAuthorChange(penName: string) {
      let found: boolean = false;
      for (const author of this.props.authors) {
        if (author.penName === penName) {
          found = true;
          this.setState((prevState) => {
            let state: ModalStates = { ...prevState };
            state.newBook.author = author;
            state.isTouched.book.author = true;
    
            return state;
          })
        }
      }
      if (!found) {
        this.setState((prevState) => {
          let state: ModalStates = { ...prevState };
            state.newBook.author.penName = '';
            state.isTouched.book.author = true;
  
          return state;
        })
      }
    }

    onPageNumberChange(pageNumber: string) {
      this.setState((prevState) => {
        let state: ModalStates = { ...prevState };
        state.newBook.pageNumber = +(pageNumber);
        state.isTouched.book.pageNumber = true;

        return state;
      })
  }

    onPublicationChange(publicationYear: string) {
      this.setState((prevState) => {
        let state: ModalStates = { ...prevState };
        state.newBook.publicationYear = +(publicationYear);
        state.isTouched.book.publicationYear = true;

        return state;
      })
    }

    onPublisherChange(name: string) {
      let found: boolean = false;
      for (const publisher of this.props.publishers) {
        if (publisher.name === name) {
          found = true;
          this.setState((prevState) => {
            let state: ModalStates = { ...prevState };
            state.newBook.publisher = publisher;
            state.isTouched.book.publisher = true;
    
            return state;
          })
        }
      }
      if (!found) {
        this.setState((prevState) => {
          let state: ModalStates = { ...prevState };
          state.newBook.publisher.name = '';
          state.isTouched.book.publisher = true;
  
          return state;
        })
      }
    }

    onPublisherNameChange(name: string) {
      this.setState((prevState) => {
        let state: ModalStates = { ...prevState };
        state.newPublisher.name = name;
        state.isTouched.publisher.name = true;

        return state;
      })
    }

    onAddressChange(address: string) {
      this.setState((prevState) => {
        let state: ModalStates = { ...prevState };
        state.newPublisher.address = address;
        state.isTouched.publisher.address = true;

        return state;
      })
    }

    onFundationYearCHange(fundationYear: string) {
      this.setState((prevState) => {
        let state: ModalStates = { ...prevState };
        state.newPublisher.fundationYear = +(fundationYear);
        state.isTouched.publisher.fundationYear = true;

        return state;
      })
    }

    validateElement(element: any) {
      if (typeof element === 'string') {
        if (element !== '') {
          return true;
        } else {
          return false;
        }
      }
      if (typeof element === 'number') {
        if (element !== 0) {
          return true;
        } else {
          return false;
        }
      }
    }

  render() {
    return (
        <>
        <BS.Modal key="modal" size="lg" centered show={this.state.showModal} onHide={() => this.onClose()}>
          <BS.Modal.Header closeButton>
            <BS.Modal.Title>Add new {this.state.type}</BS.Modal.Title>
          </BS.Modal.Header>
          { this.props.type === Pages.AUTHORS &&
            (
              <BS.Modal.Body>
                <BS.Form>
                <BS.Row>
                  <BS.Col>
                    <BS.Form.Group controlId="formBasicPenName">
                      <BS.Form.Label><h5>Pen name</h5></BS.Form.Label>
                      <BS.Form.Control 
                        onChange={(event: any) => this.onPenNameChange(event.target.value)}
                        onBlur={(event: any) => this.onPenNameChange(event.target.value)}
                        name="penName"
                        type="text"
                        placeholder="Enter pen name"
                        isValid={this.state.isTouched.author.penName && this.validateElement(this.state.newAuthor.penName)}
                        isInvalid={this.state.isTouched.author.penName && !this.validateElement(this.state.newAuthor.penName)}
                      />
                      <BS.Form.Control.Feedback type="invalid">
                        This field is required!
                      </BS.Form.Control.Feedback>
                    </BS.Form.Group>
                  </BS.Col>
                  <BS.Col>
                    <BS.Form.Group controlId="formBasicRealName">
                      <BS.Form.Label><h5>Real name</h5></BS.Form.Label>
                      <BS.Form.Control 
                        onChange={(event: any) => this.onRealNameChange(event.target.value)}
                        onBlur={(event: any) => this.onRealNameChange(event.target.value)}
                        type="text"
                        placeholder="Enter real name"
                        isValid={this.state.isTouched.author.realName && this.validateElement(this.state.newAuthor.realName)}
                        isInvalid={this.state.isTouched.author.realName && !this.validateElement(this.state.newAuthor.realName)} 
                      />
                      <BS.Form.Control.Feedback type="invalid">
                        This field is required!
                      </BS.Form.Control.Feedback>
                    </BS.Form.Group>
                  </BS.Col>
                </BS.Row>
                <BS.Form.Group controlId="formBasicBirth">
                    <BS.Form.Label><h5>Year of birth</h5></BS.Form.Label>
                    <BS.Form.Control 
                      onChange={(event: any) => this.onBirthYearChange(event.target.value)}
                      onBlur={(event: any) => this.onBirthYearChange(event.target.value)}
                      type="text"
                      placeholder="Enter the year of birth"
                      isValid={this.state.isTouched.author.birthYear && this.validateElement(this.state.newAuthor.birthYear)}
                      isInvalid={this.state.isTouched.author.birthYear && !this.validateElement(this.state.newAuthor.birthYear)} 
                    />
                    <BS.Form.Control.Feedback type="invalid">
                      This field is required!
                    </BS.Form.Control.Feedback>
                  </BS.Form.Group>
                </BS.Form>
              </BS.Modal.Body>
            )
          }
          { this.props.type === Pages.BOOKS &&
            (
              <BS.Modal.Body>
                <BS.Form>
                  <BS.Form.Group controlId="formBasicTitle">
                    <BS.Form.Label><h5>Title</h5></BS.Form.Label>
                    <BS.Form.Control 
                      onChange={(event: any) => this.onTitleChange(event.target.value)}
                      onBlur={(event: any) => this.onTitleChange(event.target.value)}
                      type="text" 
                      placeholder="Enter Title"
                      isValid={this.state.isTouched.book.title && this.validateElement(this.state.newBook.title)}
                      isInvalid={this.state.isTouched.book.title && !this.validateElement(this.state.newBook.title)}  
                    />
                    <BS.Form.Control.Feedback type="invalid">
                      This field is required!
                    </BS.Form.Control.Feedback>
                  </BS.Form.Group>
                  <BS.Form.Group controlId="exampleForm.ControlSelect1">
                    <BS.Form.Label><h5>Select author</h5></BS.Form.Label>
                    <BS.Form.Control 
                      onChange={(event: any) => this.onAuthorChange(event.target.value)}
                      onBlur={(event: any) => this.onAuthorChange(event.target.value)}
                      as="select"
                      isValid={this.state.isTouched.book.author && this.validateElement(this.state.newBook.author.penName)}
                      isInvalid={this.state.isTouched.book.author && !this.validateElement(this.state.newBook.author.penName)} 
                    > 
                    <option value="-1">Please select an author!</option>
                      { this.props.authors.map((author) =>
                        <option key={author.penName}>{author.penName}</option>
                        )
                      }
                    </BS.Form.Control>
                    <BS.Form.Control.Feedback type="invalid">
                      This field is required!
                    </BS.Form.Control.Feedback>
                  </BS.Form.Group>
                  <BS.Row>
                    <BS.Col>
                      <BS.Form.Group controlId="formBasicPages">
                        <BS.Form.Label><h5>Number of pages</h5></BS.Form.Label>
                        <BS.Form.Control 
                          onChange={(event: any) => this.onPageNumberChange(event.target.value)}
                          onBlur={(event: any) => this.onPageNumberChange(event.target.value)}
                          type="text"
                          placeholder="Enter number of pages"
                          isValid={this.state.isTouched.book.pageNumber && this.validateElement(this.state.newBook.pageNumber)}
                          isInvalid={this.state.isTouched.book.pageNumber && !this.validateElement(this.state.newBook.pageNumber)} 
                        />
                        <BS.Form.Control.Feedback type="invalid">
                          This field is required!
                        </BS.Form.Control.Feedback>
                      </BS.Form.Group>
                    </BS.Col>
                    <BS.Col>
                      <BS.Form.Group controlId="formBasicPublication">
                        <BS.Form.Label><h5>Year of publication</h5></BS.Form.Label>
                        <BS.Form.Control 
                          onChange={(event: any) => this.onPublicationChange(event.target.value)}
                          onBlur={(event: any) => this.onPublicationChange(event.target.value)}
                          type="text"
                          placeholder="Enter the year of publication"
                          isValid={this.state.isTouched.book.publicationYear && this.validateElement(this.state.newBook.publicationYear)}
                          isInvalid={this.state.isTouched.book.publicationYear && !this.validateElement(this.state.newBook.publicationYear)}  
                        />
                        <BS.Form.Control.Feedback type="invalid">
                          This field is required!
                        </BS.Form.Control.Feedback>
                      </BS.Form.Group>
                    </BS.Col>
                  </BS.Row>
                  <BS.Form.Group controlId="exampleForm.ControlSelect2">
                    <BS.Form.Label><h5>Select publisher</h5></BS.Form.Label>
                    <BS.Form.Control
                      onChange={(event: any) => this.onPublisherChange(event.target.value)}
                      onBlur={(event: any) => this.onPublisherChange(event.target.value)}
                      as="select"
                      isValid={this.state.isTouched.book.publisher && this.validateElement(this.state.newBook.publisher.name)}
                      isInvalid={this.state.isTouched.book.publisher && !this.validateElement(this.state.newBook.publisher.name)}  
                    >
                    <option value="-1">Please select a publisher!</option>
                      { this.props.publishers.map((publisher) =>
                          <option key={publisher.name}>{publisher.name}</option>
                        )
                      }
                    </BS.Form.Control>
                    <BS.Form.Control.Feedback type="invalid">
                      This field is required!
                    </BS.Form.Control.Feedback>
                  </BS.Form.Group>
                </BS.Form>
              </BS.Modal.Body>
            )
          }{ this.props.type === Pages.PUBLISHERS &&
            (
              <BS.Modal.Body>
              <BS.Form>
                <BS.Form.Group controlId="formBasicName">
                  <BS.Form.Label><h5>Name</h5></BS.Form.Label>
                  <BS.Form.Control
                    onChange={(event: any) => this.onPublisherNameChange(event.target.value)}
                    onBlur={(event: any) => this.onPublisherNameChange(event.target.value)}
                    type="text"
                    placeholder="Enter name"
                    isValid={this.state.isTouched.publisher.name && this.validateElement(this.state.newPublisher.name)}
                    isInvalid={this.state.isTouched.publisher.name  && !this.validateElement(this.state.newPublisher.name)}   
                  />
                  <BS.Form.Control.Feedback type="invalid">
                    This field is required!
                  </BS.Form.Control.Feedback>
                </BS.Form.Group>
                    <BS.Form.Group controlId="formBasicAddress">
                      <BS.Form.Label><h5>Address</h5></BS.Form.Label>
                      <BS.Form.Control 
                        onChange={(event: any) => this.onAddressChange(event.target.value)}
                        onBlur={(event: any) => this.onAddressChange(event.target.value)}
                        type="text"
                        placeholder="Enter the address"
                        isValid={this.state.isTouched.publisher.address && this.validateElement(this.state.newPublisher.address)}
                        isInvalid={this.state.isTouched.publisher.address  && !this.validateElement(this.state.newPublisher.address)}   
                      />
                      <BS.Form.Control.Feedback type="invalid">
                        This field is required!
                      </BS.Form.Control.Feedback>
                    </BS.Form.Group>
                    <BS.Form.Group controlId="formBasicFundation">
                      <BS.Form.Label><h5>Year of fundation</h5></BS.Form.Label>
                      <BS.Form.Control 
                        onChange={(event: any) => this.onFundationYearCHange(event.target.value)}
                        onBlur={(event: any) => this.onFundationYearCHange(event.target.value)}
                        type="text"
                        placeholder="Enter the year of fundation"
                        isValid={this.state.isTouched.publisher.fundationYear && this.validateElement(this.state.newPublisher.fundationYear)}
                        isInvalid={this.state.isTouched.publisher.fundationYear  && !this.validateElement(this.state.newPublisher.fundationYear)} 
                      />
                      <BS.Form.Control.Feedback type="invalid">
                        This field is required!
                      </BS.Form.Control.Feedback>
                    </BS.Form.Group>
              </BS.Form>
            </BS.Modal.Body>
            )
          }
          <BS.Modal.Footer>
            <BS.Button variant="danger"  onClick={() => this.onClose()}>
              Close
            </BS.Button>
            <BS.Button variant="success" onClick={() => this.onSave()}>
              Save
            </BS.Button>
          </BS.Modal.Footer>
        </BS.Modal>
        { this.state.showPopup &&
          <Popup
            message="Are you sure you want to save this?"
            onClose={(result: boolean) => this.onPopupClose(result)}
          ></Popup>
        }
      </>
    );
  }
}

export default Modal;
