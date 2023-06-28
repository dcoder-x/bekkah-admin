import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ReactModal from "react-modal";

const SubscriptionPlans = () => {
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [packageId, setPackageId] = useState()
  const [showDeleteModal    ,setShowDeleteModal] = useState()
  const [showEditModal    ,setShowEditModal] = useState()
  const [editPackage    ,setEditPackage] = useState()


  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleDeletePackage = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://api-bekkah.onrender.com/api/admin/package/${id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        toast(
          `${response.data.message}`
        );
          getSubscriptionPackages()
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast("unable to delete Package");
    }
  };
  async function handleEditPackage(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());
    
    console.log(data);

    try {
      setLoading(true);
      const response = await axios.put(
        "https://api-bekkah.onrender.com/api/admin/package",
        data,
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        console.log(response);
        toast(response.data.message || "Subscription Package/plan created");
      }
    } catch (error) {
      console.log(error);
      toast(error?.response?.data?.message || "Subscription Package/plan not created");
    }
  }

  const getSubscriptionPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api-bekkah.onrender.com/api/admin/packages",
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        console.log(response.data);
        setData(response.data?.packages);
      }
    } catch (error) {
      setLoading(false);
      console.log(error, error.response.data?.message);
      toast(
        error?.response?.data?.message ||
          "something went wrong : could not fetch  packages"
      );
    }
  };
  useEffect(()=>{
    getSubscriptionPackages()
  },[])
  return (
    <div className="flex min-h-screen pt-[30px] px-[40px]">
      <div className="min-w-full">
        <p className="text-[#00153B] text-[20px] leading-[40px] font-semibold">
          Your Subscription Packages
        </p>

        <div>
          <p className="text-[#717F87] text-[15px] leading-[27px] font-medium">
          Manage subscription plans from this page
          </p>
        </div>


        <div className="mt-[20px] grid grid-cols-3 gap-[20px]">
          {data?.length > 0 ? (
            data?.map((data, index) => (
              <div
                key={index}
                className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
              >
                <div className="pt-[15px] px-[25px] pb-[25px]">
                  <div className="flex justify-end">
                    <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                      <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                        {data.label}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                      {data?.name}
                    </p>
                    <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                      {`${data?.currency} ${data?.price}`}
                    </p>
                  </div>

                  <div>
                    <p className="text-[rgb(113,127,135)] text-[18px] leading-[28px] font-medium">
                      per
                    </p>
                    <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      {data?.durationInDays} days
                    </p>
                  </div>
                </div>

                <div className="pt-[25px] px-[25px] pb-[35px]">
                  <div>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      {data?.commisionRate} Commision Rate
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      {data?.activeProducts} Active Products
                    </p>

                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      {data?.productInventory} Product Inventory
                    </p>

                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      {data?.imagesPerProduct} Images per product
                    </p>
                  </div>

                  <div className="mt-[25px] flex justify-between items-center w-full">
                    <button onClick={e=>{setShowEditModal(true);setEditPackage(data)}} className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold mx-1">
                      Edit Plan
                    </button>

                    <button onClick={e=>{setShowDeleteModal(true);setPackageId(data?._id)}} className="bg-[#f52500] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold mx-1">
                      Delete Plan
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="">
              <p>No subscribtion Package at the moment</p>

              <a href="create-subscription" className="text-blue-500">
                Create a package/plan Now
              </a>
            </div>
          )}
        </div>
      </div>
      <ReactModal isOpen={showDeleteModal} style={customStyles}>
        <p>Are you sure you want to delete this package/plan ?</p>
        <div className=" flex items-center w-full justify-center">
          <button
            className=" m-1 bg-red-400 text-white rounded-sm py-1 px-2 text-center"
            onClick={(e) => handleDeletePackage(packageId)}
          >
            Yes
          </button>
          <button
            className=" m-1 bg-blue-300 text-white rounded-sm py-1 px-2 text-center"
            onClick={(e) => setShowDeleteModal(false)}
          >
            cancel
          </button>
        </div>
      </ReactModal>
      <ReactModal isOpen={showEditModal} style={customStyles}>
      <section class="bg-white dark:bg-gray-900">
      <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className='text-xl font-bold' class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Create Subscription Plan
        </h2>
        <form
          action="#"
          onSubmit={(e) => {
            handleEditPackage(e);
          }}
          className="p-2 rounded-md shadow-md "
        >
          <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div class="sm:col-span-2">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Package Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type Package Name"
                required=""
              />
            </div>
            <div class="w-full">
              <label
                for="brand"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Label
              </label>
              <input
                type="text"
                name="label"
                id="brand"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter a label for the package"
                required=""
              />
            </div>
            <div class="w-full">
              <label
                for="brand"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Duration In days
              </label>
              <input
                type="text"
                name="durationInDays"
                id="brand"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type Duration in Days"
                required=""
              />
            </div>
            <div>
              <label
                for="category"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Currency
              </label>
              <select
                id="category"
                name="currency"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option selected="" value={"NGN"}>
                  NGN
                </option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div class="w-full">
              <label
                for="price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="299"
                required=""
              />
            </div>

            <div>
              <label
                for="item-weight"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Commission Rate
              </label>
              <input
                type="number"
                name="commisionRate"
                id="item-weight"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type commission rate in percentage"
                required=""
              />
            </div>
            <div>
              <label
                for="item-weight"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Active Products
              </label>
              <input
                type="number"
                name="activeProducts"
                id="item-weight"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                
                placeholder="Enter the number of active products for this Package/plan"
                required=""
              />
            </div>
            <div>
              <label
                for="item-weight"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product in Inventory
              </label>
              <input
                type="number"
                name="productInventory"
                id="item-weight"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type the number of Products in Inventory"
                required=""
              />
            </div>
            <div>
              <label
                for="item-weight"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Images per product
              </label>
              <input
                type="number"
                name="imagesPerProduct"
                id="item-weight"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="How many images Allowed per product"
                required=""
              />
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button
              type="submit"
              class="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Edit package
            </button>
            <button
              type="button"
              onClick={e=>{setShowEditModal(false)}}
              class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
             Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
      </ReactModal>
    </div>
  );
};

export default SubscriptionPlans;
