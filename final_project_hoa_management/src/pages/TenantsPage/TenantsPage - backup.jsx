import React, { Component } from "react";
import "./TenantsPage.css";
import NewTenantModal from "../../components/Tenants/Modals/NewTenantModal";
import Footer from "../../components/footer/Footer";
import UserModel from "../../models/UserModel";
// import TenantComponent from "../../components/Tenants/TenantComponent";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";

import { Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Parse from "parse";

export default class TenantsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewTenantModal: false,
      tenants: []
    };
  }

  async componentDidMount() {
    const { activeUser } = this.props;
    console.log(activeUser);

    if (activeUser) {
      const User = Parse.Object.extend("User");
      const query = new Parse.Query(User);
      query.equalTo("community", activeUser.community);
      const parseUsers = await query.find();
      console.log(query);
      const tenants = parseUsers.map(parseUser => new UserModel(parseUser));
      this.setState({ tenants });
    }
    console.log(this.state.tenants);
  }

  //Function that handles the input field changes
  onChangeHandler = ev => {
    this.setState({
      input: ev.target.value
    });
    // console.log("this.state.input: " + this.state.input);
  };

  //Function that adds a new tenant(user) to the parse database
  //and to the users state
  handleNewTenant = newTenant => {
    const { activeUser } = this.props;
    var sessionToken = Parse.User.current().get("sessionToken");

    const newParseUser = new Parse.User();
    newParseUser.set("username", newTenant.email);
    newParseUser.set("email", newTenant.email);
    newParseUser.set("email2", newTenant.email);
    newParseUser.set("password", newTenant.password);
    newParseUser.set("phoneNumber", newTenant.phoneNumber);
    newParseUser.set("lName", newTenant.lName);
    newParseUser.set("fName", newTenant.fName);
    newParseUser.set("community", activeUser.community);
    newParseUser.set("apartment", newTenant.apartment);
    newParseUser.set("isCommitteeMember", false);

    newParseUser
      .signUp()
      .then(theCreatedParseTenant => {
        Parse.User.become(sessionToken).then(() => {
          console.log(
            "Created a new tenant(user) and stayed logged in as: ",
            activeUser
          );
          const newUserLogin = new UserModel(theCreatedParseTenant);
          const newTenants = this.state.tenants;
          this.setState({
            tenants: newTenants.concat(new UserModel(newUserLogin))
          });
        });
      })
      .catch(error => {
        console.error("Error while creating new tenant", error);
      });
  };

  //Function that handles the modals components to close
  handleClose = () => {
    this.setState({
      showNewTenantModal: false
      // showEdiTenantModal: false
    });
  };

  render() {
    const { tenants, showNewTenantModal } = this.state;
    const { activeUser } = this.props;

    if (!activeUser) {
      return <Redirect to="/" />;
    }
    // console.log(activeUser);
    // console.log("activeUser.id: " + activeUser.id);

    const columns = [
      {
        dataField: "apartment",
        text: "Apt.",
        sort: true
      },
      {
        dataField: "fName",
        text: "First Name",
        sort: true
      },
      {
        dataField: "lName",
        text: "Last Name",
        sort: true
      },
      {
        dataField: "email",
        text: "Email Address",
        sort: true
      },
      {
        dataField: "phoneNumber",
        text: "Phone Number",
        sort: true
      }
    ];

    const defaultSorted = [
      {
        dataField: "apartment",
        order: "desc"
      }
    ];

    return (
      <div className="tenants-page">
        <div className="t-cont">
          <Container fluid>
            <BootstrapTable
              striped
              hover
              keyField="id"
              data={tenants}
              columns={columns}
              defaultSorted={defaultSorted}
            />
            <button
              onClick={() => {
                this.setState({ showNewTenantModal: true });
              }}
            >
              Add Tenant
            </button>
          </Container>
          <NewTenantModal
            show={showNewTenantModal}
            handleClose={this.handleClose}
            handleNewTenant={this.handleNewTenant}
          />
        </div>
        <Footer />
      </div>
    );
  }
}
