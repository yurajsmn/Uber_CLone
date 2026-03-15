import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userdata, setuserdata] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    setuserdata({
      email: email,
      password: password,
    });
    console.log(userdata);
    setemail("");
    setpassword("");
  };
  return (
    <div className="p-7 flex h-screen justify-between flex-col">
      <div>
        <img
          className="w-18 h-17 mb-8"
          src="/images/Uber-Logo.wine.svg"
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
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
