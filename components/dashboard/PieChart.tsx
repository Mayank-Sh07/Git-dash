// Recharts for graphs
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
// Redux
import { useSelector } from "react-redux";
// Materual UI
import Typography from "@material-ui/core/Typography";

export default function PieChartJS() {
  const data = useSelector((state: any) => {
    return [
      {
        name: "Repositories Owned",
        value: state.user.repositories.totalCount,
      },
      {
        name: "Repositories Contributed",
        value: state.user.repositoriesContributedTo.totalCount,
      },
      {
        name: "Pull Requests",
        value: state.user.pullRequests.totalCount,
      },
    ];
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <>
      <Typography variant="button">
        <b>repositoy data pie chart</b>
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="80%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
