import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/solid";
import { ToggleSwitch, Checkbox } from "./FormComponents.jsx";
import { TagInput } from "./Tags.jsx";
// import { CategoryInput } from "./CategoryInput.jsx";
import CategorySelect from "./CategorySelect.jsx";
import axios from "axios";
import { toast } from "react-hot-toast";
import BrandSelect from "./BrandSelector.jsx";
import { useNavigate } from "react-router";

function ProductUpdateForm({product}) {
  const navigate = useNavigate()
  const formRef = useRef();
  const [productVariants, setProductVariants] = useState([
    ...product.variants,
  ]);
  const [productSpecifications, setProductSpecifications] = useState([
    ...product.specifications,
  ]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [productImages, setProductImages] = useState([...product.productImage]);

  const [isActive, setIsActive] = useState(product?.isActive||false);
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured||false);
  const [tags, setTags] = useState([]);
  const [weight, setWeight] = useState(product?.weight||"");
  const [length, setLength] = useState(product?.dimensions?.width||"");
  const [width, setWidth] = useState(product?.dimensions?.height||"");
  const [height, setHeight] = useState(product?.dimensions?.length||"");

  const [freeShipping, setFreeShipping] = useState(product?.isFreeShipping);
  const [shippingAgent, setShippingAgent] = useState(product?.shippingAgent);

  const [isLoading, setIsLoading] = useState(false);

  //handle toggle for Isactive field
  const handleToggle = (e) => {
    setIsActive(!isActive);
  };

  const handleCheckbox = (event) => {
    setIsFeatured(!isFeatured);
  };

  const handleTagChange = (event) => {
    console.log(event);
    setTags([...tags, event]);
    console.log(tags);
  };

  const handleFreeShippingChange = (event) => {
    setFreeShipping(event.target.checked);
    setShippingAgent("");
  };

  const handleShippingAgentChange = (event) => {
    setShippingAgent(event.target.value);
  };

  //variant handlers
  const handleVariantChange = (index, field, value) => {
    const newVariants = [...productVariants];
    newVariants[index][field] = value;
    console.log(newVariants);
    setProductVariants(newVariants);
    console.log(productVariants);
  };

  const handleVariantAdd = () => {
    const newVariants = [...productVariants];
    newVariants.push({ name: "", value: "", quantity: "" });
    setProductVariants(newVariants);
  };

  const handleVariantRemove = (index) => {
    const newVariants = [...productVariants];
    newVariants.splice(index, 1);
    setProductVariants(newVariants);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    console.log(files);
    const images = files.map((file) => ({
      id: uuidv4(),
      file: file,
      url: URL.createObjectURL(file),
    }));
    setProductImages((prevImages) => [...prevImages, ...images]);
  };

  //specifications
  const handleSpecificationChange = (index, field, value) => {
    const newSpecifications = [...productSpecifications];
    newSpecifications[index][field] = value;
    console.log(newSpecifications);
    setProductSpecifications(newSpecifications);
    console.log(productSpecifications);
  };

  const handleSpecificationAdd = () => {
    const newSpecifications = [...productSpecifications];
    newSpecifications.push({ name: "", value: "", quantity: "" });
    setProductSpecifications(newSpecifications);
  };

  const handleSpecificationRemove = (index) => {
    const newSpecifications = [...productSpecifications];
    newSpecifications.splice(index, 1);
    setProductSpecifications(newSpecifications);
  };

  //images
  const handleImageRemove = (id) => {
    setProductImages((prevImages) =>
      prevImages.filter((image) => image.id||image !== id)
    );
  };

  //category
  const handleCategorySelect = (category) => {
    console.log(category);
    category.forEach((category) => {
      console.log(category);
      setSelectedCategories([...selectedCategories, category]);
    });
    console.log(selectedCategories);
  };

  //handle form

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.target || formRef.current);
    productImages.forEach((image) => data.append("images", image.file));
    console.log(selectedCategories)
    data.append("category", selectedCategories);
    data.append("tags", tags);
    data.append('isActive',isActive)
    data.append('isFeatured',isFeatured)

    data.append(
      "dimensions",
      JSON.stringify({ height: height, length: length, width: width })
    );
    data.append("variants", JSON.stringify(productVariants));
    data.append("specifications", JSON.stringify(productSpecifications));

    // console.log(JSON.stringify(productVariants), selectedCategories);

    const formObject = {};
    for (const [key, value] of data.entries()) {
      formObject[key] = value;
    }

    for (const [key, value] of data.entries()) {
      // console.log(key,value)
      if (value instanceof File) {
        console.log(`${key}: ${value.name}`);
      }
    }

    try {
      const response = await axios.post(
        `https://mazamaza.onrender.com/api/product/${product._id}/update`,
        data,
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("sellerAuthToken")}`,
          },
        }
      );
      if (response) {
        toast(response.data.message);
        setIsLoading(false);
        navigate(-1)
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast(
        error.response.data.message ||
          "something went wrong please try again later"
      );
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={(e) => handleSubmit(e)}
      encType="multipart/form-data"
      className=" flex flex-col items-start justify-start py-6 px-2 "
    >
      <div className="w-full flex flex-col lg:flex-row items-start justify-center">
        <div className="">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Product Name
            </label>
            <input
              className="shadow placeholder-gray-700 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder={`${product.name||'Enter product name'} `}
              // value={productName}
              // onChange={(event) => setProductName(event.target.value)}
              name="name"
            
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Product Description
            </label>
            <textarea
              className="shadow placeholder-gray-700 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder={`${product.description||'Enter product description'} `}
              // value={productDescription}
              // onChange={(event) => setProductDescription(event.target.value)}
              name="description"
              
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="price"
            >
              Product quantity
            </label>
            <input
              className="shadow placeholder-gray-700 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              placeholder={`${product.numberInStock||'Enter product quantity'} `}
              name="numberInStock"
              
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="price"
            >
              Product Price
            </label>
            <input
              className="shadow placeholder-gray-700 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              placeholder={`${product.price||'Enter product price'} `}
              // value={productPrice}
              // onChange={(event) => setProductPrice(event.target.value)}
              name="price"
              
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Select Currency:</label>
            <div className="relative inline-block w-40">
              <select
                className="block placeholder-gray-700 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                //   value={currency}
                placeholder={`${product.currency||'Select currency'} `}
                //   onChange={handleCurrencyChange}
                name="currency"
              >
                <option value="NGN">NGN</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 11l5-5-5-5V11z" />
                </svg>
              </div>
            </div>
          </div>
          <CategorySelect product={product}
            OnSelectCategories={(category) => handleCategorySelect(category)}
          />
          <BrandSelect product={product} />
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Product Variants
            </label>
            {productVariants.map((variant, index) => (
              <div className="flex mb-2" key={index}>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Variant name"
                  value={variant.name}
                  onChange={(event) =>
                    handleVariantChange(index, "name", event.target.value)
                  }
                />
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                  type="text"
                  placeholder="Variant value"
                  value={variant.value}
                  onChange={(event) =>
                    handleVariantChange(index, "value", event.target.value)
                  }
                />
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                  type="number"
                  placeholder="Variant quantity"
                  value={variant.quantity}
                  onChange={(event) =>
                    handleVariantChange(index, "quantity", event.target.value)
                  }
                />
                {index === productVariants.length - 1 && (
                  <button
                    type="button"
                    className="ml-2"
                    onClick={handleVariantAdd}
                  >
                    <PlusCircleIcon className="h-5 w-5 text-blue-500 hover:text-blue-700" />
                  </button>
                )}
                {index !== productVariants.length - 1 && (
                  <button
                    type="button"
                    className="ml-2"
                    onClick={() => handleVariantRemove(index)}
                  >
                    <svg
                      className="h-5 w-5 text-red-500 hover:text-red-700"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.293-9.707a1 1 0 00-1.414-1.414L10 8.586l-1.879-1.88a1 1 0 00-1.414 1.414L8.586 10l-1.88 1.879a1 1 0 001.414 1.414L10 11.414l1.879 1.88a1 1 0 001.414-1.414L11.414 10l1.879-1.879z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Product specifications
            </label>
            {productSpecifications.map((specification, index) => (
              <div className="flex mb-2" key={index}>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="specification name"
                  value={specification.name}
                  onChange={(event) =>
                    handleSpecificationChange(index, "name", event.target.value)
                  }
                 
                />
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                  type="text"
                  placeholder="specification value"
                  value={specification.value}
                  onChange={(event) =>
                    handleSpecificationChange(
                      index,
                      "value",
                      event.target.value
                    )
                  }
                  
                />
                {index === productSpecifications.length - 1 && (
                  <button
                    type="button"
                    className="ml-2"
                    onClick={handleSpecificationAdd}
                  >
                    <PlusCircleIcon className="h-5 w-5 text-blue-500 hover:text-blue-700" />
                  </button>
                )}
                {index !== productSpecifications.length - 1 && (
                  <button
                    type="button"
                    className="ml-2"
                    onClick={() => handleSpecificationRemove(index)}
                  >
                    <svg
                      className="h-5 w-5 text-red-500 hover:text-red-700"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.293-9.707a1 1 0 00-1.414-1.414L10 8.586l-1.879-1.88a1 1 0 00-1.414 1.414L8.586 10l-1.88 1.879a1 1 0 001.414 1.414L10 11.414l1.879 1.88a1 1 0 001.414-1.414L11.414 10l1.879-1.879z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Product Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
              id="imageInput"
              max={5}
            />
            <div className="grid grid-cols-3 gap-4">
              {productImages.map((image,i) => (
                <div key={i} className="relative">
                  <img
                    src={image?.url||image}
                    alt="Product"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 m-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-700"
                    onClick={() => handleImageRemove(image.id||image)}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.293-9.707a1 1 0 00-1.414-1.414L10 8.586l-1.879-1.88a1 1 0 00-1.414 1.414L8.586 10l-1.88 1.879a1 1 0 001.414 1.414L10 11.414l1.879 1.88a1 1 0 001.414-1.414L11.414 10l1.879-1.879z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              {productImages.length <= 5 && (
                <button
                  type="button"
                  className="flex flex-col items-center justify-center bg-gray-200 border-dashed border-2 border-gray-400 rounded-lg h-40 hover:bg-gray-300"
                  onClick={() => {
                    document.getElementById("imageInput").click();
                  }}
                >
                  <PlusIcon className="h-10 w-10 text-gray-500" />
                  <span className="text-gray-500">Add Image</span>
                </button>
              )}
            </div>
          </div>
        </div>
        {/* other input fields */}
        <div className="flex px-4 flex-col md:flex-row gap-4 add-stock-column column-actions">
          <div className="flex flex-col space-y-4">
            <div className="card p-4 shadow-md rounded-sm bg-slate-100">
              <div className="card-body">
                <h2 className="text-lg font-medium mb-2">Product Status</h2>
                <div className="flex items-center justify-between">
                  <span>Active</span>
                  <ToggleSwitch product={product}
                  checked={isActive}
                    // name={"isActive"}
                    // required={true}
                    onChange={handleToggle}
                  />
                </div>
              </div>
            </div>
            <div className="card p-4 shadow-md rounded-sm bg-slate-100">
              <div className="card-body">
                <h2 className="text-lg font-medium mb-2">Featured Product</h2>
                <div className="flex items-center justify-between">
                  <span>Mark as featured</span>
                  <Checkbox
                    required={true}
                    // name={"isFeatured"}
                    checked={isFeatured}
                    value={isFeatured}
                    onChange={handleCheckbox}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Checking this option will show this product in Featured
                  products on the website.
                </p>
              </div>
            </div>
            <div className="card p-4 shadow-md rounded-sm bg-slate-100">
              <div className="card-body">
                <h2 className="text-lg font-medium mb-2">Product Tags</h2>
                <p className="text-sm text-gray-500 mb-2">
                  This will be used by Buyer to search the product. Type the tag
                  and click on enter to add another tag
                </p>
                <TagInput product={product} onTagSelect={(e) => handleTagChange(e)} />
              </div>
            </div>
            
            <div className="card p-4 shadow-md rounded-sm bg-slate-100">
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="weight"
                >
                  Weight (lbs)
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="weight"
                  type="number"
                  required={true}
                  value={weight}
                  name="weight"
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter weight in pounds"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="length"
                >
                  Length (m)
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="length"
                  type="number"
                  value={length}
                  required={true}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="Enter length in m"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="width"
                >
                  Width (m)
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="width"
                  type="number"
                  value={width}
                  required={true}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="Enter width in m"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="height"
                >
                  Height (m)
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="height"
                  type="number"
                  value={height}
                  required={true}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter height in m"
                />
              </div>
            </div>
            <div className="card p-4 shadow-md rounded-sm bg-slate-100">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="height"
              >
                Shipping options
              </label>
              <div>
                <label
                  htmlFor="free-shipping"
                  className="inline-flex items-center"
                >
                  <input
                    type="checkbox"
                    id="free-shipping"
                    name="isFreeShipping"
                    // required={true}
                    value={freeShipping}
                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    checked={freeShipping}
                    onChange={handleFreeShippingChange}
                  />
                  <span className="ml-2 text-sm leading-5 text-gray-700">
                    Free shipping
                  </span>
                </label>
              </div>

              {!freeShipping && (
                <div>
                  <label>
                    Shipping Agent:
                    <select
                      value={shippingAgent}
                      onChange={handleShippingAgentChange}
                      required={true}
                      name="shippingAgent"
                    >
                      {/* <option value="">--Select Shipping Agent--</option> */}
                      <option value="UPS">UPS</option>
                      <option value="DHL">DHL</option>
                      <option value="Aramex">Aramex</option>
                    </select>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end py-4">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 flex  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          // onClick={handleSubmit}
        >
          {isLoading ? "Updating product" : "Update product"}
        </button>
        <button
          type="reset"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          //   onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// const FormComponent = () => {

//   return (

//   );
// };

export default ProductUpdateForm;
