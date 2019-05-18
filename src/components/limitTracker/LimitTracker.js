import React, { Component } from 'react';
import { Context } from '../../context';

class LimitTracker extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.context.getUserLimit()
		console.log()
	}

	render() {
		return (
			<div className="material">
				<Context.Consumer>
		        	{(context) => (
		        		<div className="user">
		        		
		        			<h1>Limit: {context.state.limit}</h1>

		        		</div>
		        	)}
		      </Context.Consumer>
			</div>
		)
	}
}
LimitTracker.contextType = Context;

export default LimitTracker;