import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./Pages/Registration";
import SignIn from "./Pages/SignIn";
import Task from "./Pages/Task/Task";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/home" element={<Task />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
