import React from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import app from '../../base';

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
      console.log(this.state)
    }
  }

  onEmailChange = e => { this.setState({email: e.target.value}) }
  onPwChange = e => { this.setState({password: e.target.value}) }


	render() {
		return(
			<div className="App">
				<div className="material">
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

					  <p>don't have an account? <Link to="/signup">sign up</Link></p>

					  <input className="button" type="Submit" value="Log in" onChange={() => {}}/>

					</form>
				</div>
			</div>
		)
	}
}

export default withRouter(SignInPage);