import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import logo from "../assets/images/1.png";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function signIn(event) {
    setIsLoading(true)
    console.log("submitting");
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log(formData, event.currentTarget);
    const formObject = {};
    for (const [key, value] of formData.entries()) {
      formObject[key] = value;
    }

    console.log(formObject);

    // send login request using axios
    axios
      .post("https://api-bekkah.onrender.com/api/admin/signin",formObject)
      .then((response) => {
        // handle successful login
        localStorage.setItem('AdminAuthToken',response.data.token)
        window.location.href = "/dashboard";
        toast(response?.data.message);
      })
      .catch((error) => {
        setIsLoading(false)
        // handle login error
        console.log(error);
        toast(
          error?.response?.data?.message ||
            "something went wrong, please try again"
        );
      });
  }
  return (
    <div class="flex items-center min-h-screen w-full bg-white dark:bg-gray-900">
      <div class="container mx-auto w-full">
        <div class=" mx-auto my-10 w-5/6 lg:w-1/3 max-w-[500px] flex flex-col ">
          <img
            src={logo}
            className=" max-w-[200px] self-center justify-self-center "
            alt="bekkah logo"
          />
          <div class="text-center">
            <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Admin Dashboard
            </h1>
            <p class="text-gray-500 dark:text-gray-400">
              Sign in to access your account
            </p>
          </div>
          <div class="my-7 shadow-sm rounded-sm p-4 w-full bg-white">
            {/* onSubmit={(e)=>{signIn(e)}} */}
            <form
              onSubmit={(e) => {
                signIn(e);
              }}
            >
              <div class="mb-6">
                <label
                  for="email"
                  class="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Email Address
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="you@Shop.com / ShopName"
                  required
                  class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div class="mb-6">
                <div class="flex justify-between mb-2">
                  <label
                    for="password"
                    class="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Password
                  </label>
                  <a
                    href="#!"
                    class="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  id="password"
                  placeholder="Your Password"
                  class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div class="mb-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  // onClick={e=>{}}
                  class="w-full px-3 py-4 text-white bg-[#1874BD] rounded-md focus:bg-[#037531] focus:outline-none"
                >
                  {isLoading ? "Processing" : "Sign in"}
                </button>
              </div>
              {/* <p class="text-sm text-center text-gray-400">
                Don&#x27;t have an account yet?{" "}
                <a
                  href="#!"
                  class="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                >
                  Sign up
                </a>
                .
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
