import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      // console.log(response);
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md ">
        {/* ye upar wale div pe max-width-md laga ha i isliye utna hi hai aur center ho gya  */}

        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full rounded-md px-3 py-2 border border-gray-400 outline-none"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full rounded-md px-3 py-2 border border-gray-400 outline-none"
              type="password"
              name=""
              id=""
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className="bg-black text-white w-full py-2 rounded hover:cursor-pointer mt-2"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
