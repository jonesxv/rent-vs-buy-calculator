import React, { Component } from 'react';

import house from '../house.png';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
				<div className="container">
          <div className="row">
          <img className="house col-1" src={house} />
				  <a className="navbar-brand col-10 text-left" href="#"><h3>Renting vs Buying Calculator</h3></a>
          {/* <a className="navbar-brand text-right">info</a> */}
          </div>
				</div>
			</nav>
    );
  }
}

export default Navbar;