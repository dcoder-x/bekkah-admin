import "./productList.css";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SearchFilter from "../../components/SearchBar";
import { toast } from "react-hot-toast";
import Lottie from "react-lottie";
import empty from "../../assets/lottie/emptyList.json";
import ReactModal from "react-modal";
import Pagination from "../../components/Pagination";

import Header from "../../components/Header";


export default function ProductList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
     const [loading, setLoading] = useState(false);

;  const [showModal, setShowModal] = useState();
  const [productId, setProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
const [productsPerPage,setProductPerPage] = useState(10);

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};
const handleItemsPerPageChange = (pageNumber) => {
  setProductPerPage(pageNumber);
};
const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = data?.slice(indexOfFirstProduct, indexOfLastProduct);


  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://mazamaza.onrender.com/api/admin/products",
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        console.log(response?.data?.products);
        setData(response?.data?.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast(error?.response?.data?.message||"no product in your inventory");
    }
  };

  const handleSearch = (search) => {
    if (search) {
      console.log(search);
      const filteredProducts = data.filter((product) => {
        return product.name.toLowerCase().includes(search.toLowerCase());
      });
      if (filteredProducts?.length>0) {
      setSearchData(filteredProducts);
      }
      else{
        toast('no products match your seach')
      }
    } else {
      setSearchData([])
      getProducts();
    }
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleDeleteProduct = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://mazamaza.onrender.com/api/product/delete/${id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        toast(
          `${response.data.message} ${response?.data?.deletedProduct?.name}`
        );
        getProducts();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast("unable to delete product");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="productList">
      <Header
        title={"My Products"}
        component={
          <SearchFilter
            onFilter={(filter) => {
              console.log(filter);
            }}
            onSearch={(filter) => {
              handleSearch(filter)
            }}
            filterOptions={["active", "inactive"]}
          />
        }
      />
      {data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={productsPerPage}
          totalItems={searchData.length > 0 ? searchData.length : data.length}
          onPageChange={(number) => handlePageChange(number)}
          onItemsPerPageChange={(number) => handleItemsPerPageChange(number)}
        />
      )}

      <button
        className=" border-1 border-slate-200 border-solid rounded-md bg-red-500 text-white p-2"
        onClick={(e) => {
          navigate("../newProduct");
        }}
      >
        create new product
      </button>
      <div className="overflow-x-auto w-full px-4">
        <div className="w-full">
          <div className=" flex flex-row px-4 item-center justify-between"></div>
          <div className="bg-white shadow-md rounded my-6 w-full">
            {data?.length > 0 ? (
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Product</th>
                    <th className="py-3 px-6 text-left">Shop</th>
                    <th className="py-3 px-6 text-left">Price/unit</th>
                    <th className="py-3 px-6 text-left">Category</th>
                    <th className="py-3 px-6 text-center">Quantity</th>
                    <th className="py-3 px-6 text-center">Date Created</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="text-gray-600 text-sm font-light">
                  {searchData?.length > 0
                    ? searchData.map((product, i) => {
                        return (
                          <tr
                            key={i}
                            className="border-b border-gray-200 hover:bg-gray-100"
                          >
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="mr-2">
                                  <img
                                    className={` w-[30px]`}
                                    src={product?.productImage[0]}
                                    alt=""
                                  />
                                </div>
                                <span className="font-medium">
                                  {product?.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <span className="font-medium">
                                {product?.seller?.shopName}
                              </span>
                            </td>
                            <td className="py-3 px-6 text-left">
                              <div className="flex items-center">
                                <span className="font-medium">{`${product?.currency} ${product?.price}`}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <span className="font-medium">
                                {product.category
                                  ? product?.category
                                  : "no category"}
                              </span>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <span className="font-medium">
                                {product?.numberInStock}
                              </span>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <span className="font-medium">
                                {new Date(product?.creationDate).toDateString()}
                              </span>
                            </td>
                            <td className="py-3 px-6 text-center">
                              {product?.isActive ? (
                                <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                  Active
                                </span>
                              ) : (
                                <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                                  Inactive
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex item-center justify-center">
                                <div
                                  onClick={(e) =>
                                    navigate("../product", { state: product })
                                  }
                                  className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                </div>
                                <div
                                  onClick={(e) =>
                                    navigate("../product", { state: product })
                                  }
                                  className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </div>
                                <div
                                  className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                  onClick={(e) => {
                                    setShowModal(true);
                                    setProductId(product._id);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : data.map((product, i) => {
                      return (
                        <tr
                          key={i}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="mr-2">
                                <img
                                  className={` w-[30px]`}
                                  src={product?.productImage[0]}
                                  alt=""
                                />
                              </div>
                              <span className="font-medium">
                                {product?.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <span className="font-medium">
                              {product?.seller?.shopName}
                            </span>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <span className="font-medium">{`${product?.currency} ${product?.price}`}</span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <span className="font-medium">
                              {product.category
                                ? product?.category
                                : "no category"}
                            </span>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <span className="font-medium">
                              {product?.numberInStock}
                            </span>
                          </td>
                          <td className="py-3 px-6 text-center">
                              <span className="font-medium">
                                {new Date(product?.creationDate).toDateString()}
                              </span>
                            </td>
                          <td className="py-3 px-6 text-center">
                            {product?.isActive ? (
                              <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                Active
                              </span>
                            ) : (
                              <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                                Inactive
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                              <div
                                onClick={(e) =>
                                  navigate("../product", { state: product })
                                }
                                className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </div>
                              <div
                                className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                onClick={(e) => {
                                  setShowModal(true);
                                  setProductId(product._id);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                      })}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center w-full py-4">
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: empty,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  style={{ alignSelf: "center", maxWidth: "300px" }}
                />
                <p className=" text-red-400">No product in the inventory</p>
              </div>
            )}

          </div>
        </div>
      </div>
      <ReactModal isOpen={showModal} style={customStyles}>
        <p>Are you sure you want to delete this product ?</p>
        <div className=" flex items-center w-full justify-center">
          <button
            className=" m-1 bg-red-400 text-white rounded-sm py-1 px-2 text-center"
            onClick={(e) => handleDeleteProduct(productId)}
          >
            Yes
          </button>
          <button
            className=" m-1 bg-blue-300 text-white rounded-sm py-1 px-2 text-center"
            onClick={(e) => setShowModal(false)}
          >
            cancel
          </button>
        </div>
      </ReactModal>
    </div>
  );
}
