import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const CreateSubscription = () => {
  const [loading, setLoading] = useState(false);

  async function createPackage(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());
    
    console.log(data);

    try {
      setLoading(true);
      const response = await axios.post(
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
  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className='text-xl font-bold' class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Create Subscription Plan
        </h2>
        <form
          action="#"
          onSubmit={(e) => {
            createPackage(e);
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
              Create package
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateSubscription;
