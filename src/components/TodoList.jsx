import { useState, useEffect } from "react";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Charger les tâches au démarrage
  useEffect(() => {
    fetch("https://6752d6c3f3754fcea7b9c905.mockapi.io/todolist")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTodo.trim() === "") return;

    const newTask = {
      text: newTodo,
    };

    fetch("https://6752d6c3f3754fcea7b9c905.mockapi.io/todolist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, data]); // Utilise la tâche renvoyée par l'API (avec son id généré)
      });

    setNewTodo("");
  };

  const handleDelete = (id) => {
    // Supprimer la tâche via l'API
    fetch(`https://6752d6c3f3754fcea7b9c905.mockapi.io/todolist/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  const handleEdit = (id, text) => {
    setEditingTodoId(id);
    setEditingText(text);
  };

  const handleEditSubmit = (e, id) => {
    e.preventDefault();

    // Modifier la tâche via l'API
    fetch(`https://6752d6c3f3754fcea7b9c905.mockapi.io/todolist/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, text: editingText }),
    })
      .then(() => {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, text: editingText } : todo
        );
        setTodos(updatedTodos);
        setEditingTodoId(null);
        setEditingText("");
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  return (
    <div className="container todos">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="todoField"
          type="text"
          value={newTodo}
          placeholder="Add a new todo..."
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn" type="submit">
          Add
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li className="todo" key={todo.id}>
            {editingTodoId === todo.id ? (
              <form onSubmit={(e) => handleEditSubmit(e, todo.id)}>
                <input
                  className="todoField"
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button className="btn" type="submit">
                  Save
                </button>
              </form>
            ) : (
              <>
                {todo.text}
                <button onClick={() => handleEdit(todo.id, todo.text)}>
                  ✏️
                </button>
                <button onClick={() => handleDelete(todo.id)}>❌</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
