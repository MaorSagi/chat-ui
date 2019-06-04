import React from 'react';
import PropTypes from "prop-types"



class Messages extends React.PureComponent {


    static propTypes = {
        messagesInfo: PropTypes.array,
        userId: PropTypes.string
    }

styleForMessageSender = (id) => ((this.props.userId === id) ? 'senderMsg' : id) //different background color - distinguish between my message to others




getTime = (timetoken) => {//get a specific time format from Date long
        return new Date(parseInt(timetoken.substring(0, 13))).toLocaleTimeString('en-US', { hour: 'numeric', hour12: false, minute: 'numeric' })
    };


    scrollToBottom = () => { //ensure that the last messages would always be visible.
        const elem = document.querySelector(".msgsDialog");

        if(elem) {
            elem.scrollTop = elem.scrollHeight;
        }
    };

render()
{
    return <div className='messageBox'>
        <ul className='msgsDialog'>
    <div className='senderMsgsDialog'>
            {this.props.messagesInfo.map((info,index) =>
                <li className={this.styleForMessageSender(info.senderId)} key={index}>
                    <div className='message'>
                        <div className='name'>{info.senderName}</div>
                        <div className='time'>{this.getTime(info.timetoken)}</div>
                        <div className='text'>{info.text}</div>
                        <img width='28' height='28' alt='' src={info.img}/>
                    </div>
                </li>
            )}
            {this.scrollToBottom()}
        </div>
        </ul>
    </div>;
}

}

export default Messages;
