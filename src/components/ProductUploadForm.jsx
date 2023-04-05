import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/solid";
import { ToggleSwitch, Checkbox } from "./FormComponents.jsx";
import { TagInput } from "./Tags.jsx";
import { CategoryInput } from "./CategoryInput.jsx";
import CategorySelect from "./CategorySelect.jsx";
import axios from 'axios'

function ProductUploadForm() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const formRef = useRef()
  const [productVariants, setProductVariants] = useState([
    { name: "", value: "", quantity: "" },
  ]);
  const [selectedCategories, setSelectedCategories] = useState();
  const [productImages, setProductImages] = useState([]);

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
    const images = files.map((file) => ({
      id: uuidv4(),
      url: URL.createObjectURL(file),
    }));
    setProductImages((prevImages) => [...prevImages, ...images]);
  };

  const handleImageRemove = (id) => {
    setProductImages((prevImages) =>
      prevImages.filter((image) => image.id !== id)
    );
  };

  const handleCategorySelect = (category) => {
    console.log(category);
    setSelectedCategories(category.name);
    console.log(selectedCategories);
  };




  //handle form

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target)
    const data = new FormData(e.target||formRef.current);
    productImages.forEach((image) => data.append("images", image));
    data.append('category', selectedCategories)
    data.append('variants',productVariants)
    const formObject = {};
    for (const [key, value] of data.entries()) {
      formObject[key] = value;
    }


    try {
        console.log(data)
      const response = await axios.post("http://localhost:4000/api/product/create", data,{
        headers:{
            'x-auth-token':`${localStorage.getItem('sellerAuthToken')}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
    ref={formRef}
      onSubmit={e=>handleSubmit(e)}
      encType="multipart/form-data"
      className=" w-full flex flex-col lg:flex-row items-start justify-center"
    >
      <div className="">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Product Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter product name"
            // value={productName}
            // onChange={(event) => setProductName(event.target.value)}
            name="name"
            required
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter product description"
            // value={productDescription}
            // onChange={(event) => setProductDescription(event.target.value)}
            name='description'
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Product quantity
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Enter quantity in stock"
            name="numberInStock"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Product Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Enter product price"
            // value={productPrice}
            // onChange={(event) => setProductPrice(event.target.value)}
            name="price"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Select Currency:</label>
          <div className="relative inline-block w-40">
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              //   value={currency}
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
        <CategorySelect
          OnSelectCategories={(category) => handleCategorySelect(category)}
        />
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
                required
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                type="text"
                placeholder="Variant value"
                value={variant.value}
                onChange={(event) =>
                  handleVariantChange(index, "value", event.target.value)
                }
                required
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                type="number"
                placeholder="Variant quantity"
                value={variant.quantity}
                onChange={(event) =>
                  handleVariantChange(index, "quantity", event.target.value)
                }
                required
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
            Product Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
            id="imageInput"
          />
          <div className="grid grid-cols-3 gap-4">
            {productImages.map((image) => (
              <div key={image.id} className="relative">
                <img
                  src={image.url}
                  alt="Product"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 m-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-700"
                  onClick={() => handleImageRemove(image.id)}
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
            {productImages.length < 3 && (
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
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            // onClick={handleSubmit}
          >
            Save
          </button>
          <button
            type="reset"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            //   onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="flex px-4 flex-col md:flex-row gap-4 add-stock-column column-actions">
        <FormComponent />
      </div>
    </form>
  );
}

const FormComponent = () => {
  const [isActive, setIsActive] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [tags, setTags] = useState([]);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleCheckbox = (event) => {
    setIsFeatured(event.target.checked);
  };

  const handleTagChange = (event) => {
    setTags(event.target.value.split(","));
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="card p-4 shadow-md rounded-sm bg-slate-100">
        <div className="card-body">
          <h2 className="text-lg font-medium mb-2">Product Status</h2>
          <div className="flex items-center justify-between">
            <span>Active</span>
            <ToggleSwitch checked={isActive} onChange={handleToggle} />
          </div>
        </div>
      </div>
      <div className="card p-4 shadow-md rounded-sm bg-slate-100">
        <div className="card-body">
          <h2 className="text-lg font-medium mb-2">Featured Product</h2>
          <div className="flex items-center justify-between">
            <span>Mark as featured</span>
            <Checkbox checked={isFeatured} onChange={handleCheckbox} />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Checking this option will show this product in Featured products on
            the website.
          </p>
        </div>
      </div>
      <div className="card p-4 shadow-md rounded-sm bg-slate-100">
        <div className="card-body">
          <h2 className="text-lg font-medium mb-2">Product Tags</h2>
          <p className="text-sm text-gray-500 mb-2">
            This will be used by Buyer to search the product. Type the tag and
            click on enter to add another tag
          </p>
          <TagInput />
        </div>
      </div>
    </div>
  );
};

export default ProductUploadForm;
