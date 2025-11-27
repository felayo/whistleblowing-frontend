// components/DashboardStats.jsx
import { useEffect, useState } from "react";
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
import { useReport } from "../../../context/ReportContext";

const COLORS = ["#ff9800", "#4caf50", "#9c27b0", "#2196f3", "#f44336"];

const DashboardStats = () => {
  const { reports } = useReport();

  const [categoryData, setCategoryData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    if (!reports || reports.length === 0) return;

    /** ----------------------------
     *  CASES BY CATEGORY
     * -----------------------------*/
    const categoryMap = {};

    reports.forEach((item) => {
      const categoryName = item.category?.name || "Uncategorised";

      if (!categoryMap[categoryName]) {
        categoryMap[categoryName] = 1;
      } else {
        categoryMap[categoryName]++;
      }
    });

    const formattedCategory = Object.keys(categoryMap).map((key) => ({
      category: key,
      cases: categoryMap[key],
    }));

    setCategoryData(formattedCategory);

    /** ----------------------------
     *  CASES BY STATUS
     * -----------------------------*/
    const statusMap = {};

    reports.forEach((item) => {
      const statusName = item.status || "unknown";

      if (!statusMap[statusName]) {
        statusMap[statusName] = 1;
      } else {
        statusMap[statusName]++;
      }
    });

    const formattedStatus = Object.keys(statusMap).map((key) => ({
      name: key,
      value: statusMap[key],
    }));

    setStatusData(formattedStatus);
  }, [reports]);

  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      
      {/* Bar Chart: Cases by Category */}
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

      {/* Pie Chart: Cases by Status */}
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
                label
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
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
