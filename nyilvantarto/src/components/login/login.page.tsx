import React from 'react';
import * as BS from 'react-bootstrap';
import './login.css'
import { User } from '../models/user';

export interface LoginPageProps{
    onPageChange: Function;
    users: User[];
}

export interface LoginPageStates{
    isLoginCorrect: boolean;
    username: string;
    password: string;
    error: string;
}

class LoginPage extends React.Component<LoginPageProps, LoginPageStates> {
    constructor(props: LoginPageProps){
        super(props)

        this.state = {
            isLoginCorrect: false,
            username: '',
            password: '',
            error: ''
        }
    }

    onSubmit(event: any) {
        console.log(this.props.users)
        const password = this.state.password;
        const username = this.state.username;
        if ( password !== '' &&  username !== ''){
            const loginUser: User = {
                username: username,
                password: password
            }
            for (let user of this.props.users) {
                if (user.username === loginUser.username && user.password === loginUser.password) {
                    this.setState({
                        isLoginCorrect: true
                    })
                    this.props.onPageChange('books')
                }
            }
            if (!this.state.isLoginCorrect) {
                this.setState({
                    error: "Username or password is incorrect!"
                })
            }
        } else {
            this.setState({
                error: "Username or password can not be empty!"
            })
        }

    }

    onUsernameChange(username: any) {
        if (username.target.value != null) {
            this.setState ({
                username: username.target.value
            });
        }
    }

    onPasswordChange(password: any) {
        if (password.target.value != null) {
            this.setState ({
                password: password.target.value
            });
        }
    }

  render() {
    return (
        <div>
            <div style={{marginLeft: '10%'}}>
                <div style={{textAlign: 'center', width: '40%'}}>
                    <h1 className='welcomeMessage'>Welcome!</h1>
                </div>
                <div className='loginForm'>
                    <BS.Form>
                        <BS.Form.Group controlId="formBasicEmail">
                            <BS.Form.Label>Username</BS.Form.Label>
                            <BS.Form.Control onChange={(username: any) => this.onUsernameChange(username)} type="email" placeholder="Enter username" />
                        </BS.Form.Group>
                    
                        <BS.Form.Group controlId="formBasicPassword">
                            <BS.Form.Label>Password</BS.Form.Label>
                            <BS.Form.Control onChange={(password: any) => this.onPasswordChange(password)} type="password" placeholder="Enter password" />
                        </BS.Form.Group>
                        <p className='errorMessage'>{this.state.error ? this.state.error : ''}</p>
                        <BS.Button variant="outline-dark" onClick={(event: any) => this.onSubmit(event)}>
                            Submit
                        </BS.Button>
                    </BS.Form>
                </div>
            </div>)
        </div>
    );
  }
}

export default LoginPage;
