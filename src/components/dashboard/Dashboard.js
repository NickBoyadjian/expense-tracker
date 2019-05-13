import React from 'react'

// Components
import List from '../list/List'
import Navbar from '../navbar/Navbar'

class Dashboard extends React.Component {
	constructor() {
		super()
		this.state = {
			dummyData: [
				{
					title: "Title",
					category: "category",
					amount: 25.0
				},
				{
					title: "Title",
					category: "category",
					amount: 25.0
				},
				{
					title: "Title",
					category: "category",
					amount: 25.0
				},
				{
					title: "Title",
					category: "category",
					amount: 25.0
				},
				{
					title: "Title",
					category: "category",
					amount: 25.0
				},
				{
					title: "Title",
					category: "category",
					amount: 25.0
				},
			]
		}
	}

	render() {
		return(
			<div className="App">
				<Navbar />
				<List purchases={this.state.dummyData}/>
				<List purchases={this.state.dummyData}/>
				<List purchases={this.state.dummyData}/>
			</div>
		)
	}
}

export default Dashboard;