import { useState } from "react";
import Select from "react-select";
import { PhoneIcon } from "@heroicons/react/outline";
import { countries } from "countries-list";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";
import { toast } from "react-hot-toast";

const options = [
  { value: "pickup", label: "Pickup" },
  { value: "delivery", label: "Delivery" },
  { value: "both", label: "Both" },
];

const CreateShopProfileForm = () => {
  const [identifier, setIdentifier] = useState("");
  const [seoFriendlyUrl, setSeoFriendlyUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [displayStatus, setDisplayStatus] = useState(true);
  const [orderReturnAge, setOrderReturnAge] = useState("");
  const [orderCancellationAge, setOrderCancellationAge] = useState("");
  const [pickupSlotGap, setPickupSlotGap] = useState("");
  const [fulfillmentMethod, setFulfillmentMethod] = useState("");



    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");


  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption.label);
  };

 async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append('address',{country:country,state:state,city:city})
    formData.append('phone',phone)
    console.log(Object.fromEntries(formData.entries()))
    try {
      
    const response = await axios.post(`https://mazamaza.onrender.com/api/seller/createShop/?id=${id}`,Object.fromEntries(formData.entries()))
      if (response) {
        toast(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast(error.response.data.message||'something went wrong')
      
    }




  }

  return (
    <div class="flex items-center min-h-screen w-full bg-white dark:bg-gray-900">
      <div class="container mx-auto w-full">
        <div class=" mx-auto my-10 w-5/6 lg:w-2/3 max-w-lg">
          <img src="" alt="MazaMaza logo" />
          <div class="text-center">
            <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Shop Profile
            </h1>
            <p class="text-gray-500 dark:text-gray-400">
              Create a profile for your shop
            </p>
          </div>
          <div class="my-7 shadow-sm rounded-sm p-4 w-full bg-white">
            <form  onSubmit={handleSubmit} className="block mb-2 text-sm text-gray-600 dark:text-gray-400 max-w-screen-lg">
              <div className="p-4 space-y-4">
                <div className="space-y-1">
                  <label
                    htmlFor="identifier"
                    className="font-medium text-gray-700"
                  >
                    Identifier
                  </label>
                  <input
                    required
                    type="text"
                    name="identifier"
                    id="identifier"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm border rounded-md"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="seoFriendlyUrl"
                    className="font-medium text-gray-700"
                  >
                    Shop SEO-friendly URL
                  </label>
                  <input
                    required
                    type="text"
                    name="seoFriendlyUrl"
                    id="seoFriendlyUrl"
                    value={seoFriendlyUrl}
                    onChange={(e) => setSeoFriendlyUrl(e.target.value)}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm border rounded-md"
                  />
                  {`https://mazamaza.com/shop/${seoFriendlyUrl}`}
                </div>

                <div className="space-y-1">
                  <label htmlFor="phone" className="font-medium text-gray-700">
                    Phone
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <PhoneInput
                      international
                      defaultCountry="NG"
                      value={phone}
                      onChange={setPhone}
                      className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border rounded-md"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="country"
                    className="font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <Select
                    className="w-full"
                    onChange={handleCountryChange}
                    defaultValue={country}
                    options={Object.entries(countries).map(
                      ([code, { name }]) => ({
                        label: name,
                        value: code,
                      })
                    )}
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="state" className="font-medium text-gray-700">
                    State
                  </label>
                  <input
                    required
                    type="text"
                    name="state"
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm border rounded-md"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="city" className="font-medium text-gray-700">
                    City
                  </label>
                  <input
                    required
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm border rounded-md"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="displayStatus"
                    className="font-medium text-gray-700"
                  >
                    Display status
                  </label>
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor="displayStatusOn"
                      className="inline-flex items-center"
                    >
                      <input
                        required
                        type="radio"
                        name="displayStatus"
                        id="displayStatusOn"
                        value="true"
                        checked={displayStatus}
                        onChange={() => setDisplayStatus(true)}
                        className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2 text-gray-700">On</span>
                    </label>
                    <label
                      htmlFor="displayStatusOff"
                      className="inline-flex items-center"
                    >
                      <input
                        required
                        type="radio"
                        name="displayStatus"
                        id="displayStatusOff"
                        value="false"
                        checked={!displayStatus}
                        onChange={() => setDisplayStatus(false)}
                        className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2 text-gray-700">Off</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="orderReturnAge"
                    className="font-medium text-gray-700"
                  >
                    Order return age
                  </label>
                  <input
                    required
                    type="text"
                    name="orderReturnAge"
                    id="orderReturnAge"
                    value={orderReturnAge}
                    onChange={(e) => setOrderReturnAge(e.target.value)}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm border rounded-md"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="orderCancellationAge"
                    className="font-medium text-gray-700"
                  >
                    Order cancellation age
                  </label>
                  <input
                    required
                    type="text"
                    name="orderCancellationAge"
                    id="orderCancellationAge"
                    value={orderCancellationAge}
                    onChange={(e) => setOrderCancellationAge(e.target.value)}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm border rounded-md"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="pickupSlotGap"
                    className="font-medium text-gray-700"
                  >
                    Gap Between Order Placement & First Pickup Slot [Hours]
                  </label>
                  <input
                    required
                    type="text"
                    name="gapBetweenOrder"
                    id="pickupSlotGap"
                    value={pickupSlotGap}
                    onChange={(e) => setPickupSlotGap(e.target.value)}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm border rounded-md"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="fulfillmentMethod"
                    className="font-medium text-gray-700"
                  >
                    Fulfillment method
                  </label>
                  <select
                    name="fulfillmentMethod"
                    required
                    id="fulfillmentMethod"
                    value={fulfillmentMethod}
                    onChange={(e) => setFulfillmentMethod(e.target.value)}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm border rounded-md"
                  >
                    <option value="">Select a method</option>
                    <option value="shipping">Shipping</option>
                    <option value="pickup">Pickup</option>
                    <option value="delivery">Delivery</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    required
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    Create Shop Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateShopProfileForm;
