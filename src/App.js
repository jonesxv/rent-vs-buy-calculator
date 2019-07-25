import React from 'react';
import './App.css';

// import RentInput from './components/RentInput'
import MyForm from './components/MyForm'

const imaginaryUser = {
  email: '',
  username: '',
  imaginaryThingId: null,
};

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {/* <RentInput /> */}
  
        <MyForm />
        
      </div>
    )
  }
}

export default App;
