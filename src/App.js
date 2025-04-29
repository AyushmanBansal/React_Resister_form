import React from "react";
import RegisterForm from "./RegisterForm";
import "./App.css";

function App() {
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>User Registration</h2>
      <RegisterForm />
    </div>
  );
}

export default App;