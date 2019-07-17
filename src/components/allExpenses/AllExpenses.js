// imports
import React from 'react';
import app from '../../base';
import { Context } from '../../context';

// Components
import ListItem from '../list/ListItem';
import Navbar from '../navbar/Navbar';
import './style.scss'

export default class AllExpenses extends React.Component {

	componentWillMount = _ => { 
		this.context.getExpenses();
		this.context.getUser();
	}


	render = _ =>
		<div className="App">
			<Navbar />
			<div className="material">
				<h1 className="header">All Expenses</h1>
				<hr/>
	        <Context.Consumer>
	        	{(context) => (
	        		<h1>{context.state.allExpenses.map((expense) => <ListItem data={expense} key={expense.id} />)}</h1>
	        	)}
	        </Context.Consumer>
			</div>
		</div>
	
}
AllExpenses.contextType = Context
