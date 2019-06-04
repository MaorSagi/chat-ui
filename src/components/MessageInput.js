import React from 'react';
import PropTypes from "prop-types";

class MessageInput extends React.PureComponent {


    static propTypes = {
        socket: PropTypes.object,
        userId: PropTypes.string,
        username: PropTypes.string,
        profileImage: PropTypes.string
    }

  constructor(props){
    super(props);
    this.state = {
      messageContent: '',
    }
  }

  onSend = (e) => {
      e.preventDefault();

    if (this.state.messageContent.length>0) {
        this.props.socket.emit('spotim/chat',
            {type: 'message',avatar:this.props.profileImage,username:this.props.username,userId:this.props.userId,text:this.state.messageContent});
    }
    this.setState({
        messageContent: '',
    })
  };


  render() {
    return (
      <div className='messageInput'>
        <form className='msgForm' onSubmit={this.onSend}>
          <input
            className='msgInput'
            value={this.state.messageContent}
            onChange={event => this.setState({messageContent: event.target.value})}
            placeholder='Type your message here...'/>
            <button className='submitBtn'  type='submit'>Send</button>
        </form>
      </div>
    );
  }

  }

export default MessageInput;