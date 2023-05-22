import React from "react";

const SubscriptionPlans = () => {
  return (
    <div className="flex min-h-screen pt-[30px] px-[40px]">
      <div className="min-w-full">
        <p className="text-[#00153B] text-[20px] leading-[40px] font-semibold">
          Your Subscription
        </p>

        <div>
          <p className="text-[#717F87] text-[15px] leading-[27px] font-medium">
          3 easy to sign subscription plans, where you can upgrade, downgrade or cancel your subscription at any time
          </p>
        </div>

        <div className="mt-[20px] grid grid-cols-3 gap-[20px]">
          <div
            key="1"
            className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
          >
            <div className="pt-[15px] px-[25px] pb-[25px]">
              <div className="flex justify-end">
                <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                  <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                    Starter
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                  SILVER
                </p>
                <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                  NGN 2500
                </p>
              </div>

              <div>
                <p className="text-[rgb(113,127,135)] text-[18px] leading-[28px] font-medium">
                  per
                </p>
                <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                  120 days
                </p>
              </div>
            </div>

            <div className="pt-[25px] px-[25px] pb-[35px]">
              <div>
                <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                  0% Commision Rate
                </p>
                <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                  500 Active Products
                </p>
                <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                  500 Product Inventory
                </p>

                <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                  4 Images per product
                </p>
              </div>

              <div className="mt-[25px]">
                <button className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">
                  Activate Plan
                </button>
              </div>
            </div>
          </div>

          <div
            key="2"
            className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
          >
            <div className="pt-[15px] px-[25px] pb-[25px]">
              <div className="flex justify-end">
                <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                  <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                    Popular
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                  GOLD
                </p>
                <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                  NGN 3500
                </p>
              </div>

              <div>
                <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                  per
                </p>
                <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                  180 days
                </p>
              </div>
            </div>

            <div className="pt-[25px] px-[25px] pb-[35px]">
            <div>
                <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                  0% Commision Rate
                </p>
                <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                  1000 Active Products
                </p>
                <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                  1000 Product Inventory
                </p>

                <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                  6 Images per product
                </p>
              </div>

              <div className="mt-[25px]">
                <button className="bg-[#E1E3E5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">
                  Activate Plan
                </button>
              </div>
            </div>
          </div>

          <div
            key="3"
            className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
          >
            <div className="pt-[15px] px-[25px] pb-[25px]">
              <div className="flex justify-end">
                <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                  <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                    Pro
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                  PREMIUM
                </p>
                <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                  NGN 5000
                </p>
              </div>

              <div>
                <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                    per 
                </p>
                <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                  365 days
                </p>
              </div>
            </div>

            <div className="pt-[25px] px-[25px] pb-[35px]">
            <div>
                <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                  0% Commision Rate
                </p>
                <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                  3000 Active Products
                </p>
                <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                  3000 Product Inventory
                </p>

                <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                  8 Images per product
                </p>
              </div>

              <div className="mt-[25px]">
                <button className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">
                  Activate Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
