// imports
import React, { Component } from 'react';
import app from '../../base';
import { Context } from '../../context';

// Components
import List from '../list/List';
import AddEntry from '../addEntry/AddEntry';
import Navbar from '../navbar/Navbar';
import ImageUpload from './ImageUpload';

import './style.scss';

export default class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showImageUpload: false,
			limit: 0,
		}
	}

	componentWillMount = _ => { 
		this.context.getUser(); 
		this.context.getUserLimit()
		this.setState({limit: this.context.state.limit}) 
	}

	hideUploadButton = _ => { this.setState({showImageUpload: false}) }
	logOut = async _ => {
		try {
		  await app.auth().signOut();
		} catch (e) {
			console.log(e)
		} 
	}

	handleUpdateLimit = e => {this.setState({limit: e.target.value})}
	updateLimitInFirebase = e => {
		let ref = this.context.state.db.collection("limits").doc(this.context.state.limit_id);
		ref.update({
			limit: this.state.limit
		})
	}


	render = _ =>
		<div className="App">
			<Navbar />
			<h1 className="page-title">Settings</h1>
			<div className="material">
				<Context.Consumer>
	        	{(context) => (
	        		<div className="user">
	        			<div className="img-container">
	        				<img src={context.state.photoURL} />	
	        			</div>
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
	        			<h1 className="header">Email: </h1> <h1>{context.state.email}</h1>
	        			<div className="limit">
	        				<h1 className="header">Set new weekly limit: </h1>
			        		<input 
			        			type="number" 
			        			step="any"
			        			pattern="\d*"
			        			value={this.state.limit}
			        			onChange={this.handleUpdateLimit.bind(this)}
			        		/>
			        		<button 
			        			onClick={this.updateLimitInFirebase.bind(this)}
			        			className="button update-btn"
			        		>
			        				Update
			        		</button>
			        	</div>
	        		</div>
	        	)}
	      </Context.Consumer>
	      <button className="button logout-btn" onClick={this.logOut}>Log Out</button>
			</div>
		</div>
}
Settings.contextType = Context