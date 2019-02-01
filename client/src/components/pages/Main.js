import React, { Component } from "react";
 
class Main extends Component {
  render() {
    return (
        <div>
          <h1>Beauty Buddy</h1>
          <ul className="header">
            <li><a href="/">Home</a></li>
            <li><a href="/stuff">Profile</a></li>
            <li><a href="/contact">Settings</a></li>
          </ul>
          <div className="content">
             
          </div>
        </div>
    );
  }
}
 
export default Main;