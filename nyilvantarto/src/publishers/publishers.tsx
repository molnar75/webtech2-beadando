import React from 'react';
import * as BS from 'react-bootstrap';
import { Publisher } from '../models/publisher';

export interface PublishersProps{
  publishers: Publisher[];
}

export interface PublishersStates{}

class Publishers extends React.Component<PublishersProps, PublishersStates> {
  render() {
    return (
      <div className={'backgorundStyle'}>
        <div>
          <br />
          <h1 style={{textAlign: 'center'}}>Publishers</h1>
          <div className={'tableStyle'}>
            <br />
            <BS.Table striped bordered hover style={{ margin: 'auto', backgroundColor: 'white'}}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Year of fundation</th>
                </tr>
              </thead>
              <tbody>
                {this.props.publishers.map((publisher) => 
                  <tr key={publisher.name}>
                    <td>{publisher.name}</td>
                    <td>{publisher.address}</td>
                    <td>{publisher.foundationYear}</td>
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

export default Publishers;
