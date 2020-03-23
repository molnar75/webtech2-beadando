import React from 'react';
import * as BS from 'react-bootstrap';
import { Pages } from '../App'
import { Author } from '../models/author';
import { Publisher } from '../models/publisher';
import { Book } from '../models/book';
import Popup from './popup';

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
            showPopup: false
        }
    }

    onClose() {
        this.setState({
            showModal: false
        });
        this.props.onModalClose();
    }

    onSave() {
      this.setState({
        showPopup: true
      });
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
      if (this.validateElement(penName)) {
        this.setState((prevState) => {
          let state: ModalStates = { ...prevState };
          state.newAuthor.penName = penName;

          return state;
       })
      }
    }

    onRealNameChange(realName: string) {
      if (this.validateElement(realName)) {
        this.setState((prevState) => {
          let state: ModalStates = { ...prevState };
          state.newAuthor.realName = realName;

          return state;
       })
      }
    }

    onBirthYearChange(birthYear: string) {
      if (this.validateElement(birthYear)) {
        this.setState((prevState) => {
          let state: ModalStates = { ...prevState };
          state.newAuthor.birthYear = +(birthYear);

          return state;
       })
      }
    }

    onTitleChange(title: string) {
      if (this.validateElement(title)) {
        this.setState((prevState) => {
          let state: ModalStates = { ...prevState };
          state.newBook.title = title;

          return state;
       })
      }
    }

    onAuthorChange(penName: string) {
      for (const author of this.props.authors) {
        if (author.penName === penName) {
          console.log(author)
          this.setState((prevState) => {
            let state: ModalStates = { ...prevState };
            state.newBook.author = author;
    
            return state;
          })
        }
      }
    }

    onPageNumberChange(pageNumber: string) {
      if (this.validateElement(pageNumber)) {
        this.setState((prevState) => {
          let state: ModalStates = { ...prevState };
          state.newBook.pageNumber = +(pageNumber);

          return state;
       })
      }
    }

    onPublicationChange(publicationYear: string) {
      if (this.validateElement(publicationYear)) {
        this.setState((prevState) => {
          let state: ModalStates = { ...prevState };
          state.newBook.publicationYear = +(publicationYear);

          return state;
       })
      }
    }

    onPublisherChange(name: string) {
      for (const publisher of this.props.publishers) {
        if (publisher.name === name) {
          this.setState((prevState) => {
            let state: ModalStates = { ...prevState };
            state.newBook.publisher = publisher;
    
            return state;
          })
        }
      }
    }

    onPublisherNameChange(name: string) {
      if (this.validateElement(name)) {
        this.setState((prevState) => {
          let state: ModalStates = { ...prevState };
          state.newPublisher.name = name;

          return state;
       })
      }
    }

    onAddressChange(address: string) {
      if (this.validateElement(address)) {
        this.setState((prevState) => {
          let state: ModalStates = { ...prevState };
          state.newPublisher.address = address;

          return state;
       })
      }
    }

    onFundationYearCHange(fundationYear: string) {
      if (this.validateElement(fundationYear)) {
        this.setState((prevState) => {
          let state: ModalStates = { ...prevState };
          state.newPublisher.fundationYear = +(fundationYear);

          return state;
       })
      }
    }

    validateElement(element: string):Boolean {
      if (element !== '') {
        return true;
      } else {
        return false;
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
                      <BS.Form.Control onChange={(event: any) => this.onPenNameChange(event.target.value)} name="penName" type="text" placeholder="Enter pen name" />
                    </BS.Form.Group>
                  </BS.Col>
                  <BS.Col>
                    <BS.Form.Group controlId="formBasicRealName">
                      <BS.Form.Label><h5>Real name</h5></BS.Form.Label>
                      <BS.Form.Control onChange={(event: any) => this.onRealNameChange(event.target.value)} type="text" placeholder="Enter real name" />
                    </BS.Form.Group>
                  </BS.Col>
                </BS.Row>
                <BS.Form.Group controlId="formBasicBirth">
                    <BS.Form.Label><h5>Year of birth</h5></BS.Form.Label>
                    <BS.Form.Control onChange={(event: any) => this.onBirthYearChange(event.target.value)} type="text" placeholder="Enter the year of birth" />
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
                    <BS.Form.Control type="text" placeholder="Enter Title" />
                  </BS.Form.Group>
                  <BS.Form.Group controlId="exampleForm.ControlSelect1">
                    <BS.Form.Label><h5>Select author</h5></BS.Form.Label>
                    <BS.Form.Control onChange={(event: any) => this.onAuthorChange(event.target.value)} as="select">
                    <option value="-1">Please select an author!</option>
                      { this.props.authors.map((author) =>
                        <option key={author.penName}>{author.penName}</option>
                        )
                      }
                    </BS.Form.Control>
                  </BS.Form.Group>
                  <BS.Row>
                    <BS.Col>
                      <BS.Form.Group controlId="formBasicPages">
                        <BS.Form.Label><h5>Number of pages</h5></BS.Form.Label>
                        <BS.Form.Control onChange={(event: any) => this.onPageNumberChange(event.target.value)} type="text" placeholder="Enter number of pages" />
                      </BS.Form.Group>
                    </BS.Col>
                    <BS.Col>
                      <BS.Form.Group controlId="formBasicPublication">
                        <BS.Form.Label><h5>Year of publication</h5></BS.Form.Label>
                        <BS.Form.Control onChange={(event: any) => this.onFundationYearCHange(event.target.value)} type="text" placeholder="Enter the year of publication" />
                      </BS.Form.Group>
                    </BS.Col>
                  </BS.Row>
                  <BS.Form.Group controlId="exampleForm.ControlSelect2">
                    <BS.Form.Label><h5>Select publisher</h5></BS.Form.Label>
                    <BS.Form.Control onChange={(event: any) => this.onPublisherChange(event.target.value)} as="select">
                    <option value="-1">Please select a publisher!</option>
                      { this.props.publishers.map((publisher) =>
                          <option key={publisher.name}>{publisher.name}</option>
                        )
                      }
                    </BS.Form.Control>
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
                  <BS.Form.Control onChange={(event: any) => this.onPublisherNameChange(event.target.value)} type="text" placeholder="Enter name" />
                </BS.Form.Group>
                    <BS.Form.Group controlId="formBasicAddress">
                      <BS.Form.Label><h5>Address</h5></BS.Form.Label>
                      <BS.Form.Control onChange={(event: any) => this.onAddressChange(event.target.value)} type="text" placeholder="Enter the address" />
                    </BS.Form.Group>
                    <BS.Form.Group controlId="formBasicFundation">
                      <BS.Form.Label><h5>Year of fundation</h5></BS.Form.Label>
                      <BS.Form.Control onChange={(event: any) => this.onFundationYearCHange(event.target.value)} type="text" placeholder="Enter the year of fundation" />
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
