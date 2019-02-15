import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../../utils/API';
import {sockets} from '../../utils/sockets';
import "./message.css";

class Message extends Component {

  state = {
    username: "",
    email: "",
    image: "",
    messages: []
  };
  constructor(props) {
    super(props);
    sockets.listenForMessage(data => {
      this.setState({ messages: [...this.state.messages, data] })
    });
  }


  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email,
        image: res.data.image
      })
    })
    console.log(this.state);
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  submitForm = event => {
    event.preventDefault();
    sockets.sendMessage(this.state.message);
    this.setState({ message: "" });
  };

  render() {
    return (
      <div className="container bg-light con-msg">
        <h3 className=" text-center">Messaging</h3>
        <div className="messaging">
          <div className="inbox_msg">
            <div className="inbox_people">
              <div className="headind_srch">
                <div className="recent_heading">
                  <h4>Recent</h4>
                </div>
                <div className="srch_bar">
                  <div className="stylish-input-group">
                    <input type="text" className="search-bar" placeholder="Search" />
                    <span className="input-group-addon">
                      <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                    </span> </div>
                </div>
              </div>
              <div className="inbox_chat">
                <div className="chat_list active_chat">
                  <div className="chat_people">
                    <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                    <div className="chat_ib">
                      <h5>Saba Borjian <span className="chat_date">Online</span></h5>
                      <p>Let's get this party yarn started!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mesgs">
              <div className="msg_history">
                <div className="incoming_msg">
                  <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                  <div className="received_msg">
                    <div className="received_withd_msg">
                      <p>Wow, Travis is the best instructor ever!!</p>
                      <span className="time_date"> 11:01 AM    |    June 9</span></div>
                  </div>
                </div>

                <div className="outgoing_msg">
                  <div className="sent_msg">
                    <p>I know, I can't believe we're graduating</p>
                    <span className="time_date"> 11:01 AM    |    Today</span> </div>
                </div>
                <div className="incoming_msg">
                  <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                  <div className="received_msg">
                    <div className="received_withd_msg">
                      <p>Let's get this party yarn started!</p>
                      <span className="time_date"> 11:01 AM    |    Today</span></div>
                  </div>
                </div>
                <div className="outgoing_msg">
                  <div className="sent_msg">
                    {this.state.messages.map(message => <p key={message}>{message}</p>)}
                    <span className="time_date">now</span> </div>
                </div>
              </div>
              <form className="form-inline input_msg_write type_msg">
                <div className="form-group ">
                  <input
                    value={this.state.message}
                    name="message"
                    onChange={this.handleInputChange}
                    type="textarea"
                    placeholder="your message"
                    className="form-control-lg write_msg"
                  />
                </div>
                <button type="submit" className="msg_send_btn" onClick={this.submitForm}><i class="fas fa-paper-plane" aria-hidden="true"></i></button>
              </form>

            </div>


          </div>
        </div>
      </div>

    )
  }
}

export default withAuth(Message);