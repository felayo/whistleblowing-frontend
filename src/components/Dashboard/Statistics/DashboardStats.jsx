// components/DashboardStats.jsx
import { Grid, Paper, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const categoryData = [
  { category: "Electricity", cases: 30 },
  { category: "Graffiti", cases: 20 },
  { category: "Drainage", cases: 25 },
  { category: "Road", cases: 15 },
  { category: "Waste", cases: 10 },
];

const statusData = [
  { name: "New", value: 45 },
  { name: "Open", value: 60 },
  { name: "Closed", value: 15 },
];

const COLORS = ["#ff9800", "#4caf50", "#9c27b0"];

const DashboardStats = () => {
  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      {/* Bar Chart */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, height: 300 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Cases by Category
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cases" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Pie Chart */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, height: 300 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Cases by Status
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label>
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardStats;
