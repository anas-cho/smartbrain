import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn}) => {
  if (isSignedIn) {
    return (
      <nav style={{display:'flex',justifyContent:'flex-end'}}>
       <p onClick={()=> onRouteChange('signin')} className= 'f4 link dim black underline pa3 pointer'>{'signout'}</p>
      </nav>
    )
  } else {
    return (
      <nav style={{display:'flex',justifyContent:'flex-end'}}>
       <p onClick={()=>onRouteChange('signin')} className= 'f4 link dim black underline pa3 pointer'>{'signin'}</p>
       <p onClick={()=>onRouteChange('register')} className= 'f4 link dim black underline pa3 pointer'>{'register'}</p>
      </nav>
    )
  }
};

export default Navigation;