import React from "react";

const home = () => {
  return (
    <div>
      <div className="h-screen flex justify-between flex-col  w-full bg-red-400">
        <img
          src="../public/images/Uber-Logo.wine.svg"
          alt=""
        />
        <div className="bg-white">
          <h2>Get Started with Uber</h2>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default home;
