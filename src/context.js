import React, { Component } from 'react';
import app from './base';
import BlankProfile from './images/blank-profile.png';

const Context = React.createContext();

class Provider extends Component {

	getUser = _ => { 
		
		this.setState({email: app.auth().currentUser.providerData[0].email});
		this.setState({user_id: app.auth().Qb.O});
		this.setState({db: app.firestore()})

		// handle profile pic setting
		if (app.auth().currentUser.photoURL != null) {
			this.setState({photoURL: app.auth().currentUser.photoURL})
			this.setState({isGoogleUser: true})
		} else {
			this.getImageFromStorage()
			this.setState({isGoogleUser: false})
		}
	}

	getImageFromStorage = _ => {
		// Create a Storage Ref w/ username
		const storageRef = app.storage().ref(app.auth().Qb.O + '/profilePicture/' + "profilepic.jpg");

		storageRef.getDownloadURL()
			.then(url => {
				this.setState({photoURL: url});
			})
			.catch(e => {
				this.setState({photoURL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"})
			})
	}

	getUserLimit = _ => {
		let data = app.firestore()
			.collection("limits")
			.where("user_id", "==", app.auth().Qb.O)

		data.onSnapshot(limit => {
			let res = 0;
			let id = undefined;
			limit.forEach(doc => {
				res = doc.data().limit
				id = doc.id
			})
			this.setState({ limit: res });
			this.setState({ limit_id: id });
		})
	}

	// GET LAST 5
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

	// GET FROM PAST 7 DAYS
	getWeeklyExpenses = _ => {
		let pastWeek = Date.now() - 604800000;
		let spent = 0;
		let data = app.firestore()
			.collection("expenses")
			.where("created", ">", pastWeek)
			.where("user_id", "==", app.auth().Qb.O)

		data.onSnapshot(expenses => {
			let res = [];
			let spent = 0;
			expenses.forEach(doc => {
				res.push({...doc.data(), ...{id: doc.id}})
				spent += parseFloat(doc.data().amount)
			})
			this.setState({ expenses: res.sort((a, b) => a.created < b.created) });
			this.setState({ spent: spent })
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

	addUserLimit = limit => {
		this.state.db.collection("limits").add({
			limit: limit,
			user_id: this.state.user_id,
		})
	}

	deleteExpense = id => { this.state.db.collection("expenses").doc(id).delete() }

	state = {
		email: "test",
		user_id: undefined,
		db: undefined,
		expenses: [],
		limit: 0,
		limit_id: undefined,
		spent: 0,
		number: 0,
		photoURL: null,
		isGoogleUser: false,


		getUser: this.getUser,
		getExpenses: this.getExpenses,
		addExpense: this.addExpense,
		deleteExpense: this.deleteExpense,
		getUserLimit: this.getUserLimit,
		getWeeklyExpenses: this.getWeeklyExpenses,
		addUserLimit: this.addUserLimit,
		getImageFromStorage: this.getImageFromStorage,
	}


	render() {
		return (
			<Context.Provider value={
				{
					state: this.state,
					getUser: this.getUser,
					getExpenses: this.state.getExpenses,
					getUserLimit: this.state.getUserLimit,
					getWeeklyExpenses: this.state.getWeeklyExpenses,
					addUserLimit: this.state.addUserLimit,
					getImageFromStorage: this.getImageFromStorage,
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