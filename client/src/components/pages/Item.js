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
<<<<<<< HEAD
        // console.log(this.props.location.state.productResult)
=======
        console.log(this.props)
        API
            .itemCall(this.props.location.state.productName || "Eye")
            .then(res => {
                console.log(res.data);
            })
>>>>>>> ce213aae25004b93c44a7618ee0dad20f0617ec6
    }

    render() {
        return (
            <div> Item </div>
        );
    }
}

export default Item;