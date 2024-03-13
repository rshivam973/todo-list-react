import logo from "./logo.svg";
import "./App.css";
import ToDoComponent from "./components/ToDoComponent";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedSortPriority, setSelectedSortPriority] = useState('');

  useEffect(() => {
    // Sort todos by priority when the component mounts
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
    sortTodosByPriority();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.log(error);
    }
  }, [todos]);

  const deleteCompletedTodos = () => {
    let filteredTodos = todos.filter((todo) => !todo.completed);
    setTodos(filteredTodos);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== "" && selectedPriority !== "") {
      const newTodo = {
        id: Date.now(),
        content: inputText,
        completed: false,
        priority: selectedPriority,
      };
  
      setTodos([...todos, newTodo]);
      setInputText("");
      setSelectedPriority("");
    }
  };

  const onDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    console.log("Deleted");
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    console.log("Clicked");
  };

  const handlePriorityChange = (id, newPriority) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, priority: newPriority } : todo
      )
    );
  };

  const sortTodosByPriority = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      const priorityValues = { High: 3, Medium: 2, Low: 1 };
      return priorityValues[b.priority] - priorityValues[a.priority];
    });

    setTodos(sortedTodos);
  };

  return (
    <div className="App">
      <h1 className="">My To-do list</h1>

      {/* add a todo */}
      <div className="pb-2" style={{ width: "70%" }}>
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-row align-items-center">
              <input
                type="text"
                className="form-control form-control-lg"
                id="exampleFormControlInput1"
                placeholder="Add new..."
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                }}
              />
              <select
          className="form-select form-select-lg"
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          style={{width:'20%'}}
        >
          <option value="" disabled>
            Select Priority
          </option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
              <div>
                <button
                  type="button"
                  className="btn btn-primary ms-2"
                  onClick={handleAddTodo}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-4" style={{ color: "black", width: "10px" }} />

      {/* delete todos button */}
      {todos.length != 0 && (
        <div style={{width:'70%', display:'flex',alignItems:'self-end', justifyContent:'end', marginBottom:'20px' }}>
        <button
          type="button"
          className="btn btn-danger mt-3"
          onClick={deleteCompletedTodos}
        >
          Delete Completed Todos
        </button>
        </div>
      )}

      {/* Priority selection and sorting */}
      {todos.length!=0 && (
        <div style={{width:'70%', display:'flex',alignItems:'self-end', justifyContent:'end', marginBottom:'10px'}}>
      <div className="mt-3" >
        <select
          id="prioritySelect"
          className="form-select form-select-sm"
          value={selectedSortPriority}
          onChange={(e) => setSelectedSortPriority(e.target.value)}
        >
          <option value="" disabled>
            Select Priority
          </option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      </div>
      )}

      {/* todo list */}
      {todos.map((todo) => (
        <ToDoComponent
          key={todo.id}
          todo={todo}
          onToggle={handleToggleTodo}
          onDelete={onDelete}
          onPriorityChange={handlePriorityChange}
        />
      ))}
    </div>
  );
}

export default App;
