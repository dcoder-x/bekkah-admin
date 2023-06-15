import { Icon } from "@iconify/react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem hover:bg-[#F0FFF3] hover:scale-110">
        <span className="featuredTitle flex items-center">
          <Icon
            width={30}
            color="#03750D"
            icon="fluent:money-24-filled"
            className='mr-2'
          />{" "}
          Revenue
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$0</span>
          <span className="featuredMoneyRate">
            0 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem hover:bg-[#F0FFF3] hover:scale-110">
        <span className="featuredTitle flex items-center">
          <Icon
            width={30}
            color="#03750D"
            icon="icon-park-outline:sales-report"
            className='mr-2'
          />{" "}
          Sales
        </span>

        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$0</span>
          <span className="featuredMoneyRate">
            0 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem hover:bg-[#F0FFF3] hover:scale-110">
      <span className="featuredTitle flex items-center">
          <Icon
            width={30}
            color="#03750D"
            icon="fluent-mdl2:product-variant"
            className='mr-2'
          />{" "}
          Stock
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">0</span>
          <span className="featuredMoneyRate">
            0 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
    </div>
  );
}
