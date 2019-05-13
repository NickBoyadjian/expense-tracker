import React from 'react';

import './style.scss';

const List = (props) => {
	return (
		<div className="material">
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