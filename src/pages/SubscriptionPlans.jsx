import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { SellerContext } from "../App";

const SubscriptionPlans = () => {

  const [packages,setPackages] = useState()
  const [loading, setLoading] = useState();
  const {setLoader,seller} = useContext(SellerContext)

  console.log(seller)


  const getSubscriptionPackages = async () => {
    try {
      setLoading(true);setLoader(true);
      const response = await axios.get(
        "http://localhost:4000/api/seller/packages",
        {
          headers: {
            "x-auth-token": localStorage.getItem("sellerAuthToken"),
          },
        }
      );
      if (response) {setLoader(false);
        console.log(response.data);
        setPackages(response.data?.packages);
      }
    } catch (error) {
      setLoading(false);setLoader(false);
      console.log(error, error?.response?.data?.message);
      toast.error(
        error?.response?.data?.message ||
          "something went wrong : could not fetch  packages"
      );
    }
  };
  const activatePlan = async (planId) => {
    try {
      setLoading(true);setLoader(true);
      const response = await axios.post(
        "http://localhost:4000/api/payment?action=subscribe",
        {
          packageId:planId
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("sellerAuthToken"),
          },
        }
      );
      if (response) {setLoader(false);
        console.log(response.data);
        const {checkout_url} = response?.data?.data
        window.open(checkout_url)

      }
    } catch (error) {
      setLoading(false);setLoader(false);
      console.log(error, error?.response?.data?.message);
      toast.error(
        error?.response?.data?.message ||
          "something went wrong : could not fetch  packages"
      );
    }
  };
  
  useEffect(()=>{
    getSubscriptionPackages()
  },[])
  return (
    <div className="flex min-h-screen pt-[30px] px-[40px]">
      <div className="min-w-full">
        <p className="text-[#00153B] text-[20px] leading-[40px] font-semibold">
          Subscription plans
        </p>

        <div>
          <p className="text-[#717F87] text-[15px] leading-[27px] font-medium">
          Easy to activate subscription plans, where you can upgrade, downgrade or cancel your subscription at any time
          </p>
        </div>

        <p>
        Your Current Plan : {seller?.packageName||'None'}
        </p>

        <div className="mt-[20px] grid grid-cols-3 gap-[20px]">
        {packages?.length > 0 ? (
            packages?.map((data, index) => (
              <div
                key={index}
                className={`w-full ${data.name === seller?.packageName && ' border border-green-500'} bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y`}
              >
                <div className="pt-[15px] px-[25px] pb-[25px]">
                  <div className="flex justify-end">
                    <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                      <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                        {data.label}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                      {data?.name}
                    </p>
                    <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                      {`${data?.currency} ${data?.price}`}
                    </p>
                  </div>

                  <div>
                    <p className="text-[rgb(113,127,135)] text-[18px] leading-[28px] font-medium">
                      per
                    </p>
                    <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      {data?.durationInDays} days
                    </p>
                  </div>
                </div>

                <div className="pt-[25px] px-[25px] pb-[35px]">
                  <div>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      {data?.commisionRate} Commision Rate
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      {data?.activeProducts} Active Products
                    </p>

                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      {data?.productInventory} Product Inventory
                    </p>

                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      {data?.imagesPerProduct} Images per product
                    </p>
                  </div>

                  <div className="mt-[25px] flex justify-between items-center w-full">
                    <button disabled={data.name === seller?.packageName} onClick={e=>{activatePlan(data._id)}} className={`${data.name === seller?.packageName?'bg-[gray]':'bg-[#006EF5]'} rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold mx-1`}>
                      Activate Plan
                    </button>

                    {/* <button onClick={e=>{}} className="bg-[#f52500] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold mx-1">
                      De-activate Plan
                    </button> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="">
              <p>No subscribtion Package at the moment</p>

              <a href="#" className="text-blue-500">
                Enjoy Freemium plan
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
