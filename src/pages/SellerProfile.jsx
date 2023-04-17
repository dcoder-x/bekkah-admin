import React from "react";
import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/solid";
import { FaStar } from "react-icons/fa";

function SellerProfile() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white shadow-sm">
        <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Seller Profile</h1>
          <div className="flex items-center space-x-2">
            <FaStar className="w-5 h-5 text-yellow-400" />
            <span className="font-medium text-gray-800">4.5</span>
          </div>
        </div>
      </div>
      <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Update your personal information and settings.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">John Doe</dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">johndoe@gmail.com</dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">+1 555-555-5555</dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">123 Main St, Anytown USA 12345</dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Bio</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dui at finibus malesuada. Integer
              ac justo vel mi venenatis euismod eu sed risus. Integer vitae feugiat massa. Nulla at est metus.
            </dd>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Profile photo</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
              <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <UserCircleIcon className="h-full w-full text-gray-300" />
              </span>
              <span className="ml-4">Upload a new photo</span>
            </dd>
                </div>
              </dl>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Social profiles</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <a href="#" className="flex-shrink-0 group block">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600">
                        <svg
                          className="h-5 w-5 text-white group-hover:text-blue-200"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 1a9 9 0 110 18 9 9 0 010-18zm0 2a7 7 0 100 14 7 7 0 000-14zm2.32 5.67a2 2 0 00-2.83 0l-.7.7a1 1 0 01-1.42 0l-.7-.7a2 2 0 00-2.83 0l-.7.7a1 1 0 01-1.42 0L2.34 9.93a2 2 0 000 2.83l.7.7a1 1 0 010 1.42l-.7.7a2 2 0 000 2.83l.7.7a1 1 0 010 1.42l-.7.7a2 2 0 000 2.83l.7.7a1 1 0 010 1.42l1.41 1.41a2 2 0 002.83 0l.7-.7a1 1 0 011.42 0l.7.7a2 2 0 002.83                         0l.7-.7a1 1 0 011.42 0l1.41-1.41a2 2 0 000-2.83l-.7-.7a1 1 0 010-1.42l.7-.7a2 2 0 000-2.83l-.7-.7a1 1 0 010-1.42l.7-.7a2 2 0 000-2.83l-.7-.7a1 1 0 010-1.42l-.71-.7z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </a>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">LinkedIn</div>
                      <a href="#" className="text-sm text-gray-500 hover:text-gray-600">
                        linkedin.com/in/janedoe
                      </a>
                    </div>
                  </div>
                  <div className="flex-shrink-0 sm:ml-4">
                    <button
                      type="button"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Edit
                    </button>
                  </div>
                </li>
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <a href="#" className="flex-shrink-0 group block">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-500 hover:bg-indigo-600">
                        <svg
                          className="h-5 w-5 text-white group-hover:text-indigo-200"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M13.29 2.7a1 1 0 011.41 0l2.58 2.59a1 1 0 010 1.42L9.14 16.31a1 1 0 01-1.41 0L2.7 9.43a1 1 0 010-1.42l2.58-2.59a1 1 0 011.41 0L10 7.1l3.29-3.4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </a>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Twitter</div>
                      <a href="#" className="text-sm text-gray-500 hover:text-gray-600">
                        twitter.com/janedoe
                      </a>
                    </div>
                  </div>
                  <div className="flex-shrink-0 sm:ml-4">
                    <button
                      type="button"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Edit
                    </button>
                  </div>
                </li>
                </ul>
            </dd>
</div>
</div>
</div>
      </div>
    </div>

);
}

export default SellerProfile;