import React from "react";
import { Link } from "react-router-dom";

const home = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-bottom bg-[url(https://images.unsplash.com/photo-1605280263929-1c42c62ef169?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] pt-8 h-screen flex justify-between flex-col w-full">
        <img
          className="w-16 ml-8"
          src="/images/Uber-Logo.wine.svg"
          alt="Uber Logo"
        />
        <div className="bg-white pd-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link to="/login" className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default home;
