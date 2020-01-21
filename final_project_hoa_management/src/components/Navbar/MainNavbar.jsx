import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';

export default class MainNavbar extends Component {

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

        // const recipesLink = activeUser ? <Nav.Link href="#/recipes">Recipes</Nav.Link> : null;
        const signupLink = !activeUser ? <Nav.Link href="#/signup">Signup</Nav.Link> : null;
        const loginLink = !activeUser ? <Nav.Link href="#/login">Login</Nav.Link> : null;
        const logoutLink = activeUser ? <Nav.Link onClick={this.logout}>Logout</Nav.Link> : null;

        // const signupLink = !activeUser ? <a href="#/signup">Signup</a> : null;
        // const loginLink = !activeUser ? <a href="#/login">Login</a> : null;
        // const logoutLink = activeUser ? <div onClick={this.logout}>Logout</div> : null;

        return (
            <Navbar collapseOnSelect expand="lg" variant="dark">
                <Navbar.Brand href="#/">HOA Management System</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="#/tenants">Tenants</Nav.Link>
                        <Nav.Link href="#/messages">Messages</Nav.Link>
                        <Nav.Link href="#/issues">Issues</Nav.Link>
                        <Nav.Link href="#/voting">Voting</Nav.Link>
                    </Nav>
                    <Nav>
                        {signupLink}
                        {loginLink}
                        {logoutLink}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

