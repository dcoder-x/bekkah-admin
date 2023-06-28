import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/solid";
import { FaStar } from "react-icons/fa";
import { useContext } from "react";
import { AdminContext } from "../App";
import { toast } from "react-hot-toast";
import UpdateProfileModal from "../components/UpdateCredentialModal";
import twitterIcon from "@iconify-icons/mdi/twitter";
import facebookIcon from "@iconify-icons/mdi/facebook";
import instagramIcon from "@iconify-icons/mdi/instagram";
import youtubeIcon from "@iconify-icons/mdi/youtube";
import { Icon } from "@iconify/react";
import axios from "axios";
import ReactModal from "react-modal";

function SellerDetails() {
  const urlSeller = useLocation().state;
  const navigate = useNavigate();
  const [seller, setSeller] = useState(urlSeller);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState();
  const [restrictModal, setRestrictModal] = useState();
  const [sellerId, setSellerId] = useState();

  console.log(urlSeller);

  async function getSeller() {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api-bekkah.onrender.com/api/admin/seller",
        {
          sellerId: urlSeller._id,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        console.log(response.data.seller);
        setSeller(response.data.seller);
      }
    } catch (error) {
      setLoading(false);
      console.log(error, error.response.data.message);
      toast("no seller in your inventory");
    }
  }

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

  const handleDeleteseller = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://api-bekkah.onrender.com/api/admin/delete-seller/${id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        toast(
          `${response.data.message} ${response?.data?.deletedseller?.name}`
        );
        navigate(-1);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast("unable to delete seller");
    }
  };

  const handleRestrictseller = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://api-bekkah.onrender.com/api/admin/restrict-seller/${id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        toast(
          `${response.data.message} ${response?.data?.deletedseller?.name}`
        );
        navigate(-1);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast(error.response?.data?.message||"unable to restrict seller");
    }
  };

  useEffect(() => {
    getSeller();
  }, []);

  const [modal, setModal] = useState();

  return (
    <div className="bg-gray-100 min-w-[80%] min-h-screen">
      {seller ? (
        <>
          <div className="bg-white shadow-sm">
            <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                Seller Profile
              </h1>
              <div className="flex items-center space-x-2">
                <p>Seller rating: </p>
                <FaStar className="w-5 h-5 text-yellow-400" />
                <span className="font-medium text-gray-800 ">
                  {" "}
                  {seller.shop?.rating || 0}
                </span>
              </div>
            </div>
          </div>
          <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Personal Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Update your personal information and settings.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{`${
                      seller.firstName
                    } ${seller.lastName || ""}`}</dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {seller.email}{" "}
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Phone number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {seller.shop?.phone}
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Shop name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {seller.shopName}
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Shop ID
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {seller.shop?._id}
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Shop address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{` ${seller?.shop?.address?.city}, ${seller.shop?.address?.state}, ${seller.shop?.address?.country} `}</dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Description
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {seller.description}
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Profile photo
                    </dt>
                  </div>
                </dl>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    Social profiles
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {seller?.shop?.socialPlatforms?.length > 0 ? (
                        seller?.shop?.socialPlatforms?.map(
                          ({ name, link }, index) => {
                            let icon = null;

                            switch (name) {
                              case "Twitter":
                                icon = twitterIcon;
                                break;
                              case "Facebook":
                                icon = facebookIcon;
                                break;
                              case "Instagram":
                                icon = instagramIcon;
                                break;
                              case "YouTube":
                                icon = youtubeIcon;
                                break;
                              default:
                                break;
                            }

                            return (
                              name && (
                                <li
                                  key={index}
                                  className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                                >
                                  <div className="w-0 flex-1 flex items-center">
                                    <a
                                      href={link}
                                      className="flex-shrink-0 group block"
                                    >
                                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600">
                                        <Icon
                                          icon={icon}
                                          className="text-white w-6 h-6 mr-2"
                                        />
                                      </span>
                                    </a>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        {name}
                                      </div>
                                      <a
                                        href={link}
                                        className="text-sm text-gray-500 hover:text-gray-600"
                                      >
                                        {link}
                                      </a>
                                    </div>
                                  </div>
                                  {/* <div className="flex-shrink-0 sm:ml-4">
                                    <button
                                      type="button"
                                      className="font-medium text-blue-600 hover:text-blue-500"
                                    >
                                      Edit
                                    </button>
                                  </div> */}
                                </li>
                              )
                            );
                          }
                        )
                      ) : (
                        <div className="flex items-center">
                          <p>You have not added any socaial Platform </p>
                          <a
                            href=""
                            className=" text-white bg-blue-500 rounded-sm p-2 mx-4"
                          >
                            Add now
                          </a>
                        </div>
                      )}
                    </ul>
                  </dd>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={(e) => {
                    setDeleteModal(!deleteModal);
                    setSellerId(seller._id);
                  }}
                  className=" px-4 py-2 rounded-sm  text-white hover:bg-blue-500 bg-blue-400 "
                >
                  Delete Seller
                </button>
                <button
                  onClick={(e) => {
                    setRestrictModal(!deleteModal);
                    setSellerId(seller._id);
                  }}
                  className=" px-4 py-2 rounded-sm mx-4 text-white hover:bg-red-500  bg-red-400 "
                >
                  Restrict Seller
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Seller Profile not available</p>
      )}
      <ReactModal isOpen={deleteModal} style={customStyles}>
        <p>Are you sure you want to delete this seller ?</p>
        <div className=" flex items-center w-full justify-center">
          <button
            className=" m-1 bg-red-400 text-white rounded-sm py-1 px-2 text-center"
            onClick={(e) => handleDeleteseller(sellerId)}
          >
            Yes
          </button>
          <button
            className=" m-1 bg-blue-300 text-white rounded-sm py-1 px-2 text-center"
            onClick={(e) => setDeleteModal(false)}
          >
            cancel
          </button>
        </div>
      </ReactModal>
      <ReactModal isOpen={restrictModal} style={customStyles}>
        <p>Are you sure you want to restrict this seller ?</p>
        <div className=" flex items-center w-full justify-center">
          <button
            className=" m-1 bg-red-400 text-white rounded-sm py-1 px-2 text-center"
            onClick={(e) => handleRestrictseller(sellerId)}
          >
            Yes
          </button>
          <button
            className=" m-1 bg-blue-300 text-white rounded-sm py-1 px-2 text-center"
            onClick={(e) => setRestrictModal(false)}
          >
            cancel
          </button>
        </div>
      </ReactModal>
    </div>
  );
}

export default SellerDetails;
