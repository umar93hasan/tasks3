import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    default:
      return state;
  }
}

let empty_login = {
  email: "",
  pass: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

let empty_register = {
  name: "",
  email: "",
  pass: "",
};

function register(state = empty_register, action) {
  switch (action.type) {
    case 'UPDATE_REG_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_REG_FORM':
      return empty_register;
    default:
      return state;
  }
}

function tasks(state = [], action) {
  return state;
}

function users(state = [], action) {
  return state;
}

let empty_form = {
  user_id: "",
  title: "",
  description: "",
  time_taken: "0",
  completed: false
};

function form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_FORM':
      return empty_form;
    default:
      return state;
  }
}

function tasks(state = [], action) {
  switch (action.type) {
  case 'TASKS_LIST':
    return [...action.tasks];
  case 'ADD_TASK':
    return [action.task, ...state];
  /*case 'DEL_TASK':
    console.log("in del:"+state+": :"+action);
    let index = state.findIndex(function(tt){
     return tt.id == action.task;
    })
    console.log(index);
    let state1 = state;
    console.log(state1);
    if (index !== -1) state1.splice(index, 1);
    return state1*/
  default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USERS_LIST':
    return [...action.users];
  default:
    return state;
  }
}

function root_reducer(state0, action) {
  //console.log("reducer", action);
  // {tasks, users, form} is ES6 shorthand for
  // {tasks: tasks, users: users, form: form}
  let reducer = combineReducers({tasks, users, form, token, login, register});
  let state1 = reducer(state0, action);
  //console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
