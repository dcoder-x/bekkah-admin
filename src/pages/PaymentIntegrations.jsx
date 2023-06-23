import React, { useEffect, useState } from "react";
import classNames from "classnames";
import ShopProfileForm from "../components/ShopProfileForm";
import ShopMediaForm from "../components/ShopMediaForm";
import SocialPlatform from "../components/SocialPlatforms";
import AddShippingAddress from "../components/AddShippingAddress";
import axios from "axios";
import { toast } from "react-hot-toast";
import { faWifiStrong } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Lottie from "react-lottie";
import integrations from "../assets/lottie/integration.json";
import SQuad from "../assets/images/Squad.png";

function Tab({ activeTab, label, onClick }) {
  const tabClassNames = classNames(
    "inline-block px-4 py-2 font-bold",
    {
      "border-b-4 border-[#03750D]": activeTab === label,
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

  const [shop, setShop] = useState();
  //get shop profile details

  const getShopProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/seller/shop",
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        setShop(response.data.shop);
        console.log(response.data.shop);
      }
    } catch (error) {
      toast(
        error.response.data.message || "something went Wrong, please try again"
      );
      console.log(error);
    }
  };

  useEffect(() => {
    getShopProfile();
  }, []);
  switch (activeTab) {
    case "SQUAD":
      return <SquadComponent />;
    case "LENCO":
      return <LencoComponent shop={shop} />;
    default:
      return null;
  }
}

function PaymentInregrations() {
  const [activeTab, setActiveTab] = useState("SQUAD");

  const handleTabClick = (tabLabel) => {
    setActiveTab(tabLabel);
  };

  return (
    <div className=" w-full min-h-screen overflow-scroll">
      <Header
        title={"Integrations"}
        navigationArr={["Dashboard", "Integrations"]}
      />
      <div className="mb-4 w-full flex justify-start">
        <Tab label="SQUAD" activeTab={activeTab} onClick={handleTabClick} />
        <Tab label="LENCO" activeTab={activeTab} onClick={handleTabClick} />
      </div>
      <div>
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
}

function SquadComponent() {
  return (
    <section className="flex flex-col lg:flex-row items-start w-full">
      <div class="w-full max-w-xs">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="accountNo"
            >
              Account number
            </label>
            <input
              class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="accountNo"
              type="text"
              disabled
              placeholder="******************"
            />
          </div>

          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Api password
            </label>
            <input
              class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              disabled
              type="password"
              placeholder="******************"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Api username
            </label>
            <input
              class="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              disabled
              type="text"
              placeholder="******************"
            />
          </div>
          <p class="text-left py-2 text-gray-600 text-sm">
            Data is autofilled from backend and not editable at the moment
          </p>
          <div class="flex items-center justify-between">
            <button
              class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              disabled
            >
              Edit credentials
            </button>
          </div>
        </form>
      </div>
      <div className="banner w-full flex items-center justify-center">
        <img className="w-5/6 " src={SQuad} alt="" />
      </div>
    </section>
  );
}

function LencoComponent() {
  return (
    <div class="w-full max-w-xs">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: integrations,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        style={{ alignSelf: "center", maxWidth: "300px" }}
      />
      <p>Integration not available</p>
    </div>
  );
}
export default PaymentInregrations;
