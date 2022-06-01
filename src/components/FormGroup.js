import React from 'react';

export default class FormGroup extends React.Component {
    
    render() {
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                {this.props.children}
            </div>
        )
    }
}