import React from 'react';
export default props =>
	<div className="hamburger-menu-container" style={{right: props.isVisible ? '0vw' : '-100vw'}}>
		<div className="header">
			<i onClick={props.toggleMenu} className="fa fa-times close-menu"></i>
		</div>

		<div className="sign-out-container">
			<button onClick={props.handleLogOut} className="sign-out-btn">sign out</button>
		</div>
	</div>

