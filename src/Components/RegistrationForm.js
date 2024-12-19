import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./RegistrationForm.scss"; // Import the SCSS file
import { Link, useNavigate } from "react-router-dom";

function RegistrationForm({ status }) {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      if (status === "Registration") {
        // Register the user
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/users/register`,
          values
        );
        console.log("Registration successful:", response.data);
        alert("Registration successful");
        navigate("/");
      } else {
        // Login the user
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          values
        );
        navigate("/home");
        // Optionally, handle the token here if you want to store it for authentication
        localStorage.setItem("token", response.data.userId);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.message : error.message
      );
      alert(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );
    }
  };

  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <h2>{status === "Registration" ? "Register" : "Login"}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="field">
            <label htmlFor="email">Email:</label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="field">
            <label htmlFor="password">Password:</label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <button className="btn11" type="submit">
            {status === "Registration" ? "Register" : "Login"}
          </button>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "black",
            }}
          >
            {status === "Registration" ? (
              <h5>
                Already have an account? <Link to="/">Login</Link>
              </h5>
            ) : (
              <h5>
                Don't have an account? <Link to="/register">Register</Link>
              </h5>
            )}
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default RegistrationForm;
