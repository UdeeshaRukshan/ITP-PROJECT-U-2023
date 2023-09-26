import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // const fetchTasks = () => {
  //   axios
  //     .get("http://localhost:4042/api/gettask") // Adjust the URL to match your server
  //     .then((response) => setTasks(response.data))
  //     .catch((error) => console.error(error));
  // };

  const addTask = () => {
    axios
      .post(
        "http://localhost:4042/api/tasks" // Adjust the URL to match your server
      )
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTask("");
      })
      .catch((error) => console.error(error));
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:4042/api/tasksdelete/${id}`) // Adjust the URL to match your server
      .then(() => {
        const updatedTasks = tasks.filter((task) => task._id !== id);
        setTasks(updatedTasks);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <h1>Task List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
