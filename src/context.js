import React, { Component } from 'react';
import app from './base';
import BlankProfile from './images/blank-profile.png';

const Context = React.createContext();

class Provider extends Component {

	getUser = _ => { 
		if (app.auth().currentUser.photoURL != null) {
			this.setState({photoURL: app.auth().currentUser.photoURL})
		} else {
			this.setState({photoURL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"})
		}
		
		this.setState({email: app.auth().currentUser.providerData[0].email});
		this.setState({user_id: app.auth().Qb.O});
		this.setState({db: app.firestore()})
	}

	getUserLimit = _ => {
		let data = app.firestore()
			.collection("limits")
			.where("user_id", "==", app.auth().Qb.O)

		data.onSnapshot(limit => {
			let res = 0;
			limit.forEach(doc => {
				res = doc.data().limit
			})
			this.setState({ limit: res });
		})
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
		limit: 0,
		number: 0,
		photoURL: null,
		getUser: this.getUser,
		getExpenses: this.getExpenses,
		addExpense: this.addExpense,
		deleteExpense: this.deleteExpense,
		getUserLimit: this.getUserLimit
	}


	render() {
		return (
			<Context.Provider value={
				{
					state: this.state,
					getUser: this.getUser,
					getExpenses: this.state.getExpenses,
					getUserLimit: this.state.getUserLimit
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