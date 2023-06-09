import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Balance</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$0</span>
          <span className="featuredMoneyRate">
            0 <ArrowDownward  className="featuredIcon negative"/>
          </span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$0</span>
          <span className="featuredMoneyRate">
            0 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">0</span>
          <span className="featuredMoneyRate">
            0 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
    </div>
  );
}
