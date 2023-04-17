import { useState } from "react";

function BrandSelect() {
  const [brand, setBrand] = useState("");

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  return (
    <div className="relative my-2">
<label className="block text-gray-700 font-bold mb-2">Brand</label>
      <select
        id="brand"
        name="brand"
        value={brand}
        onChange={handleBrandChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="brand1">Brand 1</option>
        <option value="brand2">Brand 2</option>
        <option value="brand3">Brand 3</option>
        <option value="brand4">Brand 4</option>
        <option value="other">Other brands</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className="h-4 w-4 text-gray-400"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 2.5C5.41015 2.5 2.5 5.41015 2.5 9C2.5 12.5899 5.41015 15.5 9 15.5C12.5899 15.5 15.5 12.5899 15.5 9C15.5 5.41015 12.5899 2.5 9 2.5ZM9 0C13.9634 0 18 4.03662 18 9C18 13.9634 13.9634 18 9 18C4.03662 18 0 13.9634 0 9C0 4.03662 4.03662 0 9 0Z"
            fill="#A5B4FC"
          />
          <path
            d="M10.7071 5.29289C11.0976 5.68342 11.0976 6.31658 10.7071 6.70711L6.70711 10.7071C6.31658 11.0976 5.68342 11.0976 5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289L9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289Z"
            fill="#A5B4FC"
          />
          <path
            d="M9.29289 14.7071C8.90237 14.3166 8.90237 13.6834 9.29289 13.2929L13.2929 9.      29289C13.6834 8.90237 14.3166 8.90237 14.7071 9.29289C15.0976 9.68342 15.0976 10.3166 14.7071 10.7071L10.7071 14.7071C10.3166 15.0976 9.68342 15.0976 9.29289 14.7071Z"
            fill="#A5B4FC"
          />
        </svg>
      </div>
      {brand.toLocaleLowerCase() == "other" ? (
        <input
          type="text"
          name="otherBrands"
          required={brand.toLocaleLowerCase() == "other"}
          placeholder="Enter another brand"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none border border-solid focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      ) : null}
    </div>
  );
}

export default BrandSelect;
