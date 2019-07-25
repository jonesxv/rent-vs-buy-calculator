import React from 'react';
import './App.css';

// import RentInput from './components/RentInput'
import MyForm from './components/MyForm'
import Navbar from './components/Navbar'

const imaginaryUser = {
  email: '',
  username: '',
  imaginaryThingId: null,
};

class App extends React.Component {
  render() {
    return (
      <div className="main">
        <Navbar />
        <div className="App">
          <MyForm />
        </div>
      </div>
    )
  }
}

export default App;
