import "./widgetLg.css";
import { Visibility } from "@material-ui/icons";
import Lottie from "react-lottie";
import empty from "../../assets/lottie/emptyList.json";
import { useEffect } from "react";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function WidgetLg() {
  const [loading, setLoading] = useState()
  const [newTransactions, setNewTransactions] = useState();
  const getNewTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:4000/api/admin/Transactions-graph",
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        console.log(response?.data?.Transactions);
        setNewTransactions(response?.data?.Transactions);
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
    <div className="widgetLg">
      <span className="widgetLgTitle my-2">New Transactions</span>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Transaction Ref</th>
          <th className="widgetLgTh">Transaction Type</th>
          <th className="widgetLgTh">Status</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Action</th>
        </tr>
        {newTransactions?.length > 0 ? (
          newTransactions.slice(0,10).map((transaction) => (
            <tr className="widgetLgTr">
              <td className="widgetLgUser">
                <img
                  src={transaction?.product?.productImage[0]}
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{transaction?.transactionRef}</span>
              </td>
              <td className="widgetLgDate">{`${transaction?.transactionType} ${
                transaction?.user?.lastName || ""
              }`}</td>
              <td className="widgetLgDate">{`${transaction?.status} ${
                transaction?.seller?.lastName || ""
              }`}</td>
              <td className="widgetLgAmount">{transaction?.Amount||null}</td>
              <td className="widgetLgAmount">{new Date(transaction?.createdAt).toDateString()}</td>
              <td className="widgetLgStatus">
                <Button type="Approved" />
              </td>
            </tr>
          ))
        ) : (
          <p>no Transactions yet</p>
        )}
      </table>
    </div>
  );
}
