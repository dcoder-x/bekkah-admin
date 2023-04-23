import { useState } from "react";
import Select from "react-select";
import { PhoneIcon } from "@heroicons/react/outline";
import { countries } from "countries-list";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const options = [
  { value: "pickup", label: "Pickup" },
  { value: "delivery", label: "Delivery" },
  { value: "both", label: "Both" },
];

function ShopProfileForm() {
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

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption.label);
  };

  return (
    <form className="block mb-2 text-sm text-gray-600 dark:text-gray-400 w-2/3 max-w-screen-lg">
    <div className="p-4 space-y-4">
      <div className="space-y-1">
        <label
          htmlFor="identifier"
          className="font-medium text-gray-700"
        >
          Identifier
        </label>
        <input
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
            defaultCountry="US"
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
              type="radio"
              name="displayStatus"
              id="displayStatusOn"
              value="on"
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
              type="radio"
              name="displayStatus"
              id="displayStatusOff"
              value="off"
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
          type="text"
          name="pickupSlotGap"
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
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Update Shop Profile
        </button>
      </div>
    </div>
  </form>
  );
}

export default ShopProfileForm;
