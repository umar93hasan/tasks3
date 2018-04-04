defmodule Tasks3Web.TaskController do
  use Tasks3Web, :controller

  alias Tasks3.Tasks
  alias Tasks3.Tasks.Task

  action_fallback Tasks3Web.FallbackController

  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params}) do
    {t,""}=Integer.parse(task_params["time_taken"])
    if(rem(t,15) != 0) do
      IO.inspect "error"
      render(conn,"show.json",task: "error")
    end
    with {:ok, %Task{} = task} <- Tasks.create_task(task_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", task_path(conn, :show, task))
      |> render("show.json", task: task)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Tasks.get_task!(id)
    {t,""}=Integer.parse(task_params["time_taken"])
    if(rem(t,15) != 0) do
      IO.inspect "error"
      render(conn,"show.json",task: "error")
    end
    with {:ok, %Task{} = task} <- Tasks.update_task(task, task_params) do
      render(conn, "show.json", task: task)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    with {:ok, %Task{}} <- Tasks.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end
end
