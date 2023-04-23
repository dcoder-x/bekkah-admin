import React, { useEffect, useState } from "react";
import classNames from "classnames";
import ShopProfileForm from "../components/ShopProfileForm";
import ShopMediaForm from "../components/ShopMediaForm";
import SocialPlatform from "../components/SocialPlatforms";
import AddShippingAddress from "../components/AddShippingAddress";
import axios from "axios";
import { toast } from "react-hot-toast";
import { faWifiStrong } from "@fortawesome/free-solid-svg-icons";








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
      //shop profile state

      const [shop, setShop] = useState()
      //get shop profile details

  const getShopProfile = async () =>{
    try {
      const response = await axios.get('https://mazamaza-backend.onrender.com/api/seller/shop',{
        headers:{
          'x-auth-token':localStorage.getItem('sellerAuthToken')
        }
      })
      if (response) {
        setShop(response.data.shop)
        console.log(response.data.shop)
        
      }
    } catch (error) {
      toast(error.response.data.message|| 'something went Wrong, please try again')
      console.log(error)
    }
    
  }

  useEffect(()=>{
    getShopProfile()
  },[])
  switch (activeTab) {
    case "General":
      return <ShopProfileForm shop={shop} />;
    case "Media":
      return <ShopMediaForm shop={shop} />;
    case "Social platforms":
      return <SocialPlatform shop={shop} />;
    case "Shipping Address":
      return <AddShippingAddress shop={shop} />;
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
        <Tab label="General" activeTab={activeTab} onClick={handleTabClick} />
        <Tab label="Media" activeTab={activeTab} onClick={handleTabClick} />
        <Tab
          label="Social platforms"
          activeTab={activeTab}
          onClick={handleTabClick}
        />
        <Tab
          label="Shipping Address"
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
