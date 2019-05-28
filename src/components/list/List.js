import React, {Component} from 'react';
import { Context } from '../../context';
import emptyBox from '../../images/empty-box.png';
import ListItem from './ListItem';
import './style.scss';

export default class List extends Component {
	constructor(props) {
		super(props)
		this.state = {
			range: "Past 7 days"
		}
	}

	render = _ => {
		if (this.context.state.expenses.length == 0) {
			return (
				<div className="material">
					<div className="empty-box">
						<h1>Wow... Such Empty</h1>
						<img className="" src={emptyBox} />
					</div>
				</div>
			)
		}
		return (
			<div className="material">
				<h1 className="material-header">Recent Expenses...</h1>
				<h2 className="range">{this.state.range}</h2>
	        <Context.Consumer>
	        	{(context) => (
	        		<h1>{context.state.expenses.map((expense) => <ListItem data={expense} key={expense.id} />)}</h1>
	        	)}
	        </Context.Consumer>
			</div>
		)
	}
}
List.contextType = Context 