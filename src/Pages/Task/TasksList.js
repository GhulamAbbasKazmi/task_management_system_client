// import React, { useEffect, useState } from "react";
// import "../../App.css";
// import { BsFillTrashFill, BsPencil } from "react-icons/bs";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const TasksList = () => {
//   const [tasks, setTasks] = useState([]); // Local state for tasks
//   const [updatedTask, setUpdatedTask] = useState({
//     title: "",
//     description: "",
//     status: "pending",
//     dueDate: "",
//   });
//   const [editingId, setEditingId] = useState("");

//   const navigate = useNavigate();

//   const userId = localStorage.getItem("token"); // Retrieve the user ID from local storage

//   // Fetch tasks for the user
//   useEffect(() => {
//     if (userId) {
//       axios
//         .get(`${process.env.REACT_APP_BACKEND_URL}/tasks/${userId}`)
//         .then((result) => setTasks(result.data))
//         .catch((err) => console.log(err));
//     } else {
//       alert("User is not authenticated");
//       navigate("/");
//     }
//   }, [userId, navigate]);

//   // Update a task
//   const updateTask = (id, updatedData) => {
//     axios
//       .put(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`, {
//         ...updatedData,
//         userId,
//       })
//       .then(() => {
//         const updatedTasks = tasks.map((task) =>
//           task._id === id ? { ...task, ...updatedData } : task
//         );
//         setTasks(updatedTasks);
//         setEditingId("");
//         setUpdatedTask({ title: "", description: "", status: "pending", dueDate: "" });
//         alert("Task updated successfully!");
//       })
//       .catch((err) => console.log(err));
//   };

//   // Delete a task
//   const deleteTask = (id) => {
//     axios
//       .delete(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`, {
//         data: { userId },
//       })
//       .then(() => {
//         const updatedTasks = tasks.filter((task) => task._id !== id);
//         setTasks(updatedTasks);
//         alert("Task deleted successfully!");
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         width: "100%",
//         flexWrap: "wrap",
//         gap: "2rem",
//         maxWidth: "80%",
//         margin: "auto",
//       }}
//     >
//       {tasks.length === 0 ? (
//         <div className="task">No tasks found</div>
//       ) : (
//         <div style={{ width: "100%" }}>
//           {tasks.map((task) => (
//             <div className="task" key={task._id}>
//               <div className="task-details">
//                 {editingId === task._id ? (
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "1rem",
//                     }}
//                   >
//                     <label>
//                       <strong>Title:</strong>
//                       <input
//                         type="text"
//                         placeholder="Title"
//                         value={updatedTask.title}
//                         onChange={(e) =>
//                           setUpdatedTask({
//                             ...updatedTask,
//                             title: e.target.value,
//                           })
//                         }
//                         style={{
//                           padding: "0.5rem",
//                           fontSize: "1rem",
//                           borderRadius: "4px",
//                           border: "1px solid #ccc",
//                           width: "100%",
//                         }}
//                       />
//                     </label>
//                     <label>
//                       <strong>Description:</strong>
//                       <textarea
//                         rows={4}
//                         placeholder="Description"
//                         value={updatedTask.description}
//                         onChange={(e) =>
//                           setUpdatedTask({
//                             ...updatedTask,
//                             description: e.target.value,
//                           })
//                         }
//                         style={{
//                           padding: "0.5rem",
//                           fontSize: "1rem",
//                           borderRadius: "4px",
//                           border: "1px solid #ccc",
//                           width: "100%",
//                         }}
//                       />
//                     </label>
//                     <label>
//                       <strong>Status:</strong>
//                       <select
//                         value={updatedTask.status}
//                         onChange={(e) =>
//                           setUpdatedTask({
//                             ...updatedTask,
//                             status: e.target.value,
//                           })
//                         }
//                         style={{
//                           padding: "0.5rem",
//                           fontSize: "1rem",
//                           borderRadius: "4px",
//                           border: "1px solid #ccc",
//                           width: "100%",
//                         }}
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="in-progress">In Progress</option>
//                         <option value="completed">Completed</option>
//                       </select>
//                     </label>
//                     <label>
//                       <strong>Due Date:</strong>
//                       <input
//                         type="date"
//                         value={updatedTask.dueDate}
//                         onChange={(e) =>
//                           setUpdatedTask({
//                             ...updatedTask,
//                             dueDate: e.target.value,
//                           })
//                         }
//                         style={{
//                           padding: "0.5rem",
//                           fontSize: "1rem",
//                           borderRadius: "4px",
//                           border: "1px solid #ccc",
//                           width: "100%",
//                         }}
//                       />
//                     </label>
//                   </div>
//                 ) : (
//                   <>
//                     <p>
//                       <strong>Title:</strong> {task.title}
//                     </p>
//                     <p>
//                       <strong>Description:</strong> {task.description}
//                     </p>
//                     <p>
//                       <strong>Status:</strong> {task.status}
//                     </p>
//                     <p>
//                       <strong>Due Date:</strong>{" "}
//                       {new Date(task.dueDate).toLocaleDateString()}
//                     </p>
//                   </>
//                 )}
//               </div>

