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
   
    componentDidMount() {
        // console.log(this.props)
        API
            .itemCall(this.props.location.state.productName || "Eye")
            .then(res => {
                this.setState({ items: res.data })
                console.log(this.state.items);
            });
    }

    render() {
        return (
           
            this.state.items.map(yourItems => (
                <div key={yourItems.name}>

                    <h6 className="nav-pages">{yourItems.name}</h6>
                    <p>{yourItems.brand}</p>
                    <p>${yourItems.price}</p>
                </div>

            )
            ))}
    }

    export default Item;