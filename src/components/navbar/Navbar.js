import React from 'react';
import app from '../../base';
import HamburgerMenu from './Hamburger'
import './style.scss'

class Navbar extends React.Component {
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
		} catch (e){
			console.log(e)
		}
	}

	toggleMenu = _ => {
		this.setState({isVisible: !this.state.isVisible})
		console.log(this.state.isVisible)
	}

	componentDidMount = _ => { this.getUser() }

	getUser = _ => { this.setState({currentUser: app.auth().currentUser.providerData[0].email}) }

	render() {
		return(
			<nav className="navbar" role="navigation" aria-label="main navigation">
				<HamburgerMenu 
					toggleMenu={this.toggleMenu} 
					isVisible={this.state.isVisible}
					handleLogOut={this.handleLogOut}
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