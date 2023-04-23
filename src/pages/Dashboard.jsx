import React from "react";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
// import { Routes } from "@material-ui/core";
import { Route, Routes } from "react-router";
import UserList from "./userList/UserList";
import User from "./user/User";
import NewUser from "./newUser/NewUser";
import ProductList from "./productList/ProductList";
import Product from "./product/Product";
import NewProduct from "./newProduct/NewProduct";
import Home from "./home/Home";
import ShopForm from "../components/ShopProfileForm";
import ManageShop from "./ManageShop";
import ProductUploadForm from "../components/ProductUploadForm";
import ProductDetail from "./product/Product";
import SubscriptionPlans from "./SubscriptionPlans";
import Orders from "./Orders";
import OrderDetails from "../components/OrderDetails";
import SellerProfile from "./SellerProfile";

const Dashboard = () => {
  return (
    <>
      <Topbar />
      <Sidebar />
      <div className="container">
        <Routes>
          <Route path="/*" index element={<Home />}>
            
          </Route>
          <Route path="/users" element={<UserList />}>
            
          </Route>
          <Route path="/manage-shop" element={<ManageShop/>}>
            
            </Route>
  
          <Route path="/user/:userId" element={<User />}>
            
          </Route>
          <Route path="/newUser" element={<NewUser />}>
            
          </Route>
          <Route path="/orders" element={<Orders/>}>
            
            </Route>
            <Route path="/orders-details" element={<OrderDetails/>}>
            
            </Route>
          <Route path="/subscription" element={<SubscriptionPlans />}>
            
            </Route>
          <Route path="/products" element={ <ProductList />}>
           
          </Route>
          <Route path="/product" element={ <ProductDetail />}>
           
          </Route>
          <Route path="/profile" element={<SellerProfile/>}/>
          <Route path="/newproduct" element={<ProductUploadForm />}>
            
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default Dashboard;
