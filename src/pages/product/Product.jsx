import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import "react-image-gallery/styles/css/image-gallery.css";
import ReactImageGallery from "react-image-gallery";

const ProductDetail = () => {
  // Sample product data
  const product = {
    id: "123",
    name: "Sample Product",
    description: "This is a sample product description",
    price: 9.99,
    currency: "USD",
    salePrice: 7.99,
    images: [
      {
        original: "https://via.placeholder.com/400x400",
        thumbnail: "https://via.placeholder.com/100x100",
      },
      {
        original: "https://via.placeholder.com/400x400",
        thumbnail: "https://via.placeholder.com/100x100",
      },
      {
        original: "https://via.placeholder.com/400x400",
        thumbnail: "https://via.placeholder.com/100x100",
      },
    ],
  };

  const [isEditMode, setIsEditing] = useState(false);
  const [productName, setProductName] = useState(product.name);
  const [productDescription, setProductDescription] = useState(
    product.description
  );
  const [productPrice, setProductPrice] = useState(product.price);
  const [productSalePrice, setProductSalePrice] = useState(product.salePrice);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Save the product data
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset the product data
    setProductName(product.name);
    setProductDescription(product.description);
    setProductPrice(product.price);
    setProductSalePrice(product.salePrice);
    setIsEditing(false);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  };

  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value);
  };

  const handleProductSalePriceChange = (event) => {
    setProductSalePrice(event.target.value);
  };

  const renderEditMode = () => {
    return (
      <div className="px-4 py-5 sm:px-6">
        <div className="mt-1">
          <input
            type="text"
            name="productName"
            value={productName}
            onChange={handleProductNameChange}
            className="border-gray-300 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border rounded-md"
          />
        </div>
        <div className="mt-1">
          <textarea
            name="productDescription"
            rows="3"
            value={productDescription}
            onChange={handleProductDescriptionChange}
            className="border-gray-300 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border rounded-md"
          />
        </div>
        <div className="mt-1">
          <input
            type="number"
            name="productPrice"
            value={productPrice}
            onChange={handleProductPriceChange}
            className="border-gray-300 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border rounded-md"
          />
        </div>
        <div className="mt-1">
          <input
            type="number"
            name="productSalePrice"
            value={productSalePrice}
            onChange={handleProductSalePriceChange}
            className="border-gray-300 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border rounded-md"
          />
        </div>
        <div className="mt-5 sm:mt-6">
          <span className="flex w-full rounded-md shadow-sm">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm"
              onClick={handleSave}
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Save
            </button>
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-1 sm:text-sm"
              onClick={handleCancel}
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Cancel
            </button>
          </span>
        </div>
      </div>
    );
  };

  const renderViewMode = () => {
    return (
      <div className="px-4 py-5 sm:px-6">
        <div className="mb-6">
          <ReactImageGallery items={product.images} />
        </div>
        <div className="border-t border-gray-200 py-4">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{product.name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {product.description}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Price</dt>
              <dd className="mt-1 text-sm text-gray-900">{product.price}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Sale Price</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {product.salePrice}
              </dd>
            </div>
          </dl>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={handleEdit}
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      {isEditMode ? renderEditMode() : renderViewMode()}
    </div>
  );
};

export default ProductDetail;
