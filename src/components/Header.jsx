import React, { Component } from "react";
import { useNavigate, useNavigation } from "react-router";

const Header = ({ title, navigationArr, component }) => {
  const navigate = useNavigate();
  // console.log(navigationArr.join('>'))
  // const navigation =  useNavigation()

  // console.log(navigation.location)
  return (
    <header className="flex flex-col w-full bg-green-200 p-2">
      <div className="flex flex-col items-start w-full">
        <p
          onClick={(e) => navigate(-1)}
          className="text-black flex items-center  font-bold"
        >
          &larr; <p className="underline">Go back</p>
        </p>
        <div className="flex items-start justify-between w-full">
        <p className="text-black text-3xl font-extrabold">{title}</p>

          {component}

        </div>
        <p className="underline text-sm text-black">
            {navigationArr?.length > 0 && navigationArr?.join(" > ")}
          </p>
      </div>
    </header>
  );
};

export default Header;
