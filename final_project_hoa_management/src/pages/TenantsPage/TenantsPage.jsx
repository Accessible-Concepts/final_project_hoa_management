import React, { Component } from "react";
import "./TenantsPage.css";
import NewTenantModal from "../../components/Tenants/Modals/NewTenantModal";
import EditTenantModal from "../../components/Tenants/Modals/EditTenantModal";
import Footer from "../../components/footer/Footer";
import UserModel from "../../models/UserModel";
// import TenantComponent from "../../components/Tenants/TenantComponent";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";

import {
  Container,
  Button,
  Form,
  FormControl,
  Row,
  Col
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Parse from "parse";

export default class TenantsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewTenantModal: false,
      showEditTenantModal: false,
      input: "",
      tenants: [],
      editTenantRowIndex: "",
      apartment: "",
      fName: "",
      lName: "",
      email: "",
      phoneNumber: "",
      tenantEdit: {}
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

    var sessionToken = Parse.User.current().get("sessionToken");

    newParseUser
      .signUp()
      .then(theCreatedParseTenant => {
        Parse.User.become(sessionToken).then(() => {
          console.log(
            "Created a new tenant(user) and stayed logged in as: ",
            activeUser
          );
        });
        const newUserLogin = new UserModel(theCreatedParseTenant);
        const newTenants = this.state.tenants;
        this.setState({
          tenants: newTenants.concat(newUserLogin)
        });
      })
      .catch(error => {
        console.error("Error while creating new tenant", error);
      });
  };

  //Function that handles the modals components to close
  handleClose = () => {
    this.setState({
      showNewTenantModal: false,
      showEditTenantModal: false
    });
  };

  getTenantByRowIndex = row => {
    console.log("tenants: ", this.state.tenants);
    console.log("row ", row);
    this.setState({
      tenantEdit: row
    });
    console.log("tenantEdit: ", this.state.tenantEdit);
  };
  render() {
    const {
      input,
      tenants,
      showNewTenantModal,
      showEditTenantModal,
      tenantEdit
    } = this.state;
    const { activeUser } = this.props;

    if (!activeUser) {
      return <Redirect to="/" />;
    }

    // Funxtion that filters the tenants array according
    // to the text entered in the input field
    let inputFilteredTenants = tenants.filter(tnt => {
      let boolResultofApartment = tnt.apartment
        .toLowerCase()
        .includes(this.state.input.toLowerCase());
      let boolResultofFname = tnt.fName
        .toLowerCase()
        .includes(this.state.input.toLowerCase());
      let boolResultofLname = tnt.lName
        .toLowerCase()
        .includes(this.state.input.toLowerCase());
      let boolResultofEmail = tnt.email
        .toLowerCase()
        .includes(this.state.input.toLowerCase());
      let boolResultofPhoneNumber = tnt.phoneNumber
        .toLowerCase()
        .includes(this.state.input.toLowerCase());
      return (
        boolResultofApartment ||
        boolResultofFname ||
        boolResultofLname ||
        boolResultofEmail ||
        boolResultofPhoneNumber
      );
    });

    const styles = {
      row: {
        marginLeft: 0,
        marginRight: 0
      },
      col: {
        paddingLeft: 0,
        paddingRight: 0
      }
    };

    const columns = [
      {
        dataField: "apartment",
        text: "Apt. Number",
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

    // const CaptionElement = () => (
    //   <p
    //     style={{
    //       borderRadius: "0.25em",
    //       textAlign: "left",
    //       color: "#585753",
    //       fontWeight: "bold"
    //       border: "1px solid #585753",
    //       padding: "0.5em 0"
    //     }}
    //   >
    //     Community: {community.get("community")}
    //   </p>
    // );

    // const defaultSorted = [
    //   {
    //     dataField: "apartment",
    //     order: "asc"
    //   }
    // ];

    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        this.setState({
          showEditTenantModal: true,
          tenantEdit: row
        });
        // this.getTenantByRowIndex(rowIndex);
        this.getTenantByRowIndex(row);
        console.log(`clicked on row with index: ${row}`);
        console.log(this.state.editTenantRowIndex);
      },
      onMouseEnter: (e, row, rowIndex) => {
        console.log(`enter on row with index: ${row}`);
      }
    };

    const community = this.props.activeUser.community;
    // console.log("tenantEdit: ", this.state.tenantEdit);
    console.log(this.props.activeUser);

    return (
      <div className="tenants-page">
        <Container fluid className="t-cont">
          <Form.Group>
            <Row className="message-input-row" style={styles.row}>
              <Col style={styles.col}>
                <FormControl
                  placeholder="Filter tenants by text in Apartment Number,
                First Name, Last Name, Email Address and Phone Number"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={input}
                  onChange={this.onChangeHandler}
                />
              </Col>
            </Row>
          </Form.Group>
          <Row className="btn-input-row" style={styles.row}>
            <div className="community-title-table">
              Community: {community.get("community")}
            </div>
            <Button
              size="sm"
              onClick={() => {
                this.setState({ showNewTenantModal: true });
              }}
            >
              New Tenant
            </Button>
          </Row>
          {/* <CaptionElement /> */}
          <BootstrapTable
            striped
            hover
            keyField="id"
            data={inputFilteredTenants}
            // caption={<CaptionElement />}
            columns={columns}
            // defaultSorted={defaultSorted}
            rowEvents={rowEvents}
            headerClasses="header-class"
          />
        </Container>
        <NewTenantModal
          show={showNewTenantModal}
          handleClose={this.handleClose}
          handleNewTenant={this.handleNewTenant}
        />
        <EditTenantModal
          show={showEditTenantModal}
          handleClose={this.handleClose}
          handleEditTenant={this.handleEditTenant}
          tenantEdit={tenantEdit}
          // onClick={this.rowEvents.onClick}
        />
        <Footer />
      </div>
    );
  }
}
