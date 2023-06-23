import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SearchFilter from "../components/SearchBar";
import { toast } from "react-hot-toast";
import Lottie from "react-lottie";
import empty from "../assets/lottie/emptyList.json";
import ReactModal from "react-modal";
import Pagination from "../components/Pagination";

import Header from "../components/Header";

const Shipments = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
     const [loading, setLoading] = useState(false);

;  const [showModal, setShowModal] = useState();
  const [orderId, setOrderId] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
const [ItemsPerPage,setProductPerPage] = useState(10);

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};
const handleItemsPerPageChange = (pageNumber) => {
  setProductPerPage(pageNumber);
};
const indexOfLastItem = currentPage * ItemsPerPage;
const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
const currentShpments = data?.slice(indexOfFirstItem, indexOfLastItem);
  const handleSearch = (search) => {
    if (search) {
      console.log(search);
      const filteredShpments = data.filter((product) => {
        return product.name.toLowerCase().includes(search.toLowerCase());
      });
      if (filteredShpments.length>0) {
      setSearchData(filteredShpments);
      }
      else{
        toast.error('no Shpments match your search')
      }
    } else {
      setSearchData([])
    }
  };

  const getShipments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:4000/api/admin/shipments",
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        console.log(response.data.shipments);
        setData(response.data.shipments);
      }
    } catch (error) {
      setLoading(false);
      toast(
        error?.response?.data?.message ||
          "something went wrong : could not fetch Shipments"
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
            "x-auth-token": localStorage.getItem("sellerAuthToken"),
          },
        }
      );
      if (response) {
        toast(`${response.data.message} ${response?.data?.deletedshipment?.name}`);
        getShipments();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast("unable to delete order");
    }
  };

  useEffect(() => {
    getShipments();
  }, []);

  return (
    <div className="orderList w-full px-2">
      <Header
        title={"My Shipments"}
        component={
          <SearchFilter
            onFilter={(filter) => {
              console.log(filter);
            }}
            onSearch={(filter) => {
              console.log(filter);
            }}
            filterOptions={["active", "inactive"]}
          />
        }
      />
      {data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={ItemsPerPage}
          totalItems={searchData.length > 0 ? searchData.length : data.length}
          onPageChange={(number) => handlePageChange(number)}
          onItemsPerPageChange={(number) => handleItemsPerPageChange(number)}
        />
      )}
      <div className="overflow-x-auto w-full px-4">
        <div className="w-full">
          <div className=" flex flex-row px-4 item-center justify-between"></div>
          <div className="bg-white shadow-md rounded my-6 w-full">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Shipment ID</th>
                  <th className="py-3 px-6 text-left">Tracking Number</th>
                  <th className="py-3 px-6 text-left">From</th>
                  <th className="py-3 px-6 text-left">To</th>
                  <th className="py-3 px-6 text-center">Product</th>
                  <th className="py-3 px-6 text-center">Date</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              {currentShpments?.length > 0 &&
                <tbody className="text-gray-600 text-sm font-light">
                  {currentShpments.map((shipment, i) => {
                    return (
                      <tr
                        key={i}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <span className="font-medium">{`${shipment?._id}`}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                            {shipment?.trackingNumber}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                           {shipment?.from?.address1} 
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                              {shipment?.to?.address1}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                          {shipment?.product?.name} Days
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="font-medium">
                              {new Date(shipment.createdAt).toDateString()}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <Link to={'../shipment'} state={shipment} className="font-medium bg-green-500 rounded-sm p-2 text-white">
                              Track
                          </Link>
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
              <p className=" text-red-400">No Shipment yet</p>
            </div>
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipments;
