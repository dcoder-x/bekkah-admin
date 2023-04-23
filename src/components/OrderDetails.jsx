import React from "react";

const OrderDetails = () => {
  return (
    
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white w-2/3 shadow-xl rounded-lg p-6">
        <div className="border-b-2 border-dashed pb-3">
          <div className="border-l-2 border-l-blue-400 pl-2 mb-3">
            The refund goods
          </div>
          <div className="flex justify-between">
            <div className="flex items-start">
              <div className="w-52 h-28 rounded-xl bg-gray-200 mr-3"></div>
              <div>
                <div className="pb-2 font-bold">One on one coach ...</div>
                <div className="text-xs text-gray-400 leading-6">
                  membership card x1、personal training x10
                </div>
                <div className="text-xs text-gray-400 leading-6">
                  Item value of goods：30000 | Commodity price：20000
                </div>
              </div>
            </div>
            <div className="text-right text-sm leading-7">
              <p>quantity：x3</p>
              <p>aggre：9000</p>
              <p>amount：6000</p>
              <div>
                total ：<sapn className="text-red-500">-900</sapn>
              </div>
              <div className="font-bold">the amount actually paid：$1500.00</div>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <div className="flex flex-col items-end text-sm leading-8 pb-6">
            <div>
              Total use value：733.33 <span className="text-blue-500">unfold</span>
            </div>
            <div className="flex w-96 justify-between">
              <div>membership card x1</div>
              <div>
                <span className="text-gray-400">(Have use value)</span> 333.33
              </div>
            </div>
            <div className="flex w-96 justify-between">
              <div>personal training x10</div>
              <div>
                <span className="text-gray-400">(Have use value)</span> 400.00
              </div>
            </div>
          </div>
          <div className="border-l-2 border-l-blue-400 pl-2 mb-3">
            The refund way
          </div>
          <div className="h-64 rounded-xl bg-gray-100 mt-4"></div>
          <div className="mt-6 border-t pt-5 text-sm flex items-center">
            Refund to payer：
            <span className="text-base text-red-500 font-bold">366.80</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
