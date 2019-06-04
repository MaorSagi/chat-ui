
//This is your top level React component, you may change everything

import React from 'react'
import Chat from './Chat';
import io from "socket.io-client";
import avatar1 from '../avatars/avatar1.png';
import avatar2 from '../avatars/avatar2.png';
import avatar3 from '../avatars/avatar3.png';
import avatar4 from '../avatars/avatar4.png';
import avatar5 from '../avatars/avatar5.png';
import avatar6 from '../avatars/avatar6.png';
import avatar7 from '../avatars/avatar7.png';
import avatar8 from '../avatars/avatar8.png';
import avatar9 from '../avatars/avatar9.png';
import avatar10 from '../avatars/avatar10.png';
import defaultProfile from '../avatars/default-profile.png';



const socket = io("https://spotim-demo-chat-server.herokuapp.com");


class App extends React.PureComponent {



    constructor(props){
        super(props);

        this.state = {
            username: '',
            userId: '',
            profileImage:  defaultProfile
        }


    }

    setUsername(){
        if(!this.state.username.length){
            alert("Username required")
            return;
        }
        const userId = this.state.username.concat(Date.now().toString());
        localStorage.setItem('username',this.state.username);
        localStorage.setItem('userId',userId);
        localStorage.setItem('avatar',this.state.profileImage)
        this.setState({userId: userId});
    }



    userExist(){
        var username =  localStorage.getItem('username');
        if(username==null)
            return false;
        var userId =  localStorage.getItem('userId');
        var img = localStorage.getItem('avatar');
        this.setState({
            username: username,
            userId: userId,
            profileImage: img
        });
        return true;
    }

    returnToOpeningScreen(){
        localStorage.clear();
        window.location.reload();

    }




    addEventListenersToImgs(){
        const classname = document.getElementsByClassName('profileImage');
        for (var i = 0; i < classname.length; i++) {
            classname[i].addEventListener('click', event=>{

                var imgUrl='';
                switch(event.target.id) {
                    case 'avatar1':
                        imgUrl = avatar1;
                        break;
                    case 'avatar2':
                        imgUrl = avatar2;
                        break;
                    case 'avatar3':
                        imgUrl = avatar3;
                        break;
                    case 'avatar4':
                        imgUrl = avatar4;
                        break;
                    case 'avatar5':
                        imgUrl = avatar5;
                        break;
                    case 'avatar6':
                        imgUrl = avatar6;
                        break;
                    case 'avatar7':
                        imgUrl = avatar7;
                        break;
                    case 'avatar8':
                        imgUrl = avatar8;
                        break;
                    case 'avatar9':
                        imgUrl = avatar9;
                        break;
                    case 'avatar10':
                        imgUrl = avatar10;
                        break;
                }
                this.setState({profileImage:imgUrl});

            });

    }
    }

    componentDidMount(){
        this.addEventListenersToImgs();
    }




    render(){
        const image = this.state.profileImage;
        const username = this.state.username;
        const userId = this.state.userId;
        socket.emit('spotim/chat', {type: 'connect', avatar: image, userId: userId, username: username});
        return this.userExist() ? <Chat username={username} userId={userId}  socket={socket}
                                        profileImage={image} userSetting={this.returnToOpeningScreen}/> :
            <div style={{textAlign:'center',paddingTop:'200px'}}>
                <h1>Welcome!</h1>
                <div>
                <h2>Please enter your username here:</h2>
                <input className='openingScreen' id='app-input' value={this.state.username}
                       onChange={event => this.setState({username: event.target.value})
                       } placeholder='Username'/>
                </div>
                        <div>
                <h2>Choose your avatar:</h2>

                <input type="image" className='profileImage' id='avatar1' alt='submit' src={avatar1}/>
                <input type="image" className='profileImage' id='avatar2' alt='submit' src={avatar2}/>
                <input type="image" className='profileImage' id='avatar3' alt='submit' src={avatar3}/>
                <input type="image" className='profileImage' id='avatar4' alt='submit' src={avatar4}/>
                <input type="image" className='profileImage' id='avatar5' alt='submit' src={avatar5}/>
                <input type="image" className='profileImage' id='avatar6' alt='submit' src={avatar6}/>
                <input type="image" className='profileImage' id='avatar7' alt='submit' src={avatar7}/>
                <input type="image" className='profileImage' id='avatar8' alt='submit' src={avatar8}/>
                <input type="image" className='profileImage' id='avatar9' alt='submit' src={avatar9}/>
                <input type="image" className='profileImage' id='avatar10' alt='submit' src={avatar10}/>

                        </div>
                <button className='enterUsername' id='enter-btn' onClick={()=>this.setUsername()}>Enter</button>
            </div>  ;

    }
}

export default App;