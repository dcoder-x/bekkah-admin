import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./user.css";
import { useState } from "react";

export default function User() {

  // const urluser = useLocation().state;
  // const navigate = useNavigate()
  // const [user, setuser] = useState(urluser);
  // const [loading, setLoading] = useState(false);
  // const [deleteModal, setDeleteModal] = useState()
  // const [restrictModal, setRestrictModal] = useState()
  // const [userId, setuserId] = useState()
  // return (
  //   <div className="user">
  //     <div className="userTitleContainer">
  //       <h1 className="userTitle">Edit User</h1>
  //       <Link to="/newUser">
  //         <button className="userAddButton">Create</button>
  //       </Link>
  //     </div>
  //     <div className="userContainer">
  //       <div className="userShow">
  //         <div className="userShowTop">
  //           <img
  //             src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
  //             alt=""
  //             className="userShowImg"
  //           />
  //           <div className="userShowTopTitle">
  //             <span className="userShowUsername">{`${
  //                     user.firstName
  //                   } ${user.lasttName || ""}`}</span>
  //             <span className="userShowUserTitle">Software Engineer</span>
  //           </div>
  //         </div>
  //         <div className="userShowBottom">
  //           <span className="userShowTitle">Account Details</span>
  //           <div className="userShowInfo">
  //             <PermIdentity className="userShowIcon" />
  //             <span className="userShowInfoTitle">annabeck99</span>
  //           </div>
  //           <div className="userShowInfo">
  //             <CalendarToday className="userShowIcon" />
  //             <span className="userShowInfoTitle">10.12.1999</span>
  //           </div>
  //           <span className="userShowTitle">Contact Details</span>
  //           <div className="userShowInfo">
  //             <PhoneAndroid className="userShowIcon" />
  //             <span className="userShowInfoTitle">+1 123 456 67</span>
  //           </div>
  //           <div className="userShowInfo">
  //             <MailOutline className="userShowIcon" />
  //             <span className="userShowInfoTitle">annabeck99@gmail.com</span>
  //           </div>
  //           <div className="userShowInfo">
  //             <LocationSearching className="userShowIcon" />
  //             <span className="userShowInfoTitle">New York | USA</span>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="userUpdate">
  //         <span className="userUpdateTitle">Edit</span>
  //         <form className="userUpdateForm">
  //           <div className="userUpdateLeft">
  //             <div className="userUpdateItem">
  //               <label>Username</label>
  //               <input
  //                 type="text"
  //                 placeholder="annabeck99"
  //                 className="userUpdateInput"
  //               />
  //             </div>
  //             <div className="userUpdateItem">
  //               <label>Full Name</label>
  //               <input
  //                 type="text"
  //                 placeholder="Anna Becker"
  //                 className="userUpdateInput"
  //               />
  //             </div>
  //             <div className="userUpdateItem">
  //               <label>Email</label>
  //               <input
  //                 type="text"
  //                 placeholder="annabeck99@gmail.com"
  //                 className="userUpdateInput"
  //               />
  //             </div>
  //             <div className="userUpdateItem">
  //               <label>Phone</label>
  //               <input
  //                 type="text"
  //                 placeholder="+1 123 456 67"
  //                 className="userUpdateInput"
  //               />
  //             </div>
  //             <div className="userUpdateItem">
  //               <label>Address</label>
  //               <input
  //                 type="text"
  //                 placeholder="New York | USA"
  //                 className="userUpdateInput"
  //               />
  //             </div>
  //           </div>
  //           <div className="userUpdateRight">
  //             <div className="userUpdateUpload">
  //               <img
  //                 className="userUpdateImg"
  //                 src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
  //                 alt=""
  //               />
  //               <label htmlFor="file">
  //                 <Publish className="userUpdateIcon" />
  //               </label>
  //               <input type="file" id="file" style={{ display: "none" }} />
  //             </div>
  //             <button className="userUpdateButton">Update</button>
  //             <button className="userUpdateButton">Update</button>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //     <ReactModal isOpen={deleteModal} style={customStyles}>
  //       <p>Are you sure you want to delete this user ?</p>
  //       <div className=" flex items-center w-full justify-center">
  //         <button
  //           className=" m-1 bg-red-400 text-white rounded-sm py-1 px-2 text-center"
  //           onClick={(e) => handleDeleteuser(userId)}
  //         >
  //           Yes
  //         </button>
  //         <button
  //           className=" m-1 bg-blue-300 text-white rounded-sm py-1 px-2 text-center"
  //           onClick={(e) => setDeleteModal(false)}
  //         >
  //           cancel
  //         </button>
  //       </div>
  //     </ReactModal>
  //     <ReactModal isOpen={restrictModal} style={customStyles}>
  //     <p>Are you sure you want to restrict this user ?</p>
  //     <div className=" flex items-center w-full justify-center">
  //       <button
  //         className=" m-1 bg-red-400 text-white rounded-sm py-1 px-2 text-center"
  //         onClick={(e) => handleRestrictuser(userId)}
  //       >
  //         Yes
  //       </button>
  //       <button
  //         className=" m-1 bg-blue-300 text-white rounded-sm py-1 px-2 text-center"
  //         onClick={(e) => setRestrictModal(false)}
  //       >
  //         cancel
  //       </button>
  //     </div>
  //   </ReactModal>
  //   </div>
  // );
}



