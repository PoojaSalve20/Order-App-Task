import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [isHomePage, setIsHomePage] = useState(false);
  // const location = useLocation();

  useEffect(() => {
    setIsHomePage(window.location === '/');
  }, [window.location]);

  const handleCreateNew = () => {
    window.location.href = '/create-new';
  };

  return (
    <div className='header'>
      {isHomePage ? (
        <>
          <span className='order-heading'>Create New</span>
          <Button variant="contained" color="primary" size="large" onClick={handleCreateNew}>
            Home
          </Button>
        </>
      ) : (
        <>
          <span className='order-heading'>Orders</span>
          <Button variant="contained" color="primary" size="large" onClick={handleCreateNew}>
            CREATE NEW
          </Button>
        </>
      )}
    </div>
  );
};

export default Header;
