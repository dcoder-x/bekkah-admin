import { Icon } from "@iconify/react";
import React from "react";
import Lottie from "react-lottie";
import { useLocation, useNavigate } from "react-router";
import empty from "../assets/lottie/emptyList.json";
import { useState } from "react";

const ShopDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState();
  const [shopId, setshopId] = useState();
  const [showModal, setShowModal] = useState();
  const [productId, setProductId] = useState();

  const shop = location.state;
  return (
    <main className="w-full h-screen px-4">
      <header className="w-full flex item-center justify-between p-4">
        <div className="flex items-center">
          <img
            src={shop.shopLogoUrl}
            alt=""
            className="rounded-full max-w-[100px] max-h-[100px]"
          />
          <p className="">{shop.seller.shopName}</p>
        </div>
        <div className="flex item-center justify-center">
          <div
            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
            onClick={(e) => {
              setShowDeleteModal(true);
              setshopId(shop._id);
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
      </header>
      <section className="flex flex-col ">
        <div className="banner b w-full max-h-[500px] flex items-center justify-center">
          <p className=" outline-1 outline-black text-white font-bold lg:text-[30px] text-[20px]">
            {shop.seller.shopName}
          </p>
        </div>
      </section>

      <h4>Shop Information</h4>
      <section className="biodata flex items-center flex-wrap justify-between my-4">
        <div className="flex item-center justify-center">
          <Icon icon="" />
          <p className="">{shop.phone}</p>
        </div>
        <div className="flex item-center justify-center">
          <Icon icon="" />
          <p className="">{shop.email}</p>
        </div>

        <div className="flex item-center justify-center">
          <Icon icon="" />
          <p className="">{` ${shop?.seller?.address?.city}, ${shop?.seller?.address?.state}, ${shop?.seller?.address?.country} `}</p>
        </div>

        <div className="flex item-center justify-center">
          <Icon icon="" />
          <p className="">{shop.rating || 0}</p>
        </div>
      </section>

      <h4>Order rules</h4>
      <section className="biodata flex items-center flex-wrap justify-between">
        <div className="flex item-center justify-center">
          <p className=" font-bold mr-4"> Order return age:{' '} </p>
          <p className="">{shop?.orderReturnAge||0}</p>
        </div>
        <div className="flex item-center justify-center">
          <p className=" font-bold mr-4"> Order Cancellation age:{' '} </p>
          <p className="">{shop?.orderCancellationAge||0}</p>
        </div>

        <div className="flex item-center justify-center">
          <p className=" font-bold mr-4"> Gap between Orders:{' '}</p>
          <p className="">{shop?.gapBetweenOrder||0}</p>
        </div>

        <div className="flex item-center justify-center">
          <p className=" font-bold mr-4"> Fufillment Method:{' '}</p>
          <p className="">{shop?.fulfillmentMethod||'none'}</p>
        </div>
      </section>

<h3>Products

</h3>
      <section className="overflow-x-auto w-full px-4 mt-4">
        <div className="bg-white shadow-md rounded my-6 w-full">
          {shop?.products?.length > 0 ? (
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Product</th>
                  <th className="py-3 px-6 text-left">Price/unit</th>
                  <th className="py-3 px-6 text-left">Category</th>
                  <th className="py-3 px-6 text-center">Quantity</th>
                  <th className="py-3 px-6 text-center">Date Created</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="text-gray-600 text-sm font-light">
                {shop?.products?.map((product, i) => {
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
                          <span className="font-medium">{product?.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          <span className="font-medium">{`${product?.currency} ${product?.price}`}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <span className="font-medium">
                          {product.category ? product?.category : "no category"}
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
      </section>
    </main>
  );
};

export default ShopDetails;
