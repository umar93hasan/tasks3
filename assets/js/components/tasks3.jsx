import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import { Router, Route, Link } from 'react-router-dom';
import history from './history';

import Nav from './nav';
import Feed from './feed';
import Users from './users';
import TaskForm from './task-form';
import RegisterForm from './reg-form';

export default function tasks3_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <Tasks3 />
    </Provider>,
    document.getElementById('root'),
  );
}

let Tasks3 = connect((state) => state)((props) => {
  return (
    <Router history={history}>
      <div>
        <Nav login={props.login} />
        <Route path="/" exact={true} render={() =>
          <div>
            <TaskForm users={props.users} token={props.token} />
            <Feed tasks={props.tasks} token={props.token} page="feed"/>
          </div>
        } />
        <Route path="/users" exact={true} render={() =>
          <Users users={props.users} token={props.token} />
        } />
        <Route path="/users/:user_id" render={({match}) =>
          <Feed tasks={_.filter(props.tasks, (tt) =>
            match.params.user_id == tt.user.id )
          } token={props.token} />
        } />
        <Route path="/task/:task_id" exact={true} render={({match}) =>
          <TaskForm users={props.users} token={props.token} id={match.params.task_id} />
        } />
        <Route path="/register" exact={true} render={() =>
          <RegisterForm />
        } />
      </div>
    </Router>
  );
});
