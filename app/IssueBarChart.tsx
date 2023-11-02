"use client";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  LabelList,
} from "recharts";

interface Props {
  open: number;
  in_progress: number;
  closed: number;
}

const IssueBarChart = ({ open, in_progress, closed }: Props) => {
  const barchart_data = [
    { label: "Open", value: open },
    { label: "In Progress", value: in_progress },
    { label: "Closed", value: closed },
  ];
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={barchart_data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <YAxis hide={true} tickSize={3} />
          <Tooltip />
          <Bar dataKey="value" barSize={60} fill="var(--accent-10)">
            <LabelList dataKey="value" position="top" />
            <LabelList dataKey="label" position="bottom" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IssueBarChart;
