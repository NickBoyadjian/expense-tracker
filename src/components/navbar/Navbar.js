import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import app from '../../base';
import HamburgerMenu from './Hamburger';
import { Context } from '../../context';
import './style.scss';

export default class Navbar extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	currentUser: "",
    	isVisible: false
    }
  }

	handleLogOut = async e => {
		try {
		  await app.auth().signOut();
		} catch (e) {
			console.log(e)
		}
	}

	toggleMenu = _ => { this.setState({isVisible: !this.state.isVisible}) }

	getUser = _ => { this.setState({currentUser: app.auth().currentUser.providerData[0].email}) }

	render() {
		return(
			<nav className="navbar" role="navigation" aria-label="main navigation">
				<HamburgerMenu 
					toggleMenu={this.toggleMenu} 
					isVisible={this.state.isVisible}
					handleLogOut={this.handleLogOut}
					context={this.context}
				/>
			  <div className="navbar-brand">
			    <div className="navbar-item">
			      <h1 className="title">Expense Tracker</h1>
			    </div>

			    <a onClick={this.toggleMenu} role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
					  <span aria-hidden="true"></span>
					  <span aria-hidden="true"></span>
					  <span aria-hidden="true"></span>
					</a>

			  </div>

			  <div id="navbarBasicExample" className="navbar-menu">
			    <div className="navbar-end">

						<div className="navbar-item">
			        <div className="field is-grouped">
			          <p className="control">
			            <Link to="/" className="button">
			              <span className="icon">
			                <i className="fa fa-folder-open"></i>
			              </span>
			              <span>
			                Dashboard
			              </span>
			            </Link>
			          </p>
			        </div>
			      </div>

						<div className="navbar-item">
			        <div className="field is-grouped">
			          <p className="control">
			            <Link to="/expenses" className="button">
			              <span className="icon">
			                <i className="fa fa-folder-open"></i>
			              </span>
			              <span>
			                Expenses
			              </span>
			            </Link>
			          </p>
			        </div>
			      </div>

			      <div className="navbar-item">
			        <div className="field is-grouped">
			          <p className="control">
			            <Link to="/settings" className="button">
			              <span className="icon">
			                <i className="fa fa-user"></i>
			              </span>
			              <span>
			                Settings
			              </span>
			            </Link>
			          </p>
			        </div>
			      </div>

			    </div>
			  </div>
			</nav>
		)
	}
}
Navbar.contextType = Context