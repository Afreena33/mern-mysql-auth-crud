import { useState } from "react";
import API from "../api/axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/reset-password", { password });
    alert("Password reset done");
  };

  return (
    <form onSubmit={handleSubmit} className="p-10">
      <input
        type="password"
        placeholder="New password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
      />
      <button className="bg-green-500 text-white p-2 ml-2">
        Reset
      </button>
    </form>
  );
};

export default ResetPassword;