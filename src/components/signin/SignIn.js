import React from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import app from '../../base';
import firebase from 'firebase';

import './style.scss'


class SignInPage extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	email: '',
    	password: '',
    	error: ''
    }
  }

  onSubmit = async e => {
    e.preventDefault();
    try {
      const user = await app
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
      this.props.history.push("/");
    } catch (error) {
      this.setState({error: error.message})
    }
  }

  googleAuth = async e => {
  	e.preventDefault();
  	let provider = new firebase.auth.GoogleAuthProvider();
    try {
      const user = await app.auth().signInWithPopup(provider)
      this.props.history.push("/");
    } catch (error) {
      this.setState({error: error.message})
    }
  }

  onEmailChange = e => { this.setState({email: e.target.value}) }
  onPwChange = e => { this.setState({password: e.target.value}) }


	render() {
		return(
			<div className="App">
				<div className="material auth-form">
					<h1 className="title">Sign in</h1>
					<form className="field" onSubmit={this.onSubmit.bind(this)}>

					  <p className="control has-icons-left has-icons-right">
					  	<input
					  		className="input"
					  		type="email"
					  		name="email"
					  		onChange={this.onEmailChange.bind(this)}
					  		value={this.state.email}
					  		placeholder="Email"
					  	/>
					    <span className="icon is-small is-left">
					      <i className="fa fa-envelope"></i>
					    </span>
					  </p>

					  <p className="control has-icons-left">
					    <input 
					    	className="input" 
					    	type="password" 
					    	name="password"
					    	onChange={this.onPwChange.bind(this)}
					    	placeholder="Password" />
					    <span className="icon is-small is-left">
					      <i className="fa fa-lock"></i>
					    </span>
					  </p>

					  <p className="error">{this.state.error}</p>
					  <input className="button" type="Submit" value="Sign in" onChange={() => {}}/>
					</form>

					<hr />

					<div className="google-sign-in">
						<h1 className="">Or</h1>
						<div className="button-container">
							<button onClick={this.googleAuth.bind(this)}> 
								<i className="fa fa-google" />
								Log in with Google
							</button>
						</div>
					</div>


					<p className="no-account">don't have an account? <Link to="/signup">sign up</Link></p>

				</div>
			</div>
		)
	}
}

export default withRouter(SignInPage);