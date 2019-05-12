import React from 'react';

import List from './components/list/List'
import AddEntry from './components/addEntry/AddEntry'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      purchases: [
        {
          id: 1,
          title: "Movie Tickets",
          amount: 25.0,
          catagory: "Leasure"
        },
        {
          id: 2,
          title: "Lunch",
          amount: 25.0,
          catagory: "Food"
        },
        {
          id: 3,
          title: "Gas",
          amount: 25.0,
          catagory: "Necesities"
        },
        {
          id: 4,
          title: "Movie Tickets",
          amount: 25.0,
          catagory: "Leasure"
        },
        {
          id: 5,
          title: "Lunch",
          amount: 25.0,
          catagory: "Food"
        },
        {
          id: 6,
          title: "Gas",
          amount: 25.0,
          catagory: "Necesities"
        },
      ],

    };
    //this.handleClick = this.handleClick.bind(this);
   }


  render() {
    return (
      <div className="App">
        <h1 className="title">Expense Tracker</h1>
        <div className="columns">
          <div className="column is-two-thirds">
            <AddEntry />
            <List purchases={this.state.purchases}/>
          </div>
          <div className="column">
            <List purchases={this.state.purchases}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
