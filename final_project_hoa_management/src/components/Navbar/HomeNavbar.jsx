import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';

export default class HomeNavbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirectToHome: false
        }

        this.logout = this.logout.bind(this);
    }

    logout() {
        // This eventually calls the handleLogout method of the App component
        this.props.handleLogout();

        this.setState({
            redirectToHome: true
        })
    }

    componentDidUpdate() {
        if (this.state.redirectToHome) {
            this.setState({
                redirectToHome: false
            })
        }
    }

    render() {
        const { redirectToHome } = this.state;
        const { activeUser } = this.props;

        if (redirectToHome) {
            return <Redirect to="/" />
        }

        const signupLink = !activeUser ? <Nav.Link href="#/signup">Signup</Nav.Link> : null;
        const loginLink = !activeUser ? <Nav.Link href="#/login">Login</Nav.Link> : null;
        const logoutLink = activeUser ? <Nav.Link onClick={this.logout}>Logout</Nav.Link> : null;


        return (
            <Navbar variant="dark" expand="lg">
                <Navbar.Brand href="#/">Homeowner Association Management System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav bg="dark" variant="dark" className="ml-auto">
                        {signupLink}
                        {loginLink}
                        {logoutLink}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

