import React from 'react';
import './App.css';
import Bookshelf from './Bookshelf/Bookshelf';
import * as BooksAPI from '../BooksAPI';

class Message extends React.Component {
  render() {
    return (
      <div id='msg-popup-container' className='transition' style={{ display: this.props.display }}>
        <div id='msg-box' className='transition'>
          Book Added To: <strong><span id='msg-text'>{this.props.text}</span></strong>!
        </div>
      </div>
    )
  }
}

export default Message;
