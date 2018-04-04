import React from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import { withRouter } from "react-router-dom";
import api from '../api'
import history from './history';
import store from '../store';


export default function Task(params) {
  let task = params.task;
  let completed;
  if(task.completed)
    completed = "Yes"
  else
    completed = "No"

  let myButtons = <span></span>;
  if(params.token!=null && task.user.id == params.token.user_id){
    myButtons = <div className="col">
      <p><Button name={task.id} onClick={edit} color="blue">Edit</Button></p>
      <p><Button name={task.id} onClick={remove} color="danger">Delete</Button></p>
    </div>;
  }

  function remove(ev){
    if(confirm("Are you sure you want to delete this task?")){
      let tgt = $(ev.target);
      let task_id = tgt.attr('name');
      api.delete_task(task_id);
    }
  }

  function edit(ev){
    let tgt = $(ev.target);
    let task_id = tgt.attr('name');
    //console.log("on edit: ");
    //console.log(task);
    let data = {
      user_id: task.user.id,
      title: task.title,
      description: task.description,
      time_taken: task.time_taken,
      completed: task.completed
    }
    //let data = task;
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    store.dispatch(action);
    history.push('/task/'+task_id);
    //console.log(data);
  }

  return <Card>
    <CardBody>
      <div>
        <div className="row">
          <div className="col">
            <p>Assigned to <b>{ task.user.name }</b></p>
            <p>Title: { task.title }</p>
            <p>Description: { task.description }</p>
            <p>Time Spent: { task.time_taken } mins</p>
            <p>Completed: { completed }</p>
          </div>
          { myButtons }
        </div>
      </div>
    </CardBody>
  </Card>;
}
