import React, { Component } from "react";
import "./DashboardPage.css";
import MainNavbar from "../../components/Navbar/MainNavbar";
import Footer from "../../components/Footer/Footer";
// import { Container, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import Parse from "parse";

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // showNewRecipeModal: false
    };

    // this.handleClose = this.handleClose.bind(this);
    // this.handleNewRecipe = this.handleNewRecipe.bind(this);
  }
  render() {
    const { activeUser, handleLogout } = this.props;

    if (!activeUser) {
      return <Redirect to="/" />;
    }

    return (
      <div className="dashboard-page">
        <MainNavbar activeUser={activeUser} handleLogout={handleLogout} />
        <div className="db-cont">Dashboard Hello {activeUser.fname}</div>
        <Footer />
      </div>
    );
  }
}
