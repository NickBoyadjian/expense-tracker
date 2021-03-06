import React from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import app from '../../base';

import './style.scss'


class SignUpPage extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	email: '',
    	password: '',
    	passwordConfirmation: '',
    	error: ''
    }
  }

  onSubmit = async e => {
    e.preventDefault();
    const { email, password, passwordConfirmation } = e.target.elements;
    if (passwordConfirmation.value != password.value) {
    	this.setState({error: "Passwords must match"});
    	return;
    }
    try {
      const user = await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      this.props.history.push("/");
    } catch (error) {
      this.setState({error: error.message})
      console.log(this.state)
    }
  }

  onEmailChange = e => { this.setState({email: e.target.value}) }
  onPwChange = e => { this.setState({password: e.target.value}) }
  onPwConfirmationChange = e => { this.setState({passwordConfirmation: e.target.value}) }


	render() {
		return(
			<div className="App">
				<div className="material auth-form">
					<h1 className="title">Create Account</h1>
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

					  <p className="control has-icons-left">
					    <input 
					    	className="input" 
					    	type="password" 
					    	name="passwordConfirmation"
					    	onChange={this.onPwConfirmationChange.bind(this)}
					    	placeholder="Password Confirmation" />
					    <span className="icon is-small is-left">
					      <i className="fa fa-lock"></i>
					    </span>
					  </p>

					  <p className="error">{this.state.error}</p>

					  <p>already have an account? <Link to="/login">sign in</Link></p>

					  <input className="button" type="Submit" value="Create Account" onChange={() => {}}/>

					</form>
				</div>
			</div>
		)
	}
}

export default withRouter(SignUpPage);