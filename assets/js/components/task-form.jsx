
import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api'

function TaskForm(props) {
  function update(ev) {

    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    //console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    if(props.form.time_taken%15 != 0)
    {
      alert("Time can only be a multiple of 15");
    }else{
      api.submit_task(props.form);
      //clear(ev);
      //console.log(props.form);
    }
  }

  function edit(ev) {
    if(props.form.time_taken%15 != 0)
    {
      alert("Time can only be a multiple of 15");
    }else{
      api.update_task(props.form,props.id);
      //clear(ev);
      //console.log(props.form);
    }
  }

  function clear(ev) {
    //console.log(ev);
    props.dispatch({
      type: 'CLEAR_FORM'
    });
  }

  let heading = <h2>New Task</h2>;
  let addupdate = <Button onClick={submit} color="primary">Add Task</Button>;
  if (props.token!=null){
    if(props.id!=null){
        heading = <h2>Edit Task</h2>
        addupdate = <Button onClick={edit} color="primary">Update Task</Button>;
    }
    let users = _.map(props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.email}</option>);
    return <div style={ {padding: "4ex"} }>
      { heading }
      <FormGroup>
        <Label for="user_id">User*</Label>
        <Input type="select" name="user_id" value={props.form.user_id} onChange={update}>
          { users }
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="title">Title*</Label>
        <Input type="text" name="title" value={props.form.title} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description*</Label>
        <Input type="textarea" name="description" value={props.form.description} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Label for="time_taken">Time Taken*</Label>
        <Input type="number" name="time_taken" value={props.form.time_taken} min="0" step="15" onChange={update} />
      </FormGroup>
      <FormGroup>
        <Label for="completed">Completed*</Label>
          <Input type="select" name="completed" value={props.form.completed} onChange={update}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </Input>
      </FormGroup>
      { addupdate }
      <Button onClick={clear}>Clear</Button>
    </div>;
  }else{
    return <span></span>
  }

}

function state2props(state) {
  //console.log("rerender", state);
  return {
    form: state.form,
    users: state.users,
  };
}

// Export the result of a curried function call.
export default connect(state2props)(TaskForm);
