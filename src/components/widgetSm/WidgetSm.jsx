import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import Lottie from "react-lottie";
import empty from "../../assets/lottie/emptyList.json";

export default function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New sales</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          {/* <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Anna Keller</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button> */}
          no sales yet
        </li>
      </ul>
    </div>
  );
}
