# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Tasks3.Repo.insert!(%Tasks3.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seeds do
  alias Tasks3.Repo
  alias Tasks3.Users.User
  alias Tasks3.Tasks.Task

  def run do
    p = Comeonin.Argon2.hashpwsalt("password1")
    Repo.delete_all(User)
    a = Repo.insert!(%User{ name: "alice", email: "alice@gmail.com", password_hash: p })
    b = Repo.insert!(%User{ name: "bob", email: "bob@gmail.com", password_hash: p })
    c = Repo.insert!(%User{ name: "carol", email: "carol@gmail.com", password_hash: p })
    d = Repo.insert!(%User{ name: "dave", email: "dave@gmail.com", password_hash: p })

    Repo.delete_all(Task)
    Repo.insert!(%Task{ user_id: a.id, description: "Hi, I'm Alice", title: "Task1", time_taken: 45, completed: true })
    Repo.insert!(%Task{ user_id: b.id, description: "Hi, I'm Bob", title: "Task2", time_taken: 60, completed: false })
    Repo.insert!(%Task{ user_id: b.id, description: "Hi, I'm Bob Again", title: "Task3", time_taken: 0, completed: true })
    Repo.insert!(%Task{ user_id: c.id, description: "Hi, I'm Carol", title: "Task4", time_taken: 30, completed: false })
    Repo.insert!(%Task{ user_id: d.id, description: "Hi, I'm Dave", title: "Task5", time_taken: 90, completed: false })
  end
end

Seeds.run
