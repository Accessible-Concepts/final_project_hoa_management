import React, { Component } from "react";
// import "./VotingComponent.css";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";

export default class VotingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { voting } = this.props;
    if (voting == null) return <Accordion />; //TODO: check with Nir

    console.log(voting);
    console.log(voting.userId);

    return (
      <Card className="voting-comp">
        <Accordion.Toggle as={Card.Header} eventKey={this.props.ind}>
          {voting.title}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={this.props.ind}>
          <Card.Body>
            <Container>
              <Row>
                <Col lg="4">
                  <div>Title: {voting.title}</div>
                  <div>Details: {voting.details} </div>
                </Col>
                <Col lg="4">
                  <div>Options: {voting.options}</div>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }
}

//   render() {
//     return (
//       <Row>
//         <Col>
//           <Row>
//             <Col>Details:</Col>
//             <Col lg="8">
//               text text text text text text text text text text text text text
//               text text text text text text text text text text
//             </Col>
//           </Row>
//           <Row>
//             <Col>End Date:</Col>
//             <Col lg="8">
//               <Row>
//                 <Col lg="6">Date</Col>
//                 <Col lg="6">Update</Col>
//               </Row>
//             </Col>
//           </Row>
//         </Col>
//         <Col lg="3" className="graph result-graph">
//           <div className="graph-title">Results</div>
//           <div className="graph-chart">Graph chart</div>
//         </Col>
//         <Col lg="3" className="graph">
//           <div className="graph-title">Voting Percentage</div>
//           <div className="graph-chart">Graph chart</div>
//         </Col>
//       </Row>
//     );
//   }
// }
