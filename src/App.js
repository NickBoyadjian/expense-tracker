import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'
import app from './base'

import AddEntry from './components/addEntry/AddEntry'
import SignUp from './components/signup/SignUp'

import './index.scss'

class App extends React.Component {
  state = { 
    loading: true, 
    authenticated: false, 
    user: null 
  };

  componentWillMount() {
  app.auth().onAuthStateChanged(user => {
    if (user) {
      this.setState({
        authenticated: true,
        currentUser: user,
        loading: false
      });
      console.log(this.state)
    } else {
      this.setState({
        authenticated: false,
        currentUser: null,
        loading: false
      });
    }
  });
}

  render() {
    const { authenticated, loading } = this.state;

    if (loading) {
      return <p>Loading..</p>;
    }

    return (
      <Router>
        <div>
          <PrivateRoute
            exact
            path="/"
            component={AddEntry}
            authenticated={authenticated}
          />
          <Route exact path="/login" component={SignUp} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    );
  }
}

export default App;