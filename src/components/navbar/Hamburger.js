import React from 'react';
import { Link } from 'react-router-dom';

export default props =>
	<div className="hamburger-menu-container" style={{right: props.isVisible ? '0vw' : '-100vw'}}>
		<div className="header">
			<i onClick={props.toggleMenu} className="fa fa-times close-menu" />
		</div>

		<div className="user">
			<div className="img-container">
				<img src={props.context.state.photoURL} alt='' />
			</div>
			<h1>{props.context.state.email}</h1>
		</div>

		<div className="navigate">
			<Link to="/" className="nav-item">
				Dashboard
			</Link>
			<Link to="/expenses" className="nav-item">
				Expenses
			</Link>
			<Link to="/settings" className="nav-item">
				Settings
			</Link>
		</div>


	</div>

