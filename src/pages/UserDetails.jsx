import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/solid";
import { FaStar } from "react-icons/fa";
import { useContext } from "react";
import { userContext } from "../App";
import { toast } from "react-hot-toast";
import UpdateProfileModal from "../components/UpdateCredentialModal";
import twitterIcon from "@iconify-icons/mdi/twitter";
import facebookIcon from "@iconify-icons/mdi/facebook";
import instagramIcon from "@iconify-icons/mdi/instagram";
import youtubeIcon from "@iconify-icons/mdi/youtube";
import { Icon } from "@iconify/react";
import axios from "axios";
import ReactModal from "react-modal";


function UserDetails() {
  const urluser = useLocation().state;
  const navigate = useNavigate()
  const [user, setuser] = useState(urluser);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState()
  const [restrictModal, setRestrictModal] = useState()
  const [userId, setuserId] = useState()

  console.log(urluser);

  async function getuser() {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://mazamaza.onrender.com/api/admin/user",
        {
          userId: urluser._id,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        console.log(response.data.user);
        setuser(response.data.user);
      }
    } catch (error) {
      setLoading(false);
      console.log(error, error.response.data.message);
      toast("no user in your inventory");
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

  const handleDeleteuser = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://mazamaza.onrender.com/api/admin/delete-user/${id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        toast(
          `${response.data.message} ${response?.data?.deleteduser?.name}`
        );
        navigate(-1);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast("unable to delete user");
    }
  };

  const handleRestrictuser = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://mazamaza.onrender.com/api/admin/restrict-user/${id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        toast(
          `${response.data.message} ${response?.data?.deleteduser?.name}`
        );
        navigate(-1);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast("unable to delete user");
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  const [modal, setModal] = useState();

  return (
    <div className="bg-gray-100 min-w-[80%] min-h-screen">
      {user ? (
        <>
          <div className="bg-white shadow-sm">
            <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                user Profile
              </h1>
              {/* <div className="flex items-center space-x-2">
                <p>user rating: </p>
                <FaStar className="w-5 h-5 text-yellow-400" />
                <span className="font-medium text-gray-800 ">
                  {" "}
                  {user.shop?.rating || 0}
                </span>
              </div> */}
            </div>
          </div>
          <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Personal Information
                </h3>
                {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Update your personal information and settings.
                </p> */}
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{`${
                      user?.firstName
                    } ${user?.lastName || ""}`}</dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.email}{" "}
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Phone number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.shop?.phone}
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Date Joined
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(user?.createdAt).toDateString()}
                      
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      UserId ID
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user._id}
                    </dd>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Profile photo
                    </dt>
                  </div>
                </dl>
              </div>
              <div className="flex items-center">
                <button
                  onClick={(e) => {setDeleteModal(!deleteModal); setuserId(user._id)}}
                  className=" px-4 py-2 rounded-sm  text-white hover:bg-blue-500 bg-blue-400 "
                >
                  Delete user
                </button>
                <button
                  onClick={(e) => {setRestrictModal(!deleteModal); setuserId(user._id)}}
                  className=" px-4 py-2 rounded-sm mx-4 text-white hover:bg-red-500  bg-red-400 "
                >
                  Restrict user
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>user Profile not available</p>
      )}
      <ReactModal isOpen={deleteModal} style={customStyles}>
        <p>Are you sure you want to delete this user ?</p>
        <div className=" flex items-center w-full justify-center">
          <button
            className=" m-1 bg-red-400 text-white rounded-sm py-1 px-2 text-center"
            onClick={(e) => handleDeleteuser(userId)}
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
      <p>Are you sure you want to restrict this user ?</p>
      <div className=" flex items-center w-full justify-center">
        <button
          className=" m-1 bg-red-400 text-white rounded-sm py-1 px-2 text-center"
          onClick={(e) => handleRestrictuser(userId)}
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

export default UserDetails;
