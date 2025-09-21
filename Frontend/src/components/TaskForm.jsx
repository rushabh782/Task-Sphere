import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assigneeName: "",
    assigneeEmail: "",
    dueDate: "",
    status: "Pending", // default status
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!task.title.trim()) {
      alert("Task title is required!");
      return;
    }

    addTask(task); // call parent function (TaskPage.jsx)

    // ✅ reset form after submission
    setTask({
      title: "",
      description: "",
      assigneeName: "",
      assigneeEmail: "",
      dueDate: "",
      status: "Pending",
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={task.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="assigneeName"
        placeholder="Assignee Name"
        value={task.assigneeName}
        onChange={handleChange}
      />
      <input
        type="email"
        name="assigneeEmail"
        placeholder="Assignee Email"
        value={task.assigneeEmail}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
      />

      {/* Status dropdown */}
      <select name="status" value={task.status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <button type="submit" className="btn">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
