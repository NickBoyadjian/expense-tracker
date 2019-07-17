import React, {Component} from 'react';
import { Context } from '../../context';

export default class ListItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showConfirm: false
		}
	}

	initiateDelete = _ => { this.setState({showConfirm: true}) }

	hideDelete = _ => { this.setState({showConfirm: false}) }

	getFormatedDate = input => {
		let date = new Date(input).toString()
		return date.substring(3, 15)
	}
	
	render = _ => 
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
			<p>{this.getFormatedDate(this.props.data.created)}</p>
		</div>
}
ListItem.contextType = Context