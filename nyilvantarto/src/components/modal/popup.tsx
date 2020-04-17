import React from 'react';
import * as BS from 'react-bootstrap';

export interface PopupProps{
    message: string;
    onClose: ((result: boolean) => void)
}

export interface PopupStates{
    showModal: boolean
}

class Popup extends React.Component<PopupProps, PopupStates> {
    constructor(props: PopupProps){
        super(props)
        this.state = {
            showModal: true
        }
    }

    onClose() {
        this.setState({
            showModal: false
        });
        this.props.onClose(false)
    }

  render() {
    return (
        <>
        <div style={{width: 'auto'}}>
        <BS.Modal key="popup" style={{background: 'rgba(0,0,0, 0.3)'}} centered show={this.state.showModal} onHide={() => this.onClose()}>
          <BS.Modal.Header closeButton>
            <BS.Modal.Title>{this.props.message}</BS.Modal.Title>
          </BS.Modal.Header>
          <BS.Modal.Footer>
            <BS.Button variant="danger"  onClick={() => this.onClose()}>
              No
            </BS.Button>
            <BS.Button variant="success" onClick={() => this.props.onClose(true)}>
              Yes
            </BS.Button>
          </BS.Modal.Footer>
        </BS.Modal>
        </div>
      </>
    );
  }
}

export default Popup;
