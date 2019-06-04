import React from 'react'
import Users from './Users.js';
import MessageInput from './MessageInput';
import Messages from './Messages';
import Header from './Header';
import PropTypes from 'prop-types';



class Chat extends React.PureComponent {

    static propTypes = {
        username: PropTypes.string,
        userId: PropTypes.string,
        socket: PropTypes.object,
        userSetting: PropTypes.func,
        profileImage: PropTypes.string
    }

  constructor(props) {
    super(props);
    this.state = {
      messagesInfo: [],
      users: [],
    };

  }

  componentWillMount(){

      this.props.socket.on('spotim/chat',(m)=> {
          if (m.type === 'message') {

          this.setState({
              messagesInfo: [...this.state.messagesInfo, {
                  senderId: m.userId,
                  senderName: m.username,
                  text: m.text,
                  img: m.avatar,
                  timetoken: Date.now().toString()
              }],
          });
          }
           else if(m.type === 'connect') {
             if(m.userId !== this.props.userId) {
                 this.props.socket.emit('spotim/chat', {
                     type: 'connect',
                     avatar: this.props.profileImage,
                     userId: this.props.userId,
                     username: this.props.username
                 });
             }
             if(!this.state.users.find(e => e.id === m.userId))
               this.setState({
                   users: [...this.state.users, {
                       id: m.userId,
                       img: m.avatar,
                       name: m.username

                   }]
               });
           }


        });
    }


  render() {

    return (
      <div className='grid'>
        <Header
          username={this.props.username}
          profileImage={this.props.profileImage}
          userSetting={this.props.userSetting}/>
        <Messages
          userId={this.props.userId}
          messagesInfo={this.state.messagesInfo}/>
        <MessageInput
            socket={this.props.socket}
          userId={this.props.userId}
          username={this.props.username}
            profileImage={this.props.profileImage}/>
        <Users
               userId={this.props.userId}
               users={this.state.users}/>
        </div>
      );
  }

}


export default Chat;