import React, { useState } from "react";
import classNames from "classnames";

function ShopMediaForm() {
  const [bannerUrl, setBannerUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

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
      <form className="mb-8">
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
              />
            </div>
          </div>
        </div>
        <img
          src={bannerUrl}
          alt="Shop banner preview"
          className={`${bannerPreviewClassNames} max-w-[500px] max-h-[500px]`}
        />
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
              />
            </div>
          </div>
        </div>
        <img
          src={logoUrl}
          alt="Shop logo preview"
          className={` max-w-[200px] max-h-[200px] ${logoPreviewClassNames}`}
        />
        <div className="mt-8">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShopMediaForm;
