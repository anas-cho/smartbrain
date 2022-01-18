import React from 'react';

const ImageLinkForm = ( {onInputChange, onButtonSubmit} ) => {
  return (
    <div className=''>
      <p className='f3'>
        {'This Smart Brain will detect faces in your picutres. Try it now!'}
      </p>
      <input type='text' onChange={onInputChange}></input>
      <button className='pointer grow' onClick={onButtonSubmit}>{'Detect'}</button>
    </div>
  )
};

export default ImageLinkForm;