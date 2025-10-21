import { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

// --- Sample Data ---
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

const rawData = {
  caseTrends: [
    { month: "Jan", opened: 40, closed: 20, type: "Vandalism", status: "Resolved" },
    { month: "Feb", opened: 60, closed: 35, type: "Fraud", status: "Pending" },
    { month: "Mar", opened: 50, closed: 40, type: "Corruption", status: "Resolved" },
    { month: "Apr", opened: 70, closed: 50, type: "Vandalism", status: "In Progress" },
    { month: "May", opened: 90, closed: 60, type: "Harassment", status: "Pending" },
  ],
  categories: [
    { name: "Vandalism", value: 45 },
    { name: "Fraud", value: 25 },
    { name: "Corruption", value: 15 },
    { name: "Harassment", value: 10 },
    { name: "Others", value: 5 },
  ],
  resolutionStatus: [
    { name: "Resolved", value: 120 },
    { name: "Pending", value: 80 },
    { name: "In Progress", value: 50 },
  ],
  topIssues: [
    { issue: "Streetlight Vandalism", reports: 40 },
    { issue: "Pipeline Damage", reports: 30 },
    { issue: "Road Misuse", reports: 25 },
    { issue: "Bribery", reports: 20 },
    { issue: "Fraudulent Billing", reports: 15 },
  ],
  agencyPerformance: [
    { agency: "LASMA", handled: 120, pending: 30 },
    { agency: "LAWMA", handled: 90, pending: 40 },
    { agency: "Police", handled: 150, pending: 50 },
    { agency: "Ministry of Works", handled: 60, pending: 20 },
  ],
};

const AnalyticsCharts = () => {
  // --- State for Filters ---
  const [caseType, setCaseType] = useState("All");
  const [status, setStatus] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filteredData, setFilteredData] = useState(rawData);

  const handleApplyFilters = () => {
    // Mock filtering (you can replace with backend API later)
    let trends = rawData.caseTrends;

    if (caseType !== "All") {
      trends = trends.filter((t) => t.type === caseType);
    }
    if (status !== "All") {
      trends = trends.filter((t) => t.status === status);
    }
    // Date filter (mock: not implemented fully since data lacks actual dates)

    setFilteredData({
      ...rawData,
      caseTrends: trends,
    });

    console.log("Filters applied:", { caseType, status, dateFrom, dateTo });
  };

  return (
    <Box>
      {/* --- Filters Toolbar --- */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Case Type */}
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Case Type</InputLabel>
              <Select
                value={caseType}
                label="Case Type"
                onChange={(e) => setCaseType(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Vandalism">Vandalism</MenuItem>
                <MenuItem value="Fraud">Fraud</MenuItem>
                <MenuItem value="Corruption">Corruption</MenuItem>
                <MenuItem value="Harassment">Harassment</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Status */}
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Date From */}
          <Grid item xs={12} md={2}>
            <TextField
              label="From"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </Grid>

          {/* Date To */}
          <Grid item xs={12} md={2}>
            <TextField
              label="To"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </Grid>

          {/* Apply Button */}
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleApplyFilters}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* --- Charts Section --- */}
      <Grid container spacing={3}>
        {/* Case Trends */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Case Trends Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData.caseTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="opened" stroke="#8884d8" />
                <Line type="monotone" dataKey="closed" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Categories Breakdown */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Case Categories
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={filteredData.categories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {filteredData.categories.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Resolution Status */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Resolution Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData.resolutionStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Top Issues */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Top Reported Issues
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData.topIssues} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="issue" type="category" />
                <Tooltip />
                <Bar dataKey="reports" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Agency Performance */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Agencies Performance (Handled vs Pending Cases)
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={filteredData.agencyPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="agency" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="handled" fill="#00C49F" name="Handled Cases" />
                <Bar dataKey="pending" fill="#FF8042" name="Pending Cases" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsCharts;
