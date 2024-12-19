import React, { useState } from "react";
import AddTask from "../../Components/AddTask";
import TasksList from "./TasksList";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const Task = () => {
  const [activeTab, setActiveTab] = useState("add"); // State to track active tab
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <main style={{ width: "100%" }}>
      {/* Navigation Bar */}
      <nav
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <button
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            background: activeTab === "add" ? "#007bff" : "#ccc",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={() => setActiveTab("add")}
        >
          Add New Task
        </button>
        <button
          style={{
            padding: "10px 20px",
            background: activeTab === "list" ? "#007bff" : "#ccc",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={() => setActiveTab("list")}
        >
          Tasks List
        </button>
      </nav>

      {/* View Rendering */}

      {activeTab === "add" && <AddTask />}
      {activeTab === "list" && <TasksList />}

      {/* Logout Button */}
      <div style={{ position: "fixed", right: 30, bottom: 30 }}>
        <button onClick={logoutUser}>Logout</button>
      </div>
    </main>
  );
};

export default Task;
