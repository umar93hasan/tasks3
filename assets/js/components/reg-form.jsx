
import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api'

function RegisterForm(props) {

  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_REG_FORM',
      data: data,
    };
    //console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    api.register_user(props.register);
    //clear(ev);
    //console.log(props.register);
  }

  return <div style={ {padding: "4ex"} }>
    <h2>New User Registration</h2>
    <FormGroup>
      <Label for="email">Email</Label>
      <Input type="text" name="email" value={props.register.email} onChange={update}  />
    </FormGroup>
    <FormGroup>
      <Label for="name">Name</Label>
      <Input type="text" name="name" value={props.register.name} onChange={update}  />
    </FormGroup>
    <FormGroup>
      <Label for="pass">Password</Label>
      <Input type="password" name="pass" value={props.register.pass} onChange={update} />
    </FormGroup>
    <Button onClick={submit} color="primary">Register</Button>
  </div>;

}

function state2props(state) {
  //console.log("regrerender", state);
  return {
    form: state.form,
    users: state.users,
    register: state.register
  };
}

export default connect(state2props)(RegisterForm);
