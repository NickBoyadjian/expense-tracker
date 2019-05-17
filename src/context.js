import React, { Component } from 'react';
import app from './base';

const Context = React.createContext();

class Provider extends Component {

	getUser = _ => { 
		this.setState({email: app.auth().currentUser.providerData[0].email});
		this.setState({user_id: app.auth().Qb.O});
		this.setState({db: app.firestore()})
	}

	getExpenses = _ => {
		let data = app.firestore()
			.collection("expenses")
			.where("user_id", "==", app.auth().Qb.O)
			.limit(5)

		data.onSnapshot(expenses => {
			let res = []
			expenses.forEach(doc => {
				res.push({...doc.data(), ...{id: doc.id}})
			})
			this.setState({ expenses: res.sort((a, b) => a.created < b.created) });
		})
	}

	addExpense = (title, amount, category) => {
  	let date = new Date();
  	this.state.db.collection("expenses").add({
  		user_id: this.state.user_id,
  		title: title,
  		amount: amount,
  		category: category,
  		created: date.getTime()
  	})
	}

	deleteExpense = id => {
		this.state.db.collection("expenses").doc(id).delete()
	}

	state = {
		email: "test",
		user_id: "",
		db: undefined,
		expenses: [],
		number: 0,
		getUser: this.getUser,
		getExpenses: this.getExpenses,
		addExpense: this.addExpense,
		deleteExpense: this.deleteExpense
	}


	render() {
		return (
			<Context.Provider value={
				{
					state: this.state,
					getUser: this.getUser,
					getExpenses: this.state.getExpenses,
				}
			}>
				{this.props.children}
			</Context.Provider>
		)
	}
}

export {
	Context,
	Provider
}