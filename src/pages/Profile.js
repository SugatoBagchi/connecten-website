import React from "react";
import { FaSuitcase } from "react-icons/fa";
import { MdEmail, MdEdit } from "react-icons/md";
import { BsLinkedin, BsTwitter, BsGithub, BsCashStack } from "react-icons/bs";
import coin from "../assets/coin.png";

const Profile = () => {
  const profileJSON = {
    name: "Varun Doshi",
    designation: "Blockchain",
    bio: "Awesome blockchain developer",
    email: "doshivarun@gmail.com",
    imageURL: "imageURL",
    connectedList: [2, 7, 1, 6, 3, 9],
    github: "github",
    linkedin: "linkedin",
    twitter: "twitter",
    portfolio: "portfolio",
    isPrivate: false,
    coins: 1000,
  };

  return (
    <div className="font-roboto pt-24 pb-8 bg-[#EFF5F5]">
      <div className="flex justify-between items-center">
        <div className="px-8">
          <p className=" text-5xl font-bold">{profileJSON.name}</p>
          <div className="flex justify-evenly items-center gap-6 text-gray-500">
            <div className="flex items-center gap-2 text-xl">
              <FaSuitcase />
              {profileJSON.designation}
            </div>
            <div className="flex items-center gap-2 text-xl">
              <MdEmail />
              {profileJSON.email}
            </div>
            <div className="flex items-center gap-2 text-xl">
              <img className="w-8 bg-gray-500 rounded-full" src={coin} alt="" />
              {profileJSON.coins}
            </div>
          </div>
        </div>
        <div className="px-12">
          {/* <div className="flex text-3xl gap-6 pb-8 text-[#62CDFF]">
            <a href="">
              <BsLinkedin />
            </a>
            <a href="">
              <BsTwitter />
            </a>
            <a href="">
              <BsGithub />
            </a>
          </div> */}
          <div className="text-white px-2 cursor-pointer flex items-center text-2xl border-2 bg-[#ff567DF4] justify-center rounded-md">
            <MdEdit />
            <button className="px-2">Edit</button>
          </div>
          <div className="text-white px-2 cursor-pointer flex items-center text-2xl border-2 bg-[#609966] justify-center rounded-md">
            <BsCashStack />
            <button className="px-2">Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;