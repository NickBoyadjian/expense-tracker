// imports
import React from 'react';
import app from '../../base';
import { Context } from '../../context';

// Components
import List from '../list/List';
import AddEntry from '../addEntry/AddEntry';
import Navbar from '../navbar/Navbar';

class Dashboard extends React.Component {

	componentWillMount = _ => { 
		this.context.getExpenses()
		this.context.getUser()
	}

	render() {
		return(
			<div className="App">
				<Navbar />
				<div className="columns">
					<div className="column is-two-thirds">
						<Context.Consumer>
							{(ctx) => (
								<div>
									<AddEntry />
									<List />
								</div>

							)}
						</Context.Consumer>
					</div>
					<div className="column">
						<div className="material"></div>
					</div>
				</div>
			</div>
		)
	}
}
Dashboard.contextType = Context

export default Dashboard;