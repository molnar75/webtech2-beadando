import React from 'react';
import * as BS from 'react-bootstrap';
import { Author } from '../models/author';

export interface AuthorsProps{
  authors: Author[];
}

export interface AuthorsStates{}

class Authors extends React.Component<AuthorsProps, AuthorsStates> {
  render() {
    return (
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

export default Authors;
