import React, { Component } from 'react';
import AuthService from './AuthService';
import type from '../../category.json'
import './style.css'
import API from '../../utils/API'

class Category extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
    }
 state={
     type: type
 }

 GoToItem = (name) => {
    API.itemCall(name)
 }

    render() {
        return (
            <div className="row">
            <div className="col-6">
                {this.state.type.map(item => (
                    <>
                <h1 className="category-tag">{item.name}</h1>
                <div className="category-image" style={ {backgroundImage : `url(${item.image})`}} onClick={()=> this.GoToItem(item.name)}>
                </div>
                </>
                ))}
                </div>
              </div>  
        );
    }
}

export default Category;