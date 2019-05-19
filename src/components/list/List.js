import React, {Component} from 'react';
import './style.scss';
import { Context } from '../../context';
import emptyBox from '../../images/empty-box.png';

class List extends Component {
	constructor(props) {
		super(props)
		this.state = {
			range: "Past 7 days"
		}
	}

	render() {
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

class ListItem extends Component {
	constructor(props) {
		super(props)

		this.state = {
			showConfirm: false
		}
	}

	initiateDelete = _ => {
		this.setState({showConfirm: true})
	}

	hideDelete = _ => {
		this.setState({showConfirm: false})
	}
	
	render = _ => {
		return (
				<div className="list_item">
					<h5 className="title">{this.props.data.title}</h5>
					<div className="category">{this.props.data.category}</div>
					<div className="right_side_container">
						${this.props.data.amount}
						<i onClick={this.initiateDelete} className="fa fa-times delete-icon" />
						<div 
							className="confirm-delete" 
							style={{
								"display": this.state.showConfirm ? "inline" : "none"
							}}>
							<a 
								onClick={() => {this.context.state.deleteExpense(this.props.data.id)}}
								className="mbutton delete-button">
								Delete
							</a>
							<a 
								onClick={this.hideDelete}
								className="mbutton">
								cancel
							</a>
						</div>
					</div>
				</div>
			)
	}
}
ListItem.contextType = Context

export default List;