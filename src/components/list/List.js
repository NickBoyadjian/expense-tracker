import React from 'react';
import './style.scss';
import emptyBox from '../../images/empty-box.png'

const List = (props) => {
	if (props.purchases.length == 0) {
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
			{props.purchases.map(purchase => <ListItem data={purchase} db={props.db} key={purchase.id}/>)}
		</div>
	)
}

class ListItem extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			showConfirm: false
		}
	}

	deleteListItem = _ => {
		this.props.db.collection("expenses").doc(this.props.data.id).delete()
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
								onClick={this.deleteListItem}
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

export default List;