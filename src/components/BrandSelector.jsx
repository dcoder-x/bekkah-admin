import { useState } from "react";

function BrandSelect({product}) {
  const [brand, setBrand] = useState(product?.brand||'');

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
