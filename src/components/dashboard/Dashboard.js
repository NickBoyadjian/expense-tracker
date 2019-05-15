// imports
import React from 'react';
import app from '../../base';

// Components
import List from '../list/List';
import AddEntry from '../addEntry/AddEntry';
import Navbar from '../navbar/Navbar';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	user_id: undefined,
    	db: undefined,
      data: []
    };
	}

	getData = _ => {
		const data = this.state.db
			.collection("expenses")
			.where("user_id", "==", this.state.user_id)
			.limit(5)

		data.onSnapshot(expenses => {
			let res = []
			expenses.forEach(doc => {
				res.push({...doc.data(), ...{id: doc.id}})
			})
			this.setState({data: this.orderData(res)})
		})
	}

	orderData = list => list.sort((a, b) => a.created < b.created)

	componentDidMount = async _ => { 
		await this.setState({user_id: app.auth().Qb.O})
		await this.setState({db: app.firestore()}) 
		this.getData();
	}

	render() {
		return(
			<div className="App">
				<Navbar />
				<div className="columns">
					<div className="column is-two-thirds">
						<AddEntry user_id={this.state.user_id} db={this.state.db} />
						<List purchases={this.state.data} db={this.state.db} />
					</div>
					<div className="column">
						<div className="material"></div>
					</div>
				</div>
			</div>
		)
	}
}

export default Dashboard;