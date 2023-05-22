import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchFilter from "../components/SearchBar";
import { toast } from "react-hot-toast";
import Lottie from "react-lottie";
import empty from "../assets/lottie/emptyList.json";
import ReactModal from "react-modal";

const Subscriptions = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState();
  const [orderId, setOrderId] = useState(null);

  const getSellerSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://mazamaza.onrender.com/api/order/seller",
        {
          headers: {
            "x-auth-token": localStorage.getItem("sellerAuthToken"),
          },
        }
      );
      if (response) {
        console.log(response);
        setData(response.data.Subscriptions);
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
        getSellerSubscriptions();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast("unable to delete order");
    }
  };

  useEffect(() => {
    getSellerSubscriptions();
  }, []);

  return (
    <div className="orderList">
      <h2>Subscriptions</h2>
      <SearchFilter
        onFilter={(filter) => {
          console.log(filter);
        }}
        onSearch={(filter) => {
          console.log(filter);
        }}
        filterOptions={["active", "inactive"]}
      />
      <div className="overflow-x-auto w-full px-4">
        <div className="w-full">
          <div className=" flex flex-row px-4 item-center justify-between"></div>
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Subscription ID</th>
                  <th className="py-3 px-6 text-left">Package Name</th>
                  <th className="py-3 px-6 text-left">Amount</th>
                  <th className="py-3 px-6 text-center">Frequency</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Subscription Valid till</th>
                  <th className="py-3 px-6 text-center">Action</th>

                </tr>
              </thead>
              {data?.length > 0 &&
                <tbody className="text-gray-600 text-sm font-light">
                  {data.map((order, i) => {
                    return (
                      <tr
                        key={i}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <span className="font-medium">{`${order?._id}`}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                            {order.category
                              ? order?.category[0].split(",")[0]
                              : "no category"}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                              {order.Amount}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                          {order?.totalQuantity}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                              {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div
                              onClick={(e) =>{}}
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
                          </div>
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
