import React, { useState, useContext } from "react";
import { AdminContext } from "../App";
import axios from "axios";
import { toast } from "react-hot-toast";

function BankAccountForm() {
  const { seller,getSeller } = useContext(AdminContext);
  const [bankName, setBankName] = useState(
    seller?.bankInformation?.bankName || ""
  );
  const [accountName, setAccountName] = useState(
    seller?.bankInformation?.accountName || ""
  );
  const [accountNumber, setAccountNumber] = useState(
    seller?.bankInformation?.accountNumber || ""
  );
  const [bankAddress, setBankAddress] = useState(
    seller?.bankInformation?.bankAddress || ""
  );
  const [processing, setProcessing] = useState(false);

  const handleBankNameChange = (e) => {
    setBankName(e.target.value);
  };

  const handleAccountHolderNameChange = (e) => {
    setAccountName(e.target.value);
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleBankAddressChange = (e) => {
    setBankAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(        {
      bankAddress,
      bankName,
      accountNumber,
      accountName,
    },)
    try {
      setProcessing(true);
      const response = await axios.post(
        "https://mazamaza.onrender.com/api/seller/account/bank",
        {
          bankAddress,
          bankName,
          accountNumber,
          accountName,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("sellerAuthToken"),
          },
        }
      );

      if (response) {
        setProcessing(false);
        getSeller()
        toast(response.data.message || "Bank profile updated");
      }
    } catch (error) {
      console.log(error);
      setProcessing(false);
      toast(error.response.data.message || "error: Bank profile not updated");
    }
  };

  return (
    <div className="w-screen h-screen">
      <h3 className="text-center">Bank Information</h3>
      <h6 className="text-gray-400 text-center my-4">
        Manage banking account Information{" "}
      </h6>

      <form onSubmit={handleSubmit} className="bg-white m-auto w-[70%] max-w-[600px] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="bank-name"
          >
            Bank Name*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bank-name"
            type="text"
            placeholder="Bank Name"
            value={bankName}
            onChange={handleBankNameChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="account-holder-name"
          >
            Account Holder Name*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="account-holder-name"
            type="text"
            placeholder="Account Holder Name"
            value={accountName}
            onChange={handleAccountHolderNameChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="account-number"
          >
            Account Number*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="account-number"
            type="text"
            placeholder="Account Number"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="bank-address"
          >
            Bank Address
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bank-address"
            placeholder="Bank Address"
            value={bankAddress}
            onChange={handleBankAddressChange}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            disabled={processing}
            className="bg-[#03750D] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {processing
              ? "Processing"
              : seller?.bankInformation
              ? "Update Account"
              : "Add account"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BankAccountForm;
