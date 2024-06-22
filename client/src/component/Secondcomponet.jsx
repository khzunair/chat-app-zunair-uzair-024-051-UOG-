// SecondComponent.js
import React from 'react';

function SecondComponent({ onClick }) {
  return (
    <div>
      <h1>Second Component</h1>
      <button onClick={onClick}>Switch to First Component</button>
    </div>
  );
}

export default SecondComponent;
