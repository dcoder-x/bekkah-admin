import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchFilter from "../../components/SearchBar";
import { toast } from "react-hot-toast";
import Lottie from "react-lottie";
import empty from "../../assets/lottie/emptyList.json";
import ReactModal from "react-modal";
import Pagination from "../../components/Pagination";

export default function PriceDiscount() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
     const [loading, setLoading] = useState(false);
 
;  const [showModal, setShowModal] = useState();
  const [productId, setProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductPerPage] = useState(10);
  const [selectedOption, setSelectedOption] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [textInput, setTextInput] = useState('');
  const [products,setProducts] = useState([])



  // pagination functions
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (pageNumber) => {
    setProductPerPage(pageNumber);
  };
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  //get seller's products
  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api-bekkah.onrender.com/api/product/my_products/",
        {
          headers: {
            "x-auth-token": localStorage.getItem("sellerAuthToken"),
          },
        }
      );
      if (response) {
        console.log(response.data.products);
        setProducts(response.data.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error, error.response.data.message);
      toast("no product in your inventory");
    }
  };

  const getPriceDiscounts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api-bekkah.onrender.com/api/product/my_products/",
        {
          headers: {
            "x-auth-token": localStorage.getItem("sellerAuthToken"),
          },
        }
      );
      if (response) {
        console.log(response.data.products);
        setProducts(response.data.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error, error.response.data.message);
      toast("no product in your inventory");
    }
  };


  //create promotion modal form

  async function handleOptionChange(option) {
    setSelectedOption(option)
  }

  async function handleStartDateChange(option) {
    setStartDate(option)
  }
  async function handleEndDateChange(option) {
    setEndDate(option)
  }
  async function handleTextInputChange(option) {
    setTextInput(option)
  }

  async function handleSubmit(event) {
    // setSelectedOption(option)
  }


  //handle searchBar
  const handleSearch = (search) => {
    if (search) {
      console.log(search);
      const filteredProducts = data.filter((product) => {
        return product.name.toLowerCase().includes(search.toLowerCase());
      });
      if (filteredProducts.length > 0) {
        setSearchData(filteredProducts);
      } else {
        toast("no products match your seach");
      }
    } else {
      setSearchData([]);
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


  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="productList">
      <h2 className='text-xl font-bold'>Products</h2>
      <SearchFilter
        onFilter={(filter) => {}}
        onSearch={(search) => {
          handleSearch(search);
        }}
        filterOptions={["active", "inactive"]}
      />

      <button
        className=" border-1 border-slate-200 border-solid rounded-md bg-red-500 text-white p-2"
        onClick={(e) => {
            setShowModal(true);
            // setProductId(product._id);
        }}
      >
        Add new 
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
                    <th className="py-3 px-6 text-left">Original Price </th>
                    <th className="py-3 px-6 text-left">Discount Price </th>
                    <th className="py-3 px-6 text-left">Start Date</th>
                    <th className="py-3 px-6 text-left">End Date</th>
                    <th className="py-3 px-6 text-center">Status</th>
                  </tr>
                </thead>

                <tbody className="text-gray-600 text-sm font-light">
                  {searchData.length > 0
                    ? searchData.map((promotion, i) => {
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
                                      src={promotion?.product?.productImage[0]}
                                      alt=""
                                    />
                                  </div>
                                  <span className="font-medium">
                                    {promotion?.product?.name}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <span className="font-medium">{`${promotion?.product?.currency} ${promotion?.product?.price}`}</span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                  <span className="font-medium">{`${promotion?.product?.currency} ${promotion?.product?.price * (promotion.discountPercentage/100)}`}</span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <span className="font-medium">
                                  {new Date(promotion?.startDate).toDateString()}
                                </span>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <span className="font-medium">
                                  {new Date(promotion?.endDate).toDateString()}
                                </span>
                              </td>
                              <td className="py-3 px-6 text-center">
                                {promotion?.endDate > Date.now() ? (
                                  <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                    Active
                                  </span>
                                ) : (
                                  <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                                    Expired
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                      })
                    : data.map((promotion, i) => {
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
                                    src={promotion?.product?.productImage[0]}
                                    alt=""
                                  />
                                </div>
                                <span className="font-medium">
                                  {promotion?.product?.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-left">
                              <div className="flex items-center">
                                <span className="font-medium">{`${promotion?.product?.currency} ${promotion?.product?.price}`}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-left">
                              <div className="flex items-center">
                                <span className="font-medium">{`${promotion?.product?.currency} ${promotion?.product?.price * (promotion.discountPercentage/100)}`}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <span className="font-medium">
                                {new Date(promotion?.startDate).toDateString()}
                              </span>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <span className="font-medium">
                                {new Date(promotion?.endDate).toDateString()}
                              </span>
                            </td>
                            <td className="py-3 px-6 text-center">
                              {promotion?.endDate > Date.now() ? (
                                <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                  Active
                                </span>
                              ) : (
                                <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                                  Expired
                                </span>
                              )}
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
      {data.length >0 && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={productsPerPage}
          totalItems={searchData.length > 0 ? searchData.length : data.length}
          onPageChange={(number) => handlePageChange(number)}
          onItemsPerPageChange={(number) => handleItemsPerPageChange(number)}
        />
      )}
      <ReactModal isOpen={showModal} style={customStyles}>
        <form className="contents right-0 bottom-0 w-[70%] max-w-[600px] h-screen bg-white p-4 transform translate-x-full transition-transform duration-300 ease-in-out">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="option"
            >
              Select product
            </label>
            <select
              id="option"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1874BD]"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              {
                products?.map((product)=>{
                  return (
                  <option value={product.name}>{product.name}</option>

                  )
                })
              }
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="startDate"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1874BD]"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="endDate"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1874BD]"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="textInput"
            >
              Text Input
            </label>
            <input
              type="text"
              id="textInput"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1874BD]"
              value={textInput}
              onChange={handleTextInputChange}
            />
          </div>
          <button
            type="submit"
            className="bg-[#1874BD] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#1874BD]"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </ReactModal>
    </div>
  );
}
