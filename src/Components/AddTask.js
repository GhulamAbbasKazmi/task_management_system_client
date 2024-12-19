import React, { useState } from "react";
import styles from "./AddTask.module.scss";
import axios from "axios";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(""); // State for custom validation error messages

  const validateForm = () => {
    if (!title || !description || !status || !dueDate) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  const addItem = () => {
    setError(""); // Clear validation errors

    if (!validateForm()) {
      return; // If validation fails, stop execution
    }

    const userId = localStorage.getItem("token"); // Retrieve the token from local storage

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/tasks`, {
        title: title.trim(),
        description: description.trim(),
        status,
        dueDate: dueDate.trim(),
        userId,
      })
      .then((result) => {
        alert("Task added successfully!"); // Show success alert
        clearForm();
      })
      .catch((err) => {
        console.error(err);
        alert(
          err.response?.data?.message ||
            "An error occurred while adding the task." // Show error alert from API
        );
      });
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setStatus("");
    setDueDate("");
  };

  return (
    <main>
      <div className={styles["create-form"]}>
        {error && <div className={styles.error}>{error}</div>}

        <label htmlFor="task-title">Task Title</label>
        <input
          id="task-title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          rows={4}
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="task-status">Status</label>
        <select
          id="task-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <label htmlFor="task-due-date">Due Date</label>
        <input
          id="task-due-date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />

        <button onClick={addItem}>ADD TASK</button>
      </div>
    </main>
  );
};

export default AddTask;
