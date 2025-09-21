import React, { useState } from "react";

function TaskList({ tasks, updateTask, deleteTask }) {
  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const [filterStatus, setFilterStatus] = useState("All");
  const [dueDateOrder, setDueDateOrder] = useState("asc");

  const exportPDF = () => {
    window.open("http://localhost:8080/api/tasks/export/pdf", "_blank");
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditedTask({ ...task });
  };

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    if (!editedTask.title.trim()) {
      alert("Task title cannot be empty!");
      return;
    }
    updateTask(editingId, editedTask);
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedTask({});
  };

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => filterStatus === "All" || task.status === filterStatus)
    .sort((a, b) => {
      if (dueDateOrder === "asc") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else {
        return new Date(b.dueDate) - new Date(a.dueDate);
      }
    });

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>All Tasks</h2>
        <div className="task-controls">
          <label>
            Status Filter:
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>

          <label>
            Sort by Due Date:
            <select
              value={dueDateOrder}
              onChange={(e) => setDueDateOrder(e.target.value)}
            >
              <option value="asc">Earliest First</option>
              <option value="desc">Latest First</option>
            </select>
          </label>

          <button className="btn export" onClick={exportPDF}>
            📄 Export as PDF
          </button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="no-tasks">No tasks found.</p>
      ) : (
        filteredTasks.map((task) => (
          <div className="task-card" key={task.id}>
            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={editedTask.title}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="description"
                  value={editedTask.description}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="assigneeName"
                  value={editedTask.assigneeName}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="assigneeEmail"
                  value={editedTask.assigneeEmail}
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="dueDate"
                  value={editedTask.dueDate}
                  onChange={handleChange}
                />
                <select
                  name="status"
                  value={editedTask.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <div className="edit-buttons">
                  <button className="btn" onClick={saveEdit}>
                    Save
                  </button>
                  <button className="btn delete" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
                <p>
                  <b>Assignee:</b> {task.assigneeName || "N/A"} (
                  {task.assigneeEmail || "N/A"})
                </p>
                <p>
                  <b>Due:</b>{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "Not set"}
                </p>
                <p>
                  <b>Status:</b> {task.status}
                </p>
                <div className="card-buttons">
                  <button className="btn" onClick={() => startEdit(task)}>
                    Edit
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
