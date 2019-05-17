import React from 'react';
import app from '../../base';
import { Context } from '../../context';

import './style.scss'

class AddEntry extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	title: "",
    	category: "Entertainment",
    	amount: 0,
    };
  }

  handleTitleChange = e => { this.setState({title: e.target.value}) }
  handleCategoryChange = e => { this.setState({category: e.target.value}) }
  handleAmountChange = e => { this.setState({amount: e.target.value}) }

  handleSubmit = e => { 
  	e.preventDefault();
  	this.context.state.addExpense(this.state.title, this.state.amount, this.state.category)
  }

	render() {
		return(
			<div className="add-entry-container material">
				 <form onSubmit={this.handleSubmit.bind(this)}>
	        <label>
	          <h1 className="add-header">Add New Expense</h1>
	          <label className="label">Title</label>
	          <input 
	          	className="input" 
	          	type="text" 
	          	placeholder="Title"
	          	onChange={this.handleTitleChange.bind(this)} 
	          	value={this.state.value}
	          />
	          <div className="columns">
							<div className="column">
		          	<label className="label">Amount</label>
			          <input 
			          	className="input" 
			          	type="number" 
			          	placeholder="Amount"
			          	onChange={this.handleAmountChange.bind(this)} 
			          	value={this.state.value}
			          />
	          	</div>
	          	<div className="column">
	          		<label className="label">Category</label>
		          	<div className="select">
								  <select value={this.state.category} onChange={this.handleCategoryChange.bind(this)}>
								    <option value="Entertainment">Entertainment</option>
								    <option value="Housing">Housing</option>
								    <option value="Transportation">Transportation</option>
								    <option value="Food">Food</option>
								    <option value="Utilities">Utilities</option>
								    <option value="Clothing">Clothing</option>
								    <option value="Medical">Medical</option>
								    <option value="Insurance">Insurance</option>
								    <option value="Supplies">Supplies</option>
								    <option value="Personal">Personal</option>
								    <option value="Debt">Debt</option>
								    <option value="Education">Education</option>
								    <option value="Gifts">Gifts</option>
								    <option value="Other">Other</option>
								  </select>
								</div>
	          	</div>
	          </div>
	        </label>
	        <input className="button submit-btn" type="submit" value="Submit" />
	      </form>
			</div>
		)
	}
}
AddEntry.contextType = Context

export default AddEntry;