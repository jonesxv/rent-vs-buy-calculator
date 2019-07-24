import React from 'react';
import './App.css';

import MyComponent from './components/MyComponent'

const imaginaryUser = {
  email: '',
  username: '',
  imaginaryThingId: null,
};

class App extends React.Component {
  state = {
    rentValues: {}
  }

  handleChange = values => {
    this.setState(prevState => {
      console.log(prevState)
      return {
        rentValues: values
      }
    })
  }
  render() {
    return (
      <div className="App">
        <MyComponent setValues={this.handleChange} />
      </div>
    )
  }
}

export default App;
