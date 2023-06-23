import React, { Component } from "react";
import { useNavigate, useNavigation } from "react-router";

const Header = ({ title, navigationArr, component }) => {
  const navigate = useNavigate();
  // console.log(navigationArr.join('>'))
  // const navigation =  useNavigation()

  // console.log(navigation.location
  return (
    <header className="flex flex-col items-start w-full rounded-md ">
      <div className="flex flex-col items-start justify-between w-full">
        <div className="flex items-center">
          <p
            onClick={(e) => navigate(-1)}
            className=" flex items-center text-2xl text-gray-700  font-black"
          >
            &larr;
          </p>
          <p className="text-black text-xl font-extrabold whitespace-nowrap">
            {title}
          </p>
        </div>

        <div className="flex items-center w-full justify-end">{component}</div>
      </div>
      <p className="underline text-sm text-black">
        {navigationArr?.length > 0 && navigationArr?.join(" > ")}
      </p>
    </header>
  );
};

export default Header;
