import React from 'react';

import './style.scss'

class AddEntry extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	title: '',
    	category: '',
    	amount: 0,
    };
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }
  handleCategoryChange(event) {
    this.setState({category: event.target.value});
  }

  handleAmountChange(event) {
    this.setState({amount: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

	render() {
		return(
			<div className="add-entry-container">
				 <form onSubmit={this.handleSubmit.bind(this)}>
	        <label>
	          <h1 className="add-header">Add New Expense:</h1>
	          <label class="label">Title</label>
	          <input 
	          	className="input is-rounded" 
	          	type="text" 
	          	placeholder="Title"
	          	onChange={this.handleTitleChange.bind(this)} 
	          	value={this.state.value}
	          />
	          <div className="columns">
							<div className="column">
		          	<label class="label">Amount</label>
			          <input 
			          	className="input is-rounded" 
			          	type="text" 
			          	placeholder="Title"
			          	onChange={this.handleAmountChange.bind(this)} 
			          	value={this.state.value}
			          />
	          	</div>
	          	<div className="column">
	          		<label className="label">Category</label>
		          	<div className="select">
								  <select>
								    <option>Housing</option>
								    <option>Transportation</option>
								    <option>Food</option>
								    <option>Utilities</option>
								    <option>Clothing</option>
								    <option>Medical</option>
								    <option>Insurance</option>
								    <option>Supplies</option>
								    <option>Personal</option>
								    <option>Debt</option>
								    <option>Education</option>
								    <option>Gifts</option>
								    <option>Entertainment</option>
								    <option>Other</option>
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

export default AddEntry;