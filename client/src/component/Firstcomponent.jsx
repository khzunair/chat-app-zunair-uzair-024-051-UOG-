// FirstComponent.js
import React from 'react';

function FirstComponent({ onClick }) {
  return (
    <div>
      <h1>First Component</h1>
      <button onClick={onClick}>Switch to Second Component</button>
    </div>
  );
}

export default FirstComponent;
