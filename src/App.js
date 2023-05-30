import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import { Toaster, toast } from "react-hot-toast";
import CreateShopProfileForm from "./pages/CreateShopProfile";
import { createContext, useState } from "react";
import axios from "axios";


export const SellerContext = createContext()


function App() {

  const [seller,setSeller] = useState()
  const getSeller = async () =>{
    try {
      const response = await axios.get('https://mazamaza.onrender.com/api/seller/account',{
        headers:{
          'x-auth-token':localStorage.getItem('AdminAuthToken')
        }
      })
      if (response) {
        setSeller(response.data.seller)
        // console.log(response.data.shop)
        
      }
    } catch (error) {
      toast(error.response.data.message|| 'something went Wrong, please try again')
      console.log(error)
    }
    
  }

  return (
    <SellerContext.Provider value={{seller,getSeller}}>
      <Routes>
        <Route path="/" index element={<SignIn />} />
        <Route path="/signin" index element={<SignIn />} />
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
    </SellerContext.Provider>
  );
}

export default App;
