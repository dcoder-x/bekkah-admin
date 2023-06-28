import "../widgetLg/widgetLg.css";
import { Visibility } from "@material-ui/icons";
import Lottie from "react-lottie";
import { useEffect } from "react";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import empty from "../../assets/lottie/sale.json";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function WidgetLg() {
  const [newSales, setNewSales] = useState();
  const [loading, setLoading] = useState();
  const [newTransactions, setNewTransactions] = useState();
  const getNewSales = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api-bekkah.onrender.com/api/admin/sales/new",
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        console.log(response?.data?.sales);
        setNewSales(response?.data?.sales);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getNewSales();
  }, []);
  return (
    <div className="widgetLg">
      <div className="flex justify-between items-center">
        <span className="widgetLgTitle my-2 flex items-center">
          <Icon
            icon={"mdi:cart-sale"}
            className="bg-blue-300 p-1 text-white rounded-full "
            width={45}
          />{" "}
          New sales
        </span>
        <Link to={'sales'} >
        <p>{"See More >>>"}</p>

        </Link>
      </div>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Product</th>
          <th className="widgetLgTh">Buyer</th>
          <th className="widgetLgTh">Seller</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Action</th>
        </tr>
        {newSales?.length > 0 &&
          newSales.slice(0, 10).map((sale) => (
            <tr className="widgetLgTr">
              <td className="widgetLgUser">
                <img
                  src={sale?.product?.productImage[0]}
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{sale?.product?.name}</span>
              </td>
              <td className="widgetLgDate">{`${sale?.user?.firstName} ${
                sale?.user?.lastName || ""
              }`}</td>
              <td className="widgetLgDate">{`${sale?.seller?.firstName} ${
                sale?.seller?.lastName || ""
              }`}</td>
              <td className="widgetLgAmount">{sale?.price || null}</td>
              <td className="widgetLgAmount">
                {new Date(sale?.createdAt).toDateString()}
              </td>
              <td className="widgetLgStatus">
                <Button type="Approved" />
              </td>
            </tr>
          ))}
      </table>
      {!newSales?.length > 0 && (
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
          <p className=" text-red-400">No sale yet</p>
        </div>
      )}
    </div>
  );
}
