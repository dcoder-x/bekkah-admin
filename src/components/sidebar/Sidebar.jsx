import "./sidebar.css";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { sideBarMenu } from "../../data/sideBar.js";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="" className="link">
              <li className="sidebarListItem">
                <Icon icon="material-symbols:home-app-logo" />
                <p className=" mx-4">Home</p>
              </li>
            </Link>
            {sideBarMenu.map((menu) => {
              return (
                <>
                  <li
                    className="sidebarListItem flex "
                    onClick={(e) => {
                      e.currentTarget.nextSibling.classList.toggle(
                        "openSubMenu"
                      );
                      console.log("clicked", e.currentTarget.nextSibling);
                    }}
                  >
                    <Icon icon={menu?.icon} width={25} />
                    <p className=" mx-4">{menu.title}</p>
                    <Icon icon="material-symbols:arrow-drop-down" width={25} />
                  </li>

                  <div className=" subMenu overflow-hidden min-h-0 h-0 transition bg-white rounded-md shadow-sm">
                    {menu.sublinks.map((subMenu) => {
                      return (
                        subMenu.link?
                        <Link to={subMenu.link}>
                           <li className="sidebarListItem flex">
                          <Icon icon={subMenu?.icon} />
                          <p className=" mx-4 text-sm">{subMenu.name}</p>
                        </li>
                        </Link>:
                        <li className="sidebarListItem flex">
                          <Icon icon={subMenu?.icon} />
                          <p className=" mx-4 text-sm">{subMenu.name}</p>
                        </li>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
