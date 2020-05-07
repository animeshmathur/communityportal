import React, { Component } from 'react';
import './card.style.css';

export class CardComponent extends Component {
    render() {
        return (
            <article className="card">
                {this.props.children}
            </article>
        );
    };
}