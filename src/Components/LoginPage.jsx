import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Botton from "./Button";
import MainTable from "./MainTable";

function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your authentication logic here
    if (username.includes("@") && password === "123") {
      setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/main" /> && <MainTable username={username} />;
  }
  // Inside the LoginPage component

  return (
    <div className="lg:w-full h-[100vh] w-full  flex flex-col flex-wrap items-center justify-center gap-2 bg-slate-500 mx-auto ">
      <div className="lg:w-[400px] lg:h-[400px] w-[350px] h-[350px] bg-white mx-auto flex flex-col gap-2 justify-center ">
        <h1 className="text-center text-2xl">Welcome</h1>
        <label className="lg:ml-12 ml-10" htmlFor="">
          Email
        </label>
        <input
          className="lg:w-[300px] w-[250px] text-center mx-auto"
          type="text"
          placeholder="Any email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="lg:ml-12 ml-10" htmlFor="">
          Password
        </label>
        <input
          type="password"
          className="lg:w-[300px] w-[250px] text-center mx-auto"
          placeholder="Enter :123"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="mt-5 w-[250px] h-[50px] mx-auto bg-sky-700"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
