import React from "react";
import { useLocation, useNavigate } from "react-router";

const OrderDetails = ({}) => {
  const navigate = useNavigate()
  const location =useLocation()
  const order = location.state
  console.log(order)
  return (
    
    <div className="h-full flex flex-col justify-center items-Start bg-gray-200 p-2">
      <h1 className="text-2xl font-bold" onClick={e=>navigate(-1)}>
       &larr; Order Details
      </h1>
      <div className="bg-white w-full shadow-xl rounded-lg p-6 my-4">
        <div className="border-b-2 border-dashed pb-3">
          <div className="border-l-2 border-l-blue-400 pl-2 mb-3">
            Order banner
          </div>
          <div className="flex justify-between">
            <div className="flex items-start">
              <div className="w-52 overflow-hidden h-28 rounded-xl bg-gray-200 mr-3">
                <img className="w-fit" src={order?.products[0]?.product?.productImage[0]} alt="" />
              </div>
              <div>
                <div className="pb-2 font-bold">Order ID: {order?._id}</div>
                <div className="text-xs text-gray-400 leading-6">
                  Transaction Ref：{order?.transactionRef}
                </div>
                <div className="text-xs text-gray-400 leading-6">
                  status：{order?.status}
                </div>
              </div>
            </div>
            <div className="text-right text-sm leading-7">
              <p>Amount：{order?.currency} {order?.totalPrice}</p>
              <p>Shipping fee：{order?.currency} {order?.shippingFee} </p>
              <div className="font-bold">Amount paid：{order?.currency} {order?.totalPrice}</div>
            </div>
          </div>
        </div>
        <div className="pt-4">
        <h1 className="text-xl">
          Products
        </h1>
        <div className="flex flex-col w-full p-4">
          {
            order.products?.map((product)=>(
              <div className="flex items-center justify-between my-2 rounded-sm bg-gray-50 px-2">
                <div className="">

                <img src={product?.product?.productImage[0]} className="max-w-[200px] w-[100px]" alt="" />
                <p className="text-gray-500">
                  {product.product?.name}
                </p>
                </div>

                <p className="text-black">
                {product?.product?.currency} {product?.product?.price}
                </p>
              </div>
            ))
          }
        </div>
          <div className="mt-6 border-t pt-5 text-sm flex items-center">
           <button className={`rounded-lg ${order.status==='shipped'?'bg-green-500':order.status==='pending'?'bg-red-500':"bg-blue-500"} p-2 text-white`}>
            {order.status==='shipped'?'Track order':order.status==='pending'?'Cancel Order':"Refund buyer"}
           </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
