import React, { useState } from "react";
import classNames from "classnames";
import axios from "axios";
import { toast } from "react-hot-toast";

function ShopMediaForm({ shop }) {
  console.log(shop)
  const [bannerUrl, setBannerUrl] = useState(shop[0]?.shopBannerUrl || "");
  const [logoUrl, setLogoUrl] = useState(shop[0]?.shopLogoUrl || "");

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setBannerUrl(reader.result);
    };
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setLogoUrl(reader.result);
    };
  };

  const handleBannerClick = (event) => {
    event.preventDefault();
    document.getElementById("banner").click();
  };

  const handleLogoClick = (event) => {
    event.preventDefault();
    document.getElementById("logo").click();
  };

  const handleUpdateLogo = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/seller/shop/logo",
        formData,
        {
          headers:{
            'x-auth-token':localStorage.getItem('sellerAuthToken')
          }
        }
      );
      if (response) {
        toast(response.data.message || "image updated");
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.message||'error uploading Image')
    }
  };

  const handleUpdateBanner = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/seller/shop/banner",
        formData,
        {
          headers: { "x-auth-token": localStorage.getItem("sellerAuthToken") },
        }
      );
      if (response) {
        toast(response.data.message || "image updated");
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.maessage||'error uploading Image')
    }
  };

  const bannerPreviewClassNames = classNames("mt-4", {
    hidden: !bannerUrl,
  });

  const logoPreviewClassNames = classNames("mt-4", {
    hidden: !logoUrl,
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Upload your shop banner and logo
      </h2>
      <div className="flex items-start justify-between px-4">
        <form className="mb-8 w-full" onSubmit={(e) => handleUpdateBanner(e)}>
          <div>
            <label className="block font-bold mb-2" htmlFor="banner">
              Shop banner
            </label>
            <div className="relative border-dashed border-2 border-gray-400 p-4 rounded-lg max-w-[400px] ">
              <div className="flex flex-col items-center justify-center ">
                <div
                  className="text-gray-600 font-medium flex flex-col items-center"
                  onClick={handleBannerClick}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Add image</span>
                </div>
                <input
                  type="file"
                  id="banner"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleBannerChange}
                  className="hidden"
                  name="file"
                  required
                />
              </div>
            </div>
          </div>
          <img
            src={bannerUrl}
            alt="Shop banner preview"
            className={`${bannerPreviewClassNames} bg-slate-100 rounded-lg max-w-[500px] max-h-[500px]`}
          />
          <div className="mt-8">
            <button
              type="submit"
              className="bg-[#03750D] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Banner
            </button>
          </div>
        </form>

        {/* logo */}
        <form onSubmit={(e) => handleUpdateLogo(e)} className="mb-8 w-full">
          <div>
            <label className="block font-bold mb-2 mt-4" htmlFor="logo">
              Shop logo
            </label>
            <div className="relative border-dashed border-2 border-gray-400 p-4 rounded-lg max-w-[400px] ">
              <div className="flex flex-col items-center justify-center">
                <div
                  className="text-gray-600 font-medium flex flex-col items-center"
                  onClick={handleLogoClick}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Add image</span>
                </div>
                <input
                  type="file"
                  id="logo"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleLogoChange}
                  max-width="200"
                  max-height="200"
                  className="hidden"
                  name="file"
                  required
                />
              </div>
            </div>
          </div>
          <img
            src={logoUrl}
            alt="Shop logo preview"
            
            className={` max-w-[200px] max-h-[200px]  bg-slate-100 rounded-lg ${logoPreviewClassNames}`}
          />
          <div className="mt-8">
            <button
              type="submit"
              className="bg-[#03750D] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Logo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShopMediaForm;
