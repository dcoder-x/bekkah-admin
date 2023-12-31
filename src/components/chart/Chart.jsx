import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ title, data, dataKey, grid }) {

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer  width="100%" aspect={4 / 1}>
        <LineChart  data={data}>
          <XAxis className="chartLine" dataKey="name" stroke="#6ACC1A" />
          <Line className="chartLine" type="monotone" dataKey={dataKey} stroke="#6ACC1A" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
