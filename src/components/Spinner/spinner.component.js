import React, { Component } from 'react';
import './spinner.style.css';

export default class SpinnerComponent extends Component{
    render() {
        return (
            <div className={this.props.forPage ? 'pageLoader' : 'spinner'}>
                <img src="/images/page_loading.gif" className="loading-img" alt="Loading..."/>
            </div>
        )
    }
}
