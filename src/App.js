import React from 'react';
import './App.css';

import RentForm from './components/RentForm'

const imaginaryUser = {
  email: '',
  username: '',
  imaginaryThingId: null,
};

function App() {
  return (
    <div className="App">
      <RentForm/>
    </div>
  );
}

export default App;
