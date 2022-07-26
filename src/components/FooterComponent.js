import React, { Component } from 'react';
import './FooterComponent.css';

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <footer className="footer">
                    <span>
                        Projeto Fala Campus - DAC/ADS/IFPB 2022
                    </span>
                </footer>
            </div>
        )
    }
}

export default FooterComponent