// imports
import React from 'react';
import app from '../../base';
import { Context } from '../../context';

// Components
import List from '../list/List';
import AddEntry from '../addEntry/AddEntry';
import Navbar from '../navbar/Navbar';

import './style.scss';

class Settings extends React.Component {

	componentWillMount = _ => { 
		this.context.getUser()
	}


	render() {
		return(
			<div className="App">
				<Navbar />
				<h1 className="page-title">Settings</h1>
				<div className="material">
					<Context.Consumer>
		        	{(context) => (
		        		<div className="user">
		        			<img src={context.state.photoURL} />
		        			<h1>Email: {context.state.email}</h1>

		        		</div>
		        	)}
		      </Context.Consumer>
				</div>
			</div>
		)
	}
}
Settings.contextType = Context

export default Settings;