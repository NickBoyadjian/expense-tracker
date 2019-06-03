import React, { Component } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Context } from '../../context';

import './style.scss'

export default class LimitTracker extends Component {
 constructor() {
    super();
    this.state = {
    	percentage: 0
    };
  }

  componentWillMount = _ => { this.context.getUserLimit(); }

  componentDidMount = _ => { this.setState({percentage: parseInt(this.context.state.spent)}) }

  getPercent = (a, b) => Math.floor(a/b*100)
 

  render() {
  	if(this.context.state.limit == 0) {
  		return(
  			<AddLimit />
  		)
  	}
    return (
    	<div className="material">
    		<Context.Consumer>
        	{(context) => (
						<div>
							<CircularProgressbar 
				    		value={
				    			Number.isNaN(this.getPercent(context.state.spent, context.state.limit))
				    			&& !isFinite(this.getPercent(context.state.spent, context.state.limit))
				    			? 0
				    			: this.getPercent(context.state.spent, context.state.limit)
				    		} 
				    		text={
				    			Number.isNaN(this.getPercent(context.state.spent, context.state.limit))
				    			&& !isFinite(this.getPercent(context.state.spent, context.state.limit))
				    			? "0%" 
				    			: this.getPercent(context.state.spent, context.state.limit) + "%"
				    		} 
				    		styles={buildStyles({
						 
						    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
						    strokeLinecap: 'round',
						 
						    // Text size
						    textSize: '16px',
						 
						    // How long animation takes to go from one percentage to another, in seconds
						    pathTransitionDuration: 1,
						 
						    // Can specify path transition in more detail, or remove it entirely
						    // pathTransition: 'none',
						 
						    // Colors
						    pathColor: `#a084ed`,
						    textColor: '#eee',
						    trailColor: '#d6d6d6',
						    backgroundColor: '#3e98c7',
					  		})}
				  		/>
				  		<h1 className="limit-header">Weekly Limit: {context.state.limit}</h1>
				  		<h1 className="limit-header">Spent: {context.state.spent}</h1>
						</div>
        	)}
		    </Context.Consumer>
	    </div>
    );
  }
}
LimitTracker.contextType = Context;

class AddLimit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			limit: undefined
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		this.context.state.addUserLimit(this.state.limit);
	}

	handleAmountChange = e => { this.setState({limit: e.target.value}) }

	render = _ =>
		<div className="material">
			<form onSubmit={this.handleSubmit.bind(this)}>
      <label>
        <h1 className="set-limit-header">Set Weekly Spending Limit</h1>
        <div className="columns">
					<div className="column">
	          <input 
	          	className="input" 
	          	type="number"
	          	step="any"
	          	pattern="\d*"
	          	placeholder="Limit"
	          	onChange={this.handleAmountChange.bind(this)} 
	          	value={this.state.limit}
	          />
        	</div>
        </div>
      </label>
      <input className="button submit-btn" type="submit" value="Submit" />
    	</form>
		</div>
}
AddLimit.contextType = Context;