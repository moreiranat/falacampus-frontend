import React from 'react';

export default class CommentsCard extends React.Component {
    
    render() {
        return (
            <div className="card bg-light mb-3" style={this.styles.cardBg}>
                <h3 className="card-header text-center">{this.props.title}</h3>
                <div className="card-body">{this.props.children}</div>
            </div>
        )
    }

    styles = {
        cardBg: {
            outerWidth: '20rem',
            margin: '50px 0 0 0'            
        }
    }
}