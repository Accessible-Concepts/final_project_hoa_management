import React, { Component } from 'react';
import './VoteComponent.css';
import { Row, Col } from 'react-bootstrap';

export default class VoteComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // users: []
        };
    }

    render() {

        return (
            <Row>
                <Col >
                    <Row>
                        <Col>
                            Details:
                                </Col>
                        <Col lg="8">
                            text text text text text text text text text text text text text text text text text text text text text text
                             text
                                </Col>
                    </Row>
                    <Row>
                        <Col >
                            End Date:
                                </Col>
                        <Col lg="8">
                            <Row>
                                <Col lg="6">
                                    Date
                                        </Col>
                                <Col lg="6">
                                    Update
                                        </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col lg="3" className="graph result-graph">
                    <div className="graph-title">
                        Results
                            </div>
                    <div className="graph-chart">
                        Graph chart
                            </div>
                </Col>
                <Col lg="3" className="graph">
                    <div className="graph-title">
                        Voting Percentage
                            </div>
                    <div className="graph-chart">
                        Graph chart
                            </div>
                </Col>
            </Row>
        )
    }
}
