import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchFilter from "../components/SearchBar";
import { toast } from "react-hot-toast";
import Lottie from "react-lottie";
import empty from "../assets/lottie/emptyList.json";
import ReactModal from "react-modal";

const ProductProfit = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
     const [loading, setLoading] = useState(false);
 
;  const [showModal, setShowModal] = useState();
  const [orderId, setOrderId] = useState(null);

  const getSellerProductProfit = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:4000/api/order/seller",
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        console.log(response);
        setData(response.data.ProductProfit);
      }
    } catch (error) {
      setLoading(false);
      console.log(error, error.response.data.message);
      toast(
        error?.response?.data?.message ||
          "something went wrong : could not fetch ProductProfit"
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

  const handleDeleteorder = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:4000/api/order/delete/${id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        toast(`${response.data.message} ${response?.data?.deletedorder?.name}`);
        getSellerProductProfit();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast("unable to delete order");
    }
  };

  useEffect(() => {
    getSellerProductProfit();
  }, []);

  return (
    <div className="w-full px-2">
      <h1>Profit on products</h1>
      <SearchFilter
        onFilter={(filter) => {
          console.log(filter);
        }}
        onSearch={(filter) => {
          console.log(filter);
        }}
        filterOptions={["active", "inactive"]}
      />
      <div className="overflow-x-auto w-full px-4">
        <div className="w-full">
          <div className=" flex flex-row px-4 item-center justify-between"></div>
          <div className="bg-white shadow-md rounded my-6 w-full">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Product Name</th>
                  <th className="py-3 px-6 text-left">Product Category</th>
                  <th className="py-3 px-6 text-left">Cost</th>
                  <th className="py-3 px-6 text-left">Earnings</th>
                </tr>
              </thead>
              {data?.length > 0 &&
                <tbody className="text-gray-600 text-sm font-light">
                  {data.map((order, i) => {
                    return (
                      <tr
                        key={i}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <span className="font-medium">{`${order?._id}`}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                            {order.category
                              ? order?.category[0].split(",")[0]
                              : "no category"}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                              {order.Amount}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              

              }
            </table>
            {
              !data?.length > 0 &&
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
              <p className=" text-red-400">No order yet</p>
            </div>
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductProfit;
