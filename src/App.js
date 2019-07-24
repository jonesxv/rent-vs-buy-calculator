import React from 'react';
import './App.css';

import RentInput from './components/RentInput'

const imaginaryUser = {
  email: '',
  username: '',
  imaginaryThingId: null,
};

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <RentInput />
      </div>
    )
  }
}

export default App;
