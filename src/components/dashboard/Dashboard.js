// imports
import React from 'react';
import app from '../../base';
import { Context } from '../../context';

// Components
import List from '../list/List';
import AddEntry from '../addEntry/AddEntry';
import Navbar from '../navbar/Navbar';
import LimitTracker from '../limitTracker/LimitTracker';

class Dashboard extends React.Component {

	componentWillMount = _ => { 
		this.context.getWeeklyExpenses();
		this.context.getUser();
	}


	render() {
		return(
			<div className="App">
				<Navbar />
				<h1 className="page-title">Dashboard</h1>
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
						<LimitTracker />
					</div>
				</div>
			</div>
		)
	}
}
Dashboard.contextType = Context

export default Dashboard;