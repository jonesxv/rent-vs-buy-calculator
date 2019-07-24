import React from 'react';
import './App.css';

import MyComponent from './components/MyComponent'

const imaginaryUser = {
  email: '',
  username: '',
  imaginaryThingId: null,
};

function App() {
  return (
    <div className="App">
      <MyComponent />
    </div>
  );
}

export default App;
