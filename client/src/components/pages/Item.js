import React, { Component } from 'react';
import API from '../../utils/API';
// import AuthService from './AuthService';

class Item extends Component {
    constructor() {
        super();
        // this.Auth = new AuthService();
        this.state = {
            items: []
        }
    }

    componentDidMount(){
        console.log(this.props)
        API
            .itemCall(this.props.location.state.productName || "Eye")
            .then(res => {
                console.log(res.data);
            })
    }

    render() {
        return (
            <div> Item </div>
        );
    }
}

export default Item;