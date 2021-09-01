import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

interface Data {
  name: string;
  commitComments: number;
}

export default function RadarChartTS() {
  const RadarData: Array<Data> = useSelector((state: any) =>
    state.user.repositories.nodes.map((node: any) => ({
      name: node.name,
      commitComments: node.commitComments.totalCount,
    }))
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RadarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Radar
          name="User"
          dataKey="commitComments"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
