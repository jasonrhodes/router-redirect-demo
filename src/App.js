import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
  withRouter
} from 'react-router-dom'

const Target = () => <h1>Yay you redirected!</h1>;
const ShouldRedirect = () => <h1>{`Oops you didn't redirect :(`}</h1>;
  
class _AuthReduxWrapper extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'LOGIN'
    });
  }
  
  componentWillUpdate(newProps) {
    console.log('new props in CWU:', newProps);
    if (!this.props.auth.loggedIn && newProps.auth.loggedIn) {
      console.log('pushing to redirect');
      this.props.history.push('/target');
    }
  }
  
  render() {
    return <div>{this.props.children}</div>;
  }
}
const AuthReduxWrapper = connect(({ auth }) => ({ auth }))(withRouter(_AuthReduxWrapper));


class _AuthStateWrapper extends Component {
  state = {
    auth: {
      loggedIn: false
    }
  };
  
  componentDidMount() {
    this.setState({ auth: { loggedIn: true }});
  }
  
  componentWillUpdate(newProps, newState) {
    console.log('new state in CWU:', newState);
    if (!this.state.auth.loggedIn && newState.auth.loggedIn) {
      console.log('pushing to redirect');
      this.props.history.push('/target');
    }
  }
  
  render() {
    return <div>{this.props.children}</div>;
  }
}
const AuthStateWrapper = withRouter(_AuthStateWrapper);


export class ReduxApp extends Component {
  render() {
    return (
      <Router>
        <AuthReduxWrapper>
          <Route path="/should-redirect" component={ShouldRedirect} />
          <Route path="/target" component={Target} />
        </AuthReduxWrapper>
      </Router>
    );
  }
}

export class App extends Component {
  render() {
    return (
      <Router>
        <AuthStateWrapper>
          <Route path="/should-redirect" component={ShouldRedirect} />
          <Route path="/target" component={Target} />
        </AuthStateWrapper>
      </Router>
    );
  }
}
