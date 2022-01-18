import React from 'react';


const Rank = ( {userName, userEntries }) => {
  return (
    <div>
      <div className='f3 white'>
        <p>{`${userName}, your current rank is...`}</p>
      </div>
      <div className='f3 white'>
        <p>{`#${userEntries}`}</p>
      </div>
    </div>
  )
};

export default Rank;