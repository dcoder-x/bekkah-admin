import { useState } from 'react';

function BankDetailsForm() {
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data
    console.log({
      accountName,
      accountNumber,
      bankName
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <label htmlFor="accountName" className="block text-gray-700 font-bold mb-2">
          Account Name
        </label>
        <input
          type="text"
          id="accountName"
          name="accountName"
          value={accountName}
          onChange={(event) => setAccountName(event.target.value)}
          className="border-gray-400 border-2 p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="accountNumber" className="block text-gray-700 font-bold mb-2">
          Account Number
        </label>
        <input
          type="text"
          id="accountNumber"
          name="accountNumber"
          value={accountNumber}
          onChange={(event) => setAccountNumber(event.target.value)}
          className="border-gray-400 border-2 p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="bankName" className="block text-gray-700 font-bold mb-2">
          Bank Name
        </label>
        <input
          type="text"
          id="bankName"
          name="bankName"
          value={bankName}
          onChange={(event) => setBankName(event.target.value)}
          className="border-gray-400 border-2 p-2 w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2">
        Add Bank Details
      </button>
    </form>
  );
}
