import { useState } from "react";
import API from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/forgot-password", { email });
    alert("Reset link sent (check backend console)");
  };

  return (
    <form onSubmit={handleSubmit} className="p-10">
      <input
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
      />
      <button className="bg-blue-500 text-white p-2 ml-2">
        Send
      </button>
    </form>
  );
};

export default ForgotPassword;