import React, { useState } from "react";
import Select from "react-select";
import { countries } from "countries-list";

const AddShippingAddress = () => {
  const [name, setName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption.value);
  };

  const handleStateChange = (selectedOption) => {
    setState(selectedOption.value);
  };

  const handleCityChange = (selectedOption) => {
    setCity(selectedOption.value);
  };

  const countryOptions = Object.keys(countries).map((key) => ({
    value: key,
    label: countries[key].name,
  }));

  const stateOptions = [
    { value: "state1", label: "State 1" },
    { value: "state2", label: "State 2" },
    { value: "state3", label: "State 3" },
  ];

  const cityOptions = [
    { value: "city1", label: "City 1" },
    { value: "city2", label: "City 2" },
    { value: "city3", label: "City 3" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col mb-4">
        <label htmlFor="name" className="mb-1 font-semibold">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="py-2 px-3 border rounded-md"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="addressLine1" className="mb-1 font-semibold">
          Address Line 1
        </label>
        <input
          type="text"
          id="addressLine1"
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
          className="py-2 px-3 border rounded-md"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="addressLine2" className="mb-1 font-semibold">
          Address Line 2
        </label>
        <input
          type="text"
          id="addressLine2"
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
          className="py-2 px-3 border rounded-md"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="country" className="mb-1 font-semibold">
          Country
        </label>
        <Select
          options={countryOptions}
          value={{ value: country, label: countries[country]?.name }}
          onChange={handleCountryChange}
          className="border rounded-md"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="state" className="mb-1 font-semibold">
          State/Province/Region
        </label>
        <Select
          options={stateOptions}
          value={{ value: state, label: state }}
          onChange={handleStateChange}
          className="border rounded-md"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="city" className="mb-1 font-semibold">
          City
        </label>
        <Select
          options={cityOptions}
          value={{ value: city, label: city }}
          onChange={handleCityChange}
          className="border rounded-md"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="zipCode" className="mb-1 font-semibold">
          Zip/Postal Code
        </label>
        <input
          type="text"
          id="zipCode"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className="py-2 px-3 border rounded-md"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="phoneNumber" className="mb-1 font-semibold">
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="py-2 px-3 border rounded-md"
        />
      </div>
      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
      >
        Save
      </button>
    </form>
  );
};

export default AddShippingAddress;
