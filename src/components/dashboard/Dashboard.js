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
      data: []
    };
	}

	getData = _ => {
		const user_id = app.auth().Qb.O
		const db = app.firestore();
		const data = db.collection("expenses").where("user_id", "==", user_id)

		data.get()
			.then(expenses => {
				let res = []
				expenses.forEach(doc => {
					res.push(doc.data())
				})
				this.setState({data: res})
			})
	}

	componentDidMount = _ => {
		this.getData()
	}

	render() {
		return(
			<div className="App">
				<Navbar />
				<div className="columns">
					<div className="column is-two-thirds">
						<AddEntry />
						<List purchases={this.state.data}/>
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