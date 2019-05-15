import React from 'react';
import app from '../../base';

import './style.scss'

class Navbar extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	currentUser: ""
    }
  }

	handleLogOut = async e => {
		try {
		  await app.auth().signOut();
		} catch (e){
			console.log(e)
		}
	}

	componentDidMount = _ => { this.getUser() }

	getUser = _ => { this.setState({currentUser: app.auth().currentUser.providerData[0].email}) }

	render() {
		return(
			<nav className="navbar" role="navigation" aria-label="main navigation">
			  <div className="navbar-brand">
			    <div className="navbar-item">
			      <h1 className="title">Expense Tracker</h1>
			    </div>

			  </div>

			  <div id="navbarBasicExample" className="navbar-menu">
			    <div className="navbar-start">
			      <div className="navbar-item" href="#">
			        {this.state.currentUser}
			      </div>

			    </div>

			    <div className="navbar-end">
			      <div className="navbar-item">
			        <div className="buttons">
			          <button className="button" onClick={this.handleLogOut.bind(this)}>
			            <strong>Log Out</strong>
			          </button>
			        </div>
			      </div>
			    </div>
			  </div>
			</nav>
		)
	}
}

export default Navbar;