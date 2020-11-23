import React, { useContext, useState } from 'react';
import { Icon, Label, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import { useNotificationDispatch } from '../context/notification';
import Notification from './Notifications';
function MenuBar() {

  const { user, logout} = useContext(AuthContext);
  const notificationDispatch = useNotificationDispatch();
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menu = user ? (
      <Menu pointing secondary size="massive" color="violet">
        <Menu.Item
          name= "home"
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as= {Link}
        to= "/"
        />
        <Menu.Item
          name= { user.username }
          active={activeItem === `${user.username}`}
          onClick={handleItemClick}
          as= {Link}
          to= {`/profile/${user.id}`}
        />
        <Menu.Menu position='right'>
          <Menu.Item as={Link} to={`/profile/${user.id}`}>
            <Icon name="users"/>
            <Label color="violet" floating >
              <Notification/>
            </Label>
          </Menu.Item>
          <Menu.Item
            name='logout'
            onClick={() => {notificationDispatch({type: "CLEAR_DETAILS"}); logout()}}
          />
        </Menu.Menu>
      </Menu>
  ):(
    <Menu pointing secondary size="massive" color="violet">
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as= {Link}
        to= "/"
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as= {Link}
          to= "/login"
          />
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as= {Link}
          to= "/register"
          />
        </Menu.Menu>
      </Menu>
  )
  
  return menu;
}

export default MenuBar;