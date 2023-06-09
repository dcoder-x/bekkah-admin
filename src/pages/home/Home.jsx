import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);

  const getSalesGraph = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:4000/api/admin/sales-graph",
        {
          headers: {
            "x-auth-token": localStorage.getItem("AdminAuthToken"),
          },
        }
      );
      if (response) {
        console.log(response?.data?.monthlyData);
        setData(response?.data?.monthlyData);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast(error?.response?.data?.message);
    }
  };

  useEffect(()=>{
    getSalesGraph()
  },[])
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={data} title="Sales Analytics" grid dataKey="totalSale"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
