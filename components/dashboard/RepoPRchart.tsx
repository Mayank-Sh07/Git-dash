// Recharts for graphs
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface GraphData {
  name: string;
  pr: number;
}

export default function RepoPRchart({ data, show }: any) {
  const PR_DATA: Array<GraphData> = data.map((node: any) => ({
    name: node.name,
    pullRequests: node.pullRequests?.totalCount,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={300}
        data={PR_DATA}
        margin={{
          top: 10,
          right: 10,
          left: -20,
          bottom: 30,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#5658dd" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#5658dd" stopOpacity={0} />
          </linearGradient>
        </defs>
        {show && <CartesianGrid strokeDasharray="1 1" />}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="pullRequests"
          stroke="#5658dd"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
