import React, { useEffect } from "react";
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
import AdminProfile from "./AdminProfile";
import { useContext,Context } from "react";
import { AdminContext } from "../App";
import SellerApproval from "./SellerApproval";
import ReturnRequests from "./ReturnRequest";
import CancellationRequests from "./CancellationRequest";
import ProductPerfomance from "./ProductPerfomanceList";
import Sales from "./Sales";
import TransactionReport from "./TransactionReport";
import Subscriptions from "./MySubscriptions";
import BankAccountForm from "./BankAccount";
import VolumeDiscount from "./promotions/VolumeDiscount";
import PriceDiscount from "./promotions/PriceDiscount";
import UpdateCredentialsPage from "./UpdateCredentials";
import SellerList from "./SellerList";
import SellerDetails from "./SellerDetails";
import UserDetails from "./UserDetails";
import ShopList from "./ShopList";
import ShopDetails from "./ShopDetails";
import CreateShopProfileForm from "./CreateShopProfile";
import RestrictedUserList from "./userList/RestrictedUsers";
import ActiveSubscriptions from "./ActiveSubscriptions";
import CreateSubscription from "./CreateSubscription";

const Dashboard = () => {
  return (
    <>
      <Topbar />
      <Sidebar />
      <div className="container">
        <Routes>
          <Route path="/*" index element={<Home />}>
            
          </Route>
          <Route path="/buyers" element={<UserList />}>
            
          </Route>
  
          <Route path="/user-details" element={<UserDetails />}>
            
          </Route>
          <Route path="/newUser" element={<NewUser />}>
            
          </Route>
          <Route path="/orders" element={<Orders/>}>
            
            </Route>
            <Route path="/orders-details" element={<OrderDetails/>}>
            
            </Route>
          <Route path="/subscription-packages" element={<SubscriptionPlans />}>
            
            
            </Route>
          <Route path="/subscriptions" element={<Subscriptions />}/>
          <Route path="/create-subscription" element={<CreateSubscription />}/>
          <Route path="/active-subscriptions" element={<ActiveSubscriptions />}/>


          <Route path="/products" element={ <ProductList />}>
           
          </Route>
          <Route path="/product" element={ <ProductDetail />}>
            
           
          </Route>
          <Route path="/seller-details" element={<SellerDetails/>}/>
          <Route path="/shop-details" element={<ShopDetails/>}/>

          <Route path="/manage-sellers" element={<SellerList/>}/>
          <Route path="/restricted-buyers" element={<RestrictedUserList/>}/>

          <Route path="/manage-shop" element={<ShopList/>}/>
          <Route path="/create-shop" element={<CreateShopProfileForm/>}/>



          <Route path="/sellerApproval" element={<SellerApproval/>}/>

          <Route path="/specialPrice" element={<PriceDiscount/>}/>
          <Route path="/volumeDiscount" element={<VolumeDiscount/>}/>
          <Route path="/mySubscriptions" element={<Subscriptions/>}/>
          <Route path="/bank" element={<BankAccountForm/>}/>

          <Route path="/returnRequest" element={<ReturnRequests/>}/>
          <Route path="/cancellationRequest" element={<CancellationRequests/>}/>
          <Route path="/productPerfomance" element={<ProductPerfomance/>}/>
          <Route path="/sales" element={<Sales/>}/>
          <Route path="/transactionReport" element={<TransactionReport/>}/>
          <Route path="/updateCredentials" element={<UpdateCredentialsPage/>}/>
          <Route path="/newproduct" element={<ProductUploadForm />}>
            
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default Dashboard;
