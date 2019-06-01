// imports
import React from 'react';
import app from '../../base';
import { Context } from '../../context';

// Components
import List from '../list/List';
import AddEntry from '../addEntry/AddEntry';
import Navbar from '../navbar/Navbar';
import ImageUpload from './ImageUpload';

import './style.scss';

export default class Settings extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showImageUpload: false,
		}
	}

	componentWillMount = _ => { this.context.getUser() }

	logOut = async _ => {
		try {
		  await app.auth().signOut();
		} catch (e) {
			console.log(e)
		} 
	}

	hideUploadButton = _ => {
		this.setState({showImageUpload: false})
	}

	componentDidMount = _ => {
		console.log(this.context.state.isGoogleUser)
	}


	render = _ =>
		<div className="App">
			<Navbar />
			<h1 className="page-title">Settings</h1>
			<div className="material">
				<Context.Consumer>
	        	{(context) => (
	        		<div className="user">
	        			<img src={context.state.photoURL} />
	        			{
	        				context.state.isGoogleUser
	        					? ""
	        					: this.state.showImageUpload 
			        					? <ImageUpload hideUploadButton={this.hideUploadButton} />
			        					: <div className="upload-button">
			        							<button onClick={() => {this.setState({showImageUpload: true})}}> 
			        								<i className="fa fa-upload" />
			        							</button>
			        						</div>
	        			}
	        			<h1>Email: {context.state.email}</h1>
	        		</div>
	        	)}
	      </Context.Consumer>
	      <button className="button" onClick={this.logOut}>Log Out</button>
			</div>
		</div>
}
Settings.contextType = Context