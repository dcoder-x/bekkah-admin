import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchFilter from "../components/SearchBar";
import { toast } from "react-hot-toast";
import Lottie from "react-lottie";
import empty from "../assets/lottie/emptyList.json";
import ReactModal from "react-modal";

const SellerApproval = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState();
  const [showApprovalModal, setShowApprovalModal] = useState();

  const [requestId, setRequestId] = useState(null);

  const getSellerSellerApproval = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://mazamaza.onrender.com/api/admin/getSellerRequest",
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        console.log(response.data);
        setData(response.data?.sellerRequests);
      }
    } catch (error) {
      setLoading(false);
      console.log(error, error?.response?.data?.message);
      toast(
        error?.response?.data?.message ||
          "something went wrong : could not fetch SellerApproval"
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

  const handleDeleteRequest = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://mazamaza.onrender.com/api/admin/deleteSellerRequest/${id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        toast(`${response.data.message} ${id}`);
        getSellerSellerApproval();
        setShowModal(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setShowModal(false);
      toast("unable to delete request");
    }
  };

  const handleApproveRequest = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://mazamaza.onrender.com/api/admin/approveSellerRequest/${id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        toast(`${response.data.message} ${id}`);
        getSellerSellerApproval();
        setShowModal(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setShowModal(false);
      toast("unable to approve request");
    }
  };

  useEffect(() => {
    getSellerSellerApproval();
  }, []);

  return (
    <div className="w-full">
      <h2 className='text-xl font-bold'>Seller Approval</h2>
      {/* <SearchFilter
        onFilter={(filter) => {
          console.log(filter);
        }}
        onSearch={(filter) => {
          console.log(filter);
        }}
        filterOptions={["active", "inactive"]}
      /> */}
      <div className="overflow-x-auto w-full px-4">
        <div className="w-full">
          <div className=" flex flex-row px-4 item-center justify-between"></div>
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Seller ID</th>
                  <th className="py-3 px-6 text-left">email Verified</th>
                  <th className="py-3 px-6 text-left">email</th>
                  <th className="py-3 px-6 text-center">Shop Name</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              {data?.length > 0 && (
                <tbody className="text-gray-600 text-sm font-light">
                  {data.map((request, i) => {
                    return (
                      <tr
                        key={i}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <span className="font-medium">{`${request?.sellerInfo?._id}`}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span
                            className={`font-medium ${
                              request.sellerInfo.email_verified
                                ? "text-green-300"
                                : "text-red-300"
                            }`}
                          >
                            {request.sellerInfo.email_verified
                              ? "verified"
                              : "not verified"}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                            {request.sellerInfo.email}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                            {request?.sellerInfo.shopName}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                            {request?.isApproved ? (
                              <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                Approved
                              </span>
                            ) : (
                              <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                                not approved
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div
                               onClick={(e) => {
                                setShowApprovalModal(true);
                                setRequestId(request._id);
                              }}
                              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="m21.1 12.5l1.4 1.41l-6.53 6.59L12.5 17l1.4-1.41l2.07 2.08l5.13-5.17M10 17l3 3H3v-2c0-2.21 3.58-4 8-4l1.89.11L10 17m1-13a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4Z"
                                />
                              </svg>
                            </div>

                            <div
                              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                              onClick={(e) => {
                                setShowModal(true);
                                setRequestId(request._id);
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
              )}
            </table>
            {!data?.length > 0 && (
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
                <p className=" text-red-400">No Seller Request </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ReactModal isOpen={showModal} style={customStyles}>
        <p>Are you sure you want to delete this request ?</p>
        <div className=" flex items-center w-full justify-center">
          <button
            className=" m-1 bg-red-400 text-white rounded-sm py-1 px-2 text-center"
            onClick={(e) => handleDeleteRequest(requestId)}
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
      <ReactModal isOpen={showApprovalModal} style={customStyles}>
        <p>Are you sure you want to approve this request ?</p>
        <div className=" flex items-center w-full justify-center">
          <button
            className=" m-1 bg-green-400 text-white rounded-sm py-1 px-2 text-center"
            onClick={(e) => handleApproveRequest(requestId)}
          >
            Yes
          </button>
          <button
            className=" m-1 bg-red-400 text-white rounded-sm py-1 px-2 text-center"
            onClick={(e) => setShowApprovalModal(false)}
          >
            cancel
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default SellerApproval;
