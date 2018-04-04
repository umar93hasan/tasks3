import store from './store';
import history from './components/history'

class TheServer {
  request_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          users: resp.data,
        });
      },
    });
  }

  submit_task(data) {
    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ task: data }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_TASK',
          task: resp.data,
        });
        alert("Task created");
        store.dispatch({
          type: 'CLEAR_FORM'
        });
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Make sure all fields are properly filled.");
      }
    });
  }

  update_task(data,task_id) {
    $.ajax("/api/v1/tasks/"+task_id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ id: task_id, task: data }),
      success: (resp) => {
        alert("Task updated");
        this.request_tasks();
        store.dispatch({
          type: 'CLEAR_FORM'
        });
        history.push('/');
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Make sure all fields are properly filled.");
      }
    });
  }

  delete_task(task_id) {
    $.ajax("/api/v1/tasks/"+task_id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        //console.log(resp);
        this.request_tasks();
        alert("Task deleted");
      },
    });
  }

  submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
        history.push('/');
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Incorrect credentials. Try again.");
      }
    });
  }

  register_user(data) {
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ user: data }),
      success: (resp) => {
        this.request_users();
        alert("User created");
        store.dispatch({
          type: 'CLEAR_REG_FORM'
        });
        history.push('/');
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Make sure all fields are properly filled or try a different email.");
      }
    });
  }
}

export default new TheServer();
