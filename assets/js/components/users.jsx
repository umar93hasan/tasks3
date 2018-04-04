import React from 'react';
import { Link } from 'react-router-dom';

function User(params) {
  return <p>{params.user.name} - <Link to={"/users/" + params.user.id}>tasks</Link></p>;
}

export default function Users(params) {
  if(params.token!=null){
    let users = _.map(params.users, (uu) => <User key={uu.id} user={uu} />);
    return <div>
      { users }
    </div>;
  }else{
    return <div style={ {padding: "4ex"} }>
      Logged out, login to continue.
    </div>
  }
}
