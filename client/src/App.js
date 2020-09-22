import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { connect } from 'react-redux';

import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Dashboard from './containers/Dashboard/Dashboard';
import HomePage from './containers/HomePage/HomePage';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    // let routes = (
    //   <Switch>
    //     <Route path="/home" component={HomePage}></Route>
    //     <Route path="/auth" component={Auth}></Route>
    //     <Redirect exact from="/" to="/home" ></Redirect>
    //   </Switch>
    // );

    // if (this.props.isAuthenticated) {
    //   routes = (
    //     <Switch>
    //       <Route path="/home" component={HomePage}></Route>
    //       <Route path="/dashboard" component={Dashboard}></Route>
    //       <Route path="/logout" component={Logout}></Route>
    //       <Redirect exact from="/" to="/home" ></Redirect>
    //     </Switch>
    //   );
    // }

    return (
      <div>
      <Layout>
        <Switch>
          <Route path="/home" component={HomePage}></Route>
          <Route path="/auth" component={Auth}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Redirect exact from="/" to="/home" ></Redirect>
          <Route render={() => <h1>"Not Found"</h1>}></Route>
        </Switch>
      </Layout>
    </div >
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

// const mapStateToProps = state => {
//   return {
//       isAuthenticated: state.auth.token !== null
//   }
// }

export default connect(null, mapDispatchToProps)(App);
