import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [CaptainData, setCaptainData] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      email: email,
      password: password,
    });
    console.log(CaptainData);
    setemail("");
    setpassword("");
  };
  return (
    <div className="p-7 flex h-screen justify-between flex-col">
      <div>
        <img
          className="w-20 h-17 mb-10"
          src="https://www.svgrepo.com/show/519937/uber-driver.svg"
          alt="Uber Logo"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-xg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg "
            required
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-xg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg "
            required
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white front-semibold mb-7 rounded px-4 py-2 border w-full text-lg ">
            Login
          </button>
        </form>
        <p className="text-center">
          Join a fleet?
          <Link to="/captain-signup" className="text-blue-600">
            Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#4E8D9C] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
