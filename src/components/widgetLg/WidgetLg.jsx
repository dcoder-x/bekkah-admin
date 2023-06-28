import "./widgetLg.css";
import { Visibility } from "@material-ui/icons";
import Lottie from "react-lottie";
import empty from "../../assets/lottie/transaction.json";
import { useEffect } from "react";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function WidgetLg() {
  const [loading, setLoading] = useState();
  const [newTransactions, setNewTransactions] = useState();
  const getNewTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api-bekkah.onrender.com/api/admin/transactions/new",
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        console.log(response?.data?.transactions);
        setNewTransactions(response?.data?.transactions);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getNewTransactions();
  }, []);
  return (
    <div className="widgetLg my-4">
      <div className="flex justify-between items-center">
        <span className="widgetLgTitle my-2 flex items-center"> <Icon icon={'uil:transaction'} className="bg-green-300 p-1 text-white rounded-full" width={45}/> {' '} New Transactions</span>

        <Link to={'transactionReport'} >
        <p>{"See More >>>"}</p>

        </Link>
      </div>

      <table className="widgetLgTable">
        <tr className="widgetLgTr bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="widgetLgTh">Transaction Ref</th>
          <th className="widgetLgTh">Transaction Type</th>
          <th className="widgetLgTh">Status</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Action</th>
        </tr>
        {newTransactions?.length > 0 &&(
          newTransactions.slice(0, 10).map((transaction) => (
            <tr className="widgetLgTr">
              <td className="widgetLgUser">
                <img
                  src={transaction?.product?.productImage[0]}
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">
                  {transaction?.transactionRef}
                </span>
              </td>
              <td className="widgetLgDate ">
                <div className="flex items-center">
                  <Icon
                    icon={
                      transaction?.transactionType.toLowerCase() ===
                      "subscription"
                        ? "eos-icons:subscriptions-created-outlined"
                        : "circum:shopping-tag"
                    }
                    className="mr-2"

                  />
                  {`${transaction?.transactionType}`}
                </div>
              </td>
              <td className="widgetLgDate">
                <div className="flex items-center">
                  {transaction && transaction.status && (
                    <Icon
                      icon={
                        transaction.status.toLowerCase() === "complete"
                          ? "fluent-mdl2:completed"
                          : transaction.status.toLowerCase() === "pending"
                          ? "carbon:incomplete-warning"
                          : "ic:baseline-cancel"
                      }
                      color={
                        transaction.status.toLowerCase() === "complete"
                          ? "green"
                          : transaction.status.toLowerCase() === "pending"
                          ? "orange"
                          : "red"
                      }
                      className="mr-2"
                    />
                  )}
                  {transaction?.status}
                </div>
              </td>

              <td className="widgetLgAmount">
                {transaction?.currency || "NGN"}
                {transaction?.amount || "0"}
              </td>
              <td className="widgetLgAmount">
                {new Date(transaction?.createdAt).toDateString()}
              </td>
              <td className="widgetLgStatus">
                <Button type="Approved" />
              </td>
            </tr>
          ))
        )}
      </table>
      {
          !newTransactions?.length > 0 && 
          (
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
            <p className=" text-red-400">No Transctions yet yet</p>
          </div>
          )
        }
    </div>
  );
}
