import React from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="text-white text-xl">
      <div className="flex justify-between py-4 items-center bg-gray-900">
        <div className="pl-32">
          <img className="w-[50px]" src={logo} alt="" />
        </div>
        <div className="flex gap-20 font-semibold">
          <p>Home</p>
          <p>Features</p>
          <p>Download</p>
        </div>
        <button class="relative mr-32 inline-flex items-center justify-center p-0.5 mb-2  overflow-hidden  text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75  dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Login
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