//               <div>
//                 <span>
//                   <BsPencil
//                     className="icon"
//                     onClick={() => {
//                       if (editingId === task._id) {
//                         updateTask(task._id, updatedTask);
//                       } else {
//                         setEditingId(task._id);
//                         setUpdatedTask({
//                           title: task.title,
//                           description: task.description,
//                           status: task.status,
//                           dueDate: task.dueDate.slice(0, 10), // Format date for input
//                         });
//                       }
//                     }}
//                   />
//                   <BsFillTrashFill
//                     className="icon"
//                     onClick={() => deleteTask(task._id)}
//                   />
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TasksList;






// src/components/TasksList.js
import React, { useEffect, useState } from "react";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setTasks, deleteTask, updateTask } from "../../Redux/slice/taskSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TaskFilters from "../../Components/TaskFilters"; // Import the TaskFilters component

const TasksList = () => {
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
  });
  const [editingId, setEditingId] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = localStorage.getItem("token");

  const { tasks, filters } = useSelector((state) => state.tasks);

  // Fetch tasks for the user
  useEffect(() => {
    if (userId) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/tasks/${userId}`)
        .then((result) => dispatch(setTasks(result.data)))
        .catch((err) => console.log(err));
    } else {
      alert("User is not authenticated");
      navigate("/");
    }
  }, [userId, navigate, dispatch]);

  // Apply filters to tasks
  const filteredTasks = tasks.filter((task) => {
    let isMatch = true;
    
    if (filters.status !== "all" && task.status !== filters.status) {
      isMatch = false;
    }

    if (filters.dueDate && task.dueDate.slice(0, 10) !== filters.dueDate) {
      isMatch = false;
    }

    return isMatch;
  });

  // Update a task
  const handleUpdateTask = (id, updatedData) => {
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`, {
        ...updatedData,
        userId,
      })
      .then(() => {
        dispatch(updateTask({ id, updatedTask: updatedData }));
        setEditingId("");
        setUpdatedTask({ title: "", description: "", status: "pending", dueDate: "" });
        alert("Task updated successfully!");
      })
      .catch((err) => console.log(err));
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`, { data: { userId } })
      .then(() => {
        dispatch(deleteTask(id));
        alert("Task deleted successfully!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ display: "flex", width: "100%", flexWrap: "wrap", gap: "2rem", maxWidth: "80%", margin: "auto" }}>
      <TaskFilters /> {/* Add filter UI */}
      {filteredTasks.length === 0 ? (
        <div>No tasks found</div>
      ) : (
        <div style={{ width: "100%" }}>
          {filteredTasks.map((task) => (
            <div className="task" key={task._id}>
              <div className="task-details">
                {editingId === task._id ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <label>
                      <strong>Title:</strong>
                      <input
                        type="text"
                        placeholder="Title"
                        value={updatedTask.title}
                        onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
                        style={{
                          padding: "0.5rem",
                          fontSize: "1rem",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                          width: "100%",
                        }}
                      />
                    </label>
                    <label>
                      <strong>Description:</strong>
                      <textarea
                        rows={4}
                        placeholder="Description"
                        value={updatedTask.description}
                        onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
                        style={{
                          padding: "0.5rem",
                          fontSize: "1rem",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                          width: "100%",
                        }}
                      />
                    </label>
                    <label>
                      <strong>Status:</strong>
                      <select
                        value={updatedTask.status}
                        onChange={(e) => setUpdatedTask({ ...updatedTask, status: e.target.value })}
                        style={{
                          padding: "0.5rem",
                          fontSize: "1rem",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                          width: "100%",
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </label>
                    <label>
                      <strong>Due Date:</strong>
                      <input
                        type="date"
                        value={updatedTask.dueDate}
                        onChange={(e) => setUpdatedTask({ ...updatedTask, dueDate: e.target.value })}
                        style={{
                          padding: "0.5rem",
                          fontSize: "1rem",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                          width: "100%",
                        }}
                      />
                    </label>
                  </div>
                ) : (
                  <>
                    <p><strong>Title:</strong> {task.title}</p>
                    <p><strong>Description:</strong> {task.description}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                    <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                  </>
                )}
              </div>

              <div>
                <span>
                  <BsPencil
                    className="icon"
                    onClick={() => {
                      if (editingId === task._id) {
                        handleUpdateTask(task._id, updatedTask);
                      } else {
                        setEditingId(task._id);
                        setUpdatedTask({
                          title: task.title,
                          description: task.description,
                          status: task.status,
                          dueDate: task.dueDate.slice(0, 10),
                        });
                      }
                    }}
                  />
                  <BsFillTrashFill
                    className="icon"
                    onClick={() => handleDeleteTask(task._id)}
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksList;
