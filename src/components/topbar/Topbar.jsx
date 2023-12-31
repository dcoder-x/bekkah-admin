import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useContext } from "react";
import { AdminContext } from "../../App";
import { useNavigate } from "react-router";
import logo from '../../assets/images/1.png'

export default function Topbar() {
  // const {seller} = useContext(AdminContext)
  const navigate = useNavigate()
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <img src={logo} className="logo max-w-[100px]" alt="logo" />
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
          </div> 
          <img onClick={e=>navigate('profile')} src={"https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500seller.avatar||"} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
