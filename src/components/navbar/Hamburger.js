import React from 'react';

import './style.scss'

class Hamburger extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="hamburger-menu-container" style={{right: this.props.isVisible ? '-50vw' : '-100vw'}}>
				<div className="header">
					<i onClick={this.props.toggleMenu} className="fa fa-times close-menu"></i>
				</div>

				<div className="sign-out-container">
					<button onClick={this.props.handleLogOut} className="sign-out-btn">sign out</button>
				</div>
			</div>
		)
	}
}

export default Hamburger;