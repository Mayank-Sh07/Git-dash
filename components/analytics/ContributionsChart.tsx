// Recharts for graphs
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// Getting State from Redux instead of prop-drilling
import { useSelector } from "react-redux";
// moment.js for date formatting (easily)
import moment from "moment";

interface Props {
  filter: {
    type: "yearly" | "monthly" | "none";
    value: number;
  };
}

interface Data {
  contributionDays: {
    date: string;
    contributionCount: number;
  }[];
}

export default function ContributionsChart({ filter }: Props) {
  const data: Array<Data> = useSelector(
    (state: any) =>
      state.user.contributionsCollection.contributionCalendar.weeks
  );

  if (!data) {
    return <h4>Loading...</h4>;
  }

  const contributionData: Array<any> = [];
  data.forEach((obj) => {
    obj.contributionDays.forEach((day) => {
      if (
        filter.type === "yearly" &&
        new Date(day.date).getFullYear() === filter.value
      ) {
        contributionData.push(day);
      } else if (
        filter.type === "monthly" &&
        new Date(day.date).getMonth() === filter.value
      ) {
        contributionData.push(day);
      }
    });
  });

  function formatXAxis(tickItem: any) {
    // using moment.js
    return moment(tickItem).format("MMM Do YY");
  }

  return (
    <ResponsiveContainer width="100%" height="80%">
      <LineChart
        width={500}
        height={300}
        data={contributionData}
        margin={{
          top: 0,
          right: 60,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={formatXAxis} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="contributionCount" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
