import React from 'react';
import notFoundImg from 'common/img/not_found.png';
const notFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src={notFoundImg} />
    </div>
  );
};

export default notFound;
