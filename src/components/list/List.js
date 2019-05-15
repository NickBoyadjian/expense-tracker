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
			{props.purchases.map(purchase => <ListItem data={purchase} key={purchase.id}/>)}
		</div>
	)
}

const ListItem = (props) => {
	return (
		<div className="list_item">
			<h5 className="title">{props.data.title}</h5>
			<div className="category">{props.data.category}</div>
			<div className="amount">${props.data.amount}</div>
		</div>
	)
}

export default List;