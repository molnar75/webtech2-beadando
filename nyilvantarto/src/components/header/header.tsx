import React from 'react';
import * as BS from 'react-bootstrap';

export interface HeaderProps{
    onPageChange: Function;
}

export interface HeaderStates{

}

class Header extends React.Component<HeaderProps, HeaderStates> {
    constructor(props: HeaderProps){
        super(props)

        this.state = {
        }
    }

  render() {
    return (
        <div>
            <img src={require('../../header.jpeg')} alt={'books'} width={'100%'}/>
            <BS.Navbar bg="dark" variant="dark" >
                <BS.Navbar.Brand >Book organiser</BS.Navbar.Brand>
                <BS.Nav defaultActiveKey='books' className="mr-auto" onSelect={(selectedKey: any) => this.props.onPageChange(selectedKey)}>
                    <BS.Nav.Link eventKey='books'>Books</BS.Nav.Link>
                    <BS.Nav.Link eventKey='authors'>Authors</BS.Nav.Link>
                    <BS.Nav.Link eventKey='publishers'>Publishers</BS.Nav.Link>
                </BS.Nav>
                <BS.Nav className="justify-content-end" onSelect={(selectedKey: any) => this.props.onPageChange(selectedKey)}>
                    <BS.Nav.Link eventKey='login'> Logout</BS.Nav.Link>
                </BS.Nav>
            </BS.Navbar>
        </div>
    );
  }
}

export default Header;
