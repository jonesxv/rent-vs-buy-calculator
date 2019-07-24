import React from 'react';
import './App.css';

import MyComponent from './components/MyComponent'

const imaginaryUser = {
  email: '',
  username: '',
  imaginaryThingId: null,
};

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MyComponent />
      </div>
    )
  }
}

export default App;
