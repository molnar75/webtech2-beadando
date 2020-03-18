import React from 'react';
import * as BS from 'react-bootstrap';
import { Publisher } from '../models/publisher';
import { Pages } from '../App'
import Popup from '../modal/popup';

export interface PublishersProps{
  publishers: Publisher[];
  showModal: ((type: Pages) => void)
}

export interface PublishersStates{
  showPopup: boolean
}

class Publishers extends React.Component<PublishersProps, PublishersStates> {
  constructor(props: PublishersProps){
    super(props)

    this.state = {
      showPopup: false
    }
}

onDelete(publisher: Publisher) {
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
                    <td align="center" style={{width: '10%'}}>
                      <BS.Button onClick={() => this.onDelete(publisher)} variant="danger">Delete</BS.Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </BS.Table>
            <br />
            <BS.Button variant='secondary' size='lg' className={'adNewButton'} onClick={() => this.props.showModal(Pages.PUBLISHERS)}>
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

export default Publishers;
