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
      <RadarChart cx="50%" cy="45%" outerRadius="80%" data={RadarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Radar
          name="User"
          dataKey="commitComments"
          stroke="#BB86FC"
          fill="#BB86FC"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
