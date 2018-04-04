import React from 'react';
import Task from './task';

export default function Feed(params) {
  //console.log("in feed:"+params.token);
  if(params.token!=null){
    let filtered_tasks = params.tasks;
    let heading = <h2>Selected Users Tasks</h2>;
    if(params.page=="feed"){
      heading = <h2>My Tasks</h2>;
      filtered_tasks = _.filter(params.tasks, (tt) =>
        params.token.user_id == tt.user.id )
    }
    let tasks = _.map(filtered_tasks, (tt) => <Task key={tt.id} task={tt} token={params.token} />);
    return <div>
      { heading }
      { tasks }
    </div>;
  }else{
    return <div style={ {padding: "4ex"} }>
      Logged out, login to continue.
    </div>
  }
}
