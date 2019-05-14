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
		  this.props.history.push("/signin");
		} catch (e){
			console.log(e)
		}
	}

	componentDidMount = _ => {
		this.setState({currentUser: app.auth().currentUser.providerData[0].email})
	}

	render() {
		return(
			<nav className="navbar" role="navigation" aria-label="main navigation">
			  <div className="navbar-brand">
			    <div className="navbar-item">
			      <h1 className="title">Expense Tracker</h1>
			    </div>

			    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
			      <span aria-hidden="true"></span>
			      <span aria-hidden="true"></span>
			      <span aria-hidden="true"></span>
			    </a>
			  </div>

			  <div id="navbarBasicExample" className="navbar-menu">
			    <div className="navbar-start">
			      <a className="navbar-item">
			        {this.state.currentUser}
			      </a>

			    </div>

			    <div className="navbar-end">
			      <div className="navbar-item">
			        <div className="buttons">
			          <a className="button" onClick={this.handleLogOut.bind(this)}>
			            <strong>Log Out</strong>
			          </a>
			        </div>
			      </div>
			    </div>
			  </div>
			</nav>
		)
	}
}

export default Navbar;