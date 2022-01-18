import React from 'react';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <div className='br2 shadow-1 w4 h4 logo pt3'><img className='h-70 w-70' alt='logo' src={brain} /></div>
    </div>
  )
};

export default Logo;