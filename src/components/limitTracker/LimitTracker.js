import React, { Component } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Context } from '../../context';

import './style.scss'

class LimitTracker extends Component {
 constructor() {
    super();
    this.state = {
    	percentage: 0
    };
  }

  componentWillMount = () => {
  	this.context.getUserLimit();
  }

  componentDidMount = () => {
  	console.log(this.context.state.limit)
  	this.setState({percentage: parseInt(this.context.state.spent)})
  }

  getPercent = (a, b) => Math.floor(a/b*100)


  render() {
    return (
    	<div className="material">
    		<Context.Consumer>
        	{(context) => (
						<div>
							<CircularProgressbar 
				    		value={this.getPercent(context.state.spent, context.state.limit)} 
				    		text={(this.getPercent(context.state.spent, context.state.limit)) + "%"} 
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

export default LimitTracker;