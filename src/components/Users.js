import React from 'react';
import PropTypes from "prop-types";



class Users extends React.PureComponent{

    static propTypes = {
        users: PropTypes.array,
        userId: PropTypes.string
    };

render() {

      return (
        <div className='Users'>
            <ul className='onlineUsersList'>
                {this.props.users.map((user,index) =>
                    <li key={index}>
                        <div className='name'>{user.name}</div>
                        <img width='45' height='45' alt='onlineUser' src={user.img}/>
                    </li>
                )}
            </ul>
        </div>
    );
}
}

export default Users;