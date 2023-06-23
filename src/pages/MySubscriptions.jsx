import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SearchFilter from "../components/SearchBar";
import { toast } from "react-hot-toast";
import Lottie from "react-lottie";
import empty from "../assets/lottie/emptyList.json";
import ReactModal from "react-modal";
import Pagination from "../components/Pagination";

import Header from "../components/Header";

const Subscriptions = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
     const [loading, setLoading] = useState(false);

;  const [showModal, setShowModal] = useState();
  const [orderId, setOrderId] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
const [ItemsPerPage,setProductPerPage] = useState(10);

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};
const handleItemsPerPageChange = (pageNumber) => {
  setProductPerPage(pageNumber);
};
const indexOfLastItem = currentPage * ItemsPerPage;
const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
const currentProducts = data.slice(indexOfFirstItem, indexOfLastItem);
  const handleSearch = (search) => {
    if (search) {
      console.log(search);
      const filteredProducts = data.filter((product) => {
        return product.name.toLowerCase().includes(search.toLowerCase());
      });
      if (filteredProducts.length>0) {
      setSearchData(filteredProducts);
      }
      else{
        toast.error('no products match your search')
      }
    } else {
      setSearchData([])
    }
  };

  const getSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://mazamaza.onrender.com/api/admin/subscriptions",
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        console.log(response);
        setData(response.data.subscriptions);
      }
    } catch (error) {
      setLoading(false);
      console.log(error, error.response.data.message);
      toast(
        error?.response?.data?.message ||
          "something went wrong : could not fetch Subscriptions"
      );
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

  const handleDeleteorder = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://mazamaza.onrender.com/api/order/delete/${id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("sellerAuthToken"),
          },
        }
      );
      if (response) {
        toast(`${response.data.message} ${response?.data?.deletedorder?.name}`);
        getSubscriptions();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast("unable to delete order");
    }
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <div className="orderList w-full px-2">
      <Header
        title={"My subscriptions"}
        component={
          <SearchFilter
            onFilter={(filter) => {
              console.log(filter);
            }}
            onSearch={(filter) => {
              console.log(filter);
            }}
            filterOptions={["active", "inactive"]}
          />
        }
      />
      {data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={ItemsPerPage}
          totalItems={searchData.length > 0 ? searchData.length : data.length}
          onPageChange={(number) => handlePageChange(number)}
          onItemsPerPageChange={(number) => handleItemsPerPageChange(number)}
        />
      )}
      <div className="overflow-x-auto w-full px-4">
        <div className="w-full">
          <div className=" flex flex-row px-4 item-center justify-between"></div>
          <div className="bg-white shadow-md rounded my-6 w-full">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Subscription ID</th>
                  <th className="py-3 px-6 text-left">Package Name</th>
                  <th className="py-3 px-6 text-left">Seller</th>
                  <th className="py-3 px-6 text-left">Amount</th>
                  <th className="py-3 px-6 text-center">Frequency</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Subscription Valid till</th>

                </tr>
              </thead>
              {currentProducts?.length > 0 &&
                <tbody className="text-gray-600 text-sm font-light">
                  {currentProducts.map((order, i) => {
                    return (
                      <tr
                        key={i}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <span className="font-medium">{`${order?._id}`}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                            {order?.package?.name}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                           {` ${order?.seller?.firstName}  ${order?.seller?.lastName}`}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                              {order.package?.price}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                          {order?.package?.durationInDays} Days
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                              {new Date(order.expiryDate) > Date.now() ?'Active': 'Expired'}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                              {new Date(order.expiryDate ).toDateString()}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              

              }
            </table>
            {
              !data?.length > 0 &&
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
              <p className=" text-red-400">No Subscription yet</p>
            </div>
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
