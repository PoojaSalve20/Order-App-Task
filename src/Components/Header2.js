import { Button } from '@mui/material'
import React from 'react'
 


const Header2 = () => {
  const handleCreateNew = () => {
    window.location.href = '/ ';
  };
  return (
    <div className='header'>
        <span className='order-heading'>Create New</span>
        <Button variant="contained" color="primary" size="large" onClick={handleCreateNew}>
            Home
        </Button>
    </div>
  )
}

export default Header2