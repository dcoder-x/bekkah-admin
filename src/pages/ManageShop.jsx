import React, { useState } from "react";
import classNames from "classnames";
import ShopProfileForm from "../components/ShopProfileForm";
import ShopMediaForm from "../components/ShopMediaForm";
import SocialPlatform from "../components/SocialPlatforms";

function Tab({ activeTab, label, onClick }) {
  const tabClassNames = classNames(
    "inline-block px-4 py-2 font-bold",
    {
      "border-b-4 border-blue-500": activeTab === label,
    },
    {
      "border-b-4 border-gray-300": activeTab !== label,
    }
  );

  return (
    <button className={tabClassNames} onClick={() => onClick(label)}>
      {label}
    </button>
  );
}

function TabContent({ activeTab }) {
  switch (activeTab) {
    case "General":
      return <ShopProfileForm/>;
    case "Media":
      return <ShopMediaForm/>;
    case "Social platforms":
      return <SocialPlatform/>;
    default:
      return null;
  }
}

function ManageShop() {
  const [activeTab, setActiveTab] = useState("General");

  const handleTabClick = (tabLabel) => {
    setActiveTab(tabLabel);
  };

  return (
    <div className=" w-full min-h-screen overflow-scroll">
        <h2>Manage Shop</h2>
      <div className="mb-4 w-full flex justify-start">
        <Tab
          label="General"
          activeTab={activeTab}
          onClick={handleTabClick}
        />
        <Tab
          label="Media"
          activeTab={activeTab}
          onClick={handleTabClick}
        />
        <Tab
          label="Social platforms"
          activeTab={activeTab}
          onClick={handleTabClick}
        />
      </div>
      <div>
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
}

export default ManageShop;
