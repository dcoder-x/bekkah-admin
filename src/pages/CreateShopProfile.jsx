import { useState } from "react";
import Select from "react-select";
import { PhoneIcon } from "@heroicons/react/outline";
import { countries } from "countries-list";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import logo from "../assets/images/logo.jpg";
import { useNavigate } from "react-router";
import ReactModal from "react-modal";

const options = [
  { value: "pickup", label: "Pickup" },
  { value: "delivery", label: "Delivery" },
  { value: "both", label: "Both" },
];

const CreateShopProfileForm = () => {

  const navigate = useNavigate()
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
  const [showModal, setShowModal] = useState();
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



  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption.label);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("address", { country: country, state: state, city: city });
    formData.append("phone", phone);
    console.log(Object.fromEntries(formData.entries()));
    try {
      const response = await axios.post(
        `http://localhost:4000/api/admin/shop`,
        Object.fromEntries(formData.entries()),
        {
          headers:{
            'x-auth-token':localStorage.getItem('AdminAuthToken')
          }
        }
      );
      if (response) {
        toast(response.data.message);
        setShowModal(true)
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.message || "something went wrong");
    }
  }

  return (
    <div class="flex items-center min-h-screen w-full bg-white dark:bg-gray-900">
      <div class="container mx-auto w-full">
        <div class=" mx-auto my-10 w-full">
          <img
            src={logo}
            className="max-w-[200px] m-auto rounded-full"
            alt="MazaMaza logo"
          />
          <div class="text-center">
            <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Create Shop
            </h1>
            <p class="text-gray-500 dark:text-gray-400">
              Provide seller and shop information to create a shop
            </p>
          </div>
          <div class="my-7 shadow-sm rounded-sm p-4 w-full bg-white">
            <form
              onSubmit={handleSubmit}
              className=" mb-2 text-sm flex lg:flex-row flex-col items-start text-gray-600 dark:text-gray-400 w-full"
            >
              {/* seller information form */}
              <div className="p-4 space-y-4 lg:min-w-[50%] w-[100%]">
                <h2 className='text-xl font-bold'>Seller Infomation</h2>
                <div className="space-y-1">
                  <label
                    htmlFor="firstName"
                    className="font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <input
                    required
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm border rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="lastName"
                    className="font-medium text-gray-700"
                  >
                    last name
                  </label>
                  <input
                    required
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm border rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="font-medium text-gray-700"
                  >
                    email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm border rounded-md"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="description"
                    className="font-medium text-gray-700"
                  >
                    Seller/Shop Description
                  </label>
                  <textarea
                    required
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Describe your Shop and what you intend to sell to us"
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm border rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    name="password"
                    id="password"
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm border rounded-md"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="verifyPassword"
                    className="font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    required
                    type="password"
                    name="verifyPassword"
                    id="verifyPassword"
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm border rounded-md"
                  />
                </div>



                <div className="pt-4">

                </div>
              </div>


              {/* shop creation form */}
              <div className="p-4 space-y-4 lg:min-w-[50%] w-[100%]">
                <h2 className='text-xl font-bold'>
                  Shop Details
                </h2>
                <div className="space-y-1">
                  <label
                    htmlFor="identifier"
                    className="font-medium text-gray-700"
                  >
                    Shop Name
                  </label>
                  <input
                    required
                    type="text"
                    name="shopName"
                    id="identifier"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="border-gray-300 focus:ring-[#03750D] focus:border-[#03750D] block w-full p-2 sm:text-sm border rounded-md"
                  />
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
                      className="border-gray-300 focus:ring-[#03750D] focus:border-[#03750D] block w-full pl-10 pr-12 sm:text-sm border rounded-md"
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
                    className="border-gray-300 focus:ring-[#03750D] focus:border-[#03750D] block w-full p-2 sm:text-sm border rounded-md"
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
                    className="border-gray-300 focus:ring-[#03750D] focus:border-[#03750D] block w-full p-2 sm:text-sm border rounded-md"
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
                    className="border-gray-300 focus:ring-[#03750D] focus:border-[#03750D] block w-full p-2 sm:text-sm border rounded-md"
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
                    className="border-gray-300 focus:ring-[#03750D] focus:border-[#03750D] block w-full p-2 sm:text-sm border rounded-md"
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
                    className="border-gray-300 focus:ring-[#03750D] focus:border-[#03750D] block w-full p-2 sm:text-sm border rounded-md"
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
                    className="border-gray-300 focus:ring-[#03750D] focus:border-[#03750D] block w-full p-2 sm:text-sm border rounded-md"
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
                    className="bg-[#03750D] text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    Create Shop
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ReactModal isOpen={showModal} style={customStyles}>
        <p>Go to seller dashboard </p>
        <div className=" flex items-center w-full justify-center">
          <button
            className=" m-1 bg-red-400 text-white rounded-sm py-1 px-2 text-center"
            onClick={(e) => {navigate(-1)}}
          >
            Yes
          </button>
          <button
            className=" m-1 bg-blue-300 text-white rounded-sm py-1 px-2 text-center"
            onClick={(e) => {navigate('dashboard')}}
          >
            cancel
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default CreateShopProfileForm;
