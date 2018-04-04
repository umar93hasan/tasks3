defmodule Tasks3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completed, :boolean, default: false
    field :description, :string
    field :time_taken, :integer
    field :title, :string
    #field :user_id, :id

    belongs_to :user, Tasks3.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :time_taken, :completed, :user_id])
    |> validate_required([:title, :description, :time_taken, :completed])
    |> assoc_constraint(:user)
  end
end
