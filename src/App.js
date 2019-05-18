import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import app from './base';
import { Provider } from './context';

import Dashboard from './components/dashboard/Dashboard';
import SignUp from './components/signup/SignUp';
import SignIn from './components/signin/SignIn';
import Settings from './components/settings/Settings';

import './index.scss';

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

    if (this.state.loading) {
      return <p>Loading..</p>;
    }

    return (
      <Router>
        <div>

          <Provider>
            <PrivateRoute exact path="/" authenticated={this.state.authenticated} component={Dashboard} />
            <PrivateRoute exact path="/settings" authenticated={this.state.authenticated} component={Settings} />
          </Provider>

          <Route exact path="/login" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          
        </div>
      </Router>
    );
  }
}

export default App;