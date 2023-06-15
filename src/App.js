import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import { Toaster, toast, useToasterStore } from "react-hot-toast";
import CreateShopProfileForm from "./pages/CreateShopProfile";
import { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ReactModal from "react-modal";
import Loader from "./components/Loader";
import PaymentComplete from "./pages/PaymentComplete";


export const AdminContext = createContext()


function App() {

  const [loader, setLoader] = useState(false)

  const [seller,setSeller] = useState()
  return (
    <AdminContext.Provider>
      <Routes>
        <Route path="/" index element={<SignIn />} />
        <Route path="/signin" index element={<SignIn />} />
        <Route path="/payment" index element={<PaymentComplete />} />
        <Route path="/shopSetup" index element={<CreateShopProfileForm />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
         <ReactModal isOpen={loader}>
        <Loader></Loader>
      </ReactModal>
    </AdminContext.Provider>
   
  );
}

export default App;
