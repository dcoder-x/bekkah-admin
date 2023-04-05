import { useState } from 'react';

function ShopProfileForm() {
  const [fullName, setFullName] = useState('');
  const [shopName, setShopName] = useState('');
  const [shopSEO, setShopSEO] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [state, setState] = useState('');
  const [postCode, setPostCode] = useState('');
  const [pickUpTime, setPickUpTime] = useState('');
  const [sellerInfo, setSellerInfo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
  }

  return (
    <form onSubmit={handleSubmit} className="w-full self-start max-w-[80%] pb-[3rem]">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="full-name">
          Full Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="full-name"
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="shop-name">
          Shop Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="shop-name"
          type="text"
          placeholder="Enter your shop name"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="shop-seo">
          Shop SEO URL
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="shop-seo"
          type="text"
          placeholder="Enter your shop SEO URL"
          value={shopSEO}
          onChange={(e) => setShopSEO(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="phone-number">
          Phone Number
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phone-number"
          type="text"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="shop-address">
          Shop Address
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="shop-address"
          type="text"
          placeholder="Enter your shop address"
          value={shopAddress}
          onChange={(e) => setShopAddress(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="state">
          State
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="state"
          type="text"
          placeholder="Enter your state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="post-code">
          Post Code
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="post-code"
          type="text"
          placeholder="Enter your post code"
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="pick-up-time">
          Order Placement Pick Up Time
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="pick-up-time"
          type="text"
          placeholder="Enter your order placement pick up time"
          value={pickUpTime}
          onChange={(e) => setPickUpTime(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="seller-info">
          Seller Information
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="seller-info"
          placeholder="Enter your seller information"
          value={sellerInfo}
          onChange={(e) => setSellerInfo(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
    );
  }
  
  export default ShopProfileForm;