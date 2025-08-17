import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Add from "./pages/Add";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";
const App = () => {
  //when we are not authenthenticated then we will see login page
  //if token available then that compoent displayed otherwise login component
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]); //hum yaha localstorage me save kar rhe hai jisse agar galti se refresh ho jaye tab bhi token lost na ho aur waha settoken state me set kar rhe
  return (
    <div className="bg-gray-50 min-h-screen">
      {" "}
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full gap-8">
            <Sidebar />
            <div className="w-[70%] mx-automl-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
