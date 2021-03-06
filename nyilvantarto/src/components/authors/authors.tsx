import React from 'react';
import * as BS from 'react-bootstrap';
import { Author } from '../models/author';
import { Pages } from '../../App'
import Popup from '../modal/popup';
import { Book } from '../models/book';
import { Publisher } from '../models/publisher';

export interface AuthorsProps{
  authors: Author[];
  showModal: ((type: Pages) => void);
  onDelete: (type: Pages, object: Author | Book | Publisher) => void;

}

export interface AuthorsStates{
  showPopup: boolean;
  authorToDelete: Author;
}

class Authors extends React.Component<AuthorsProps, AuthorsStates> {
  constructor(props: AuthorsProps){
    super(props)

    this.state = {
      showPopup: false, 
      authorToDelete: {
        penName: '',
        realName: '',
        birthYear: 0
      }
    }
  }

  onDelete(author: Author) {
    this.setState({
      showPopup: true,
      authorToDelete: author
    });
  }

  onPopupClose(result: boolean) {
    this.setState({
      showPopup: false
    });
    if (result) {
      this.props.onDelete(Pages.AUTHORS, this.state.authorToDelete)
    }
  }

  render() {
    return (
      <>
      <div className={'backgorundStyle'}>
        <div>
          <br />
          <h1 style={{textAlign: 'center'}}>Authors</h1>
          <div className={'tableStyle'}>
            <br />
            <BS.Table striped bordered hover style={{ margin: 'auto', backgroundColor: 'white'}}>
              <thead>
                <tr>
                  <th>Pen name</th>
                  <th>Real name</th>
                  <th>Year of birth</th>
                </tr>
              </thead>
              <tbody>
                {this.props.authors.map((author) => 
                  <tr key={author.penName}>
                    <td>{author.penName}</td>
                    <td>{author.realName}</td>
                    <td>{author.birthYear}</td>
                    <td align="center" style={{width: '10%'}}>
                      <BS.Button onClick={() => this.onDelete(author)} variant="danger">Delete</BS.Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </BS.Table>
            <br />
            <BS.Button variant='secondary' size='lg' className={'adNewButton'} onClick={() => this.props.showModal(Pages.AUTHORS)}>
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

export default Authors;
