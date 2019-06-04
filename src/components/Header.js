import React from 'react';
import onlineLogo from '../assets/spotim-logo.jpg';
import PropTypes from "prop-types";


class Header extends React.PureComponent {

    static propTypes = {
        username: PropTypes.string,
        profileImage : PropTypes.string,
        userSetting: PropTypes.func
    }

render()
{
    const username = this.props.username;
    const profileImage = this.props.profileImage;
    return (
        <div className='header'>
            <div className='onlineUsersCount'>
                <img className='onlineUsersLogo' width='45' height='45' alt='logo' src={onlineLogo}/>
                <div className='members'>members</div>
                <span>Online</span>
                <span className='onlineCircle'/>
            </div>
            <button className='logo' id='setting-btn'  onClick={this.props.userSetting} type='submit'>Change User Setting</button>
            <div className='logedUser'>
                <div className='userName'>
                    <span className='hello'  >Hello, </span>
                    <span className='user' >{username}</span>
                </div>
                <img width='45' height='45' alt='profileImage' src={profileImage} />
            </div>
        </div>
    );
}
}
export default Header;