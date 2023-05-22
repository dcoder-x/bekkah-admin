import React, { useState } from "react";

const UpdateCredentialsPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Perform email update logic here
    console.log("Email updated:", email);
    setEmail("");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Perform password update logic here
    console.log("Password updated:", password);
    setPassword("");
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    // Perform name update logic here
    console.log("Name updated:", name);
    setName("");
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md space-y-6">
        <form onSubmit={handleEmailSubmit}>
          <h2 className="text-2xl font-bold mb-4">Update Email</h2>
          <div>
            <label htmlFor="email" className="block text-gray-700">
              New Email:
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Update Email
            </button>
          </div>
        </form>

        <form onSubmit={handlePasswordSubmit}>
          <h2 className="text-2xl font-bold mb-4">Update Password</h2>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              New Password:
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Update Password
            </button>
          </div>
        </form>

        <form onSubmit={handleNameSubmit}>
          <h2 className="text-2xl font-bold mb-4">Update Name</h2>
          <div>
            <label htmlFor="name" className="block text-gray-700">
              New Name:
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Update Name
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCredentialsPage;
