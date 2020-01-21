import React, { Component } from 'react';
import './Footer.css';


export default class Footer extends Component {

    render() {

        return (
            <footer className="myFooter">
                This app was created by&nbsp;<span><a href="mailto:liorhasson@gmail.com">Lior Hasson</a></span>
            </footer>
        );
    }
}

