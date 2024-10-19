import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Chat, EmojiPeople, DateRange, ContactPhone } from '@mui/icons-material';

const Navbar = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch(newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/chat');
        break;
      case 2:
        navigate('/lifeskills');
        break;
      case 3:
        navigate('/calendar');
        break;
      case 4:
        navigate('/contact');
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
      }}
    >
      <BottomNavigationAction label="Home" icon={<Home />} />
      <BottomNavigationAction label="Chat" icon={<Chat />} />
      <BottomNavigationAction label="Life Skills" icon={<EmojiPeople />} />
      <BottomNavigationAction label="Calendar" icon={<DateRange />} />
      <BottomNavigationAction label="Contact" icon={<ContactPhone />} />
    </BottomNavigation>
  );
};

export default Navbar;