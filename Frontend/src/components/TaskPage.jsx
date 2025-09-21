import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function TaskPage({ user, setUser }) {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    checkSession(); // ✅ verify if already logged in
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkSession = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/auth/me", {
        withCredentials: true,
      });
      setUser(res.data);
      fetchTasks();
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setUser(null);
    }
  };

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:8080/api/tasks", {
      withCredentials: true,
    });
    setTasks(res.data);
  };

  const addTask = async (task) => {
    const res = await axios.post("http://localhost:8080/api/tasks", task, {
      withCredentials: true,
    });
    setTasks([...tasks, res.data]);
  };

  const updateTask = async (id, updatedTask) => {
    const res = await axios.put(
      `http://localhost:8080/api/tasks/${id}`,
      updatedTask,
      { withCredentials: true }
    );
    setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8080/api/tasks/${id}`, {
      withCredentials: true,
    });
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    const term = searchTerm.toLowerCase();
    return (
      task.title.toLowerCase().includes(term) ||
      task.assigneeName.toLowerCase().includes(term) ||
      task.dueDate.includes(term) ||
      task.status.toLowerCase().includes(term)
    );
  });

  if (!user) {
    return (
      <div className="app-container">
        <h2>You are not logged in</h2>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      {/* 🌙 Dark Mode Toggle */}
      <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* ✅ Task Manager Section */}
      <main className="main-content">
        <h1 className="heading">Task Manager</h1>

        {/* 🔎 Search */}
        <input
          type="text"
          placeholder="Search by Title, Assignee, Date, or Status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <TaskForm addTask={addTask} />
        <TaskList
          tasks={filteredTasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </main>
    </div>
  );
}

export default TaskPage;
