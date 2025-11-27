// components/AnalyticsCharts.jsx
import { useState, useMemo } from "react";
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
import { useAgencyReport } from "../../../context/AgencyReportContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

const AnalyticsCharts = () => {
  const { agencyReports } = useAgencyReport();

  // --- State for Filters ---
  const [caseType, setCaseType] = useState("All");
  const [status, setStatus] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  /** ===========================
   *  Filtered Reports
   * ============================*/
  const filteredReports = useMemo(() => {
    if (!agencyReports) return [];

    return agencyReports.filter((r) => {
      const matchType = caseType === "All" || r.category?.name === caseType;
      const matchStatus = status === "All" || r.status === status;

      let matchDate = true;
      if (dateFrom) matchDate = new Date(r.createdAt) >= new Date(dateFrom);
      if (dateTo) matchDate = matchDate && new Date(r.createdAt) <= new Date(dateTo);

      return matchType && matchStatus && matchDate;
    });
  }, [agencyReports, caseType, status, dateFrom, dateTo]);

  /** ===========================
   *  Cases by Month (Line Chart)
   * ============================*/
  const caseTrends = useMemo(() => {
    const trendsMap = {};
    filteredReports.forEach((r) => {
      const month = new Date(r.createdAt).toLocaleString("default", { month: "short" });
      if (!trendsMap[month]) trendsMap[month] = { month, opened: 0, closed: 0 };
      trendsMap[month].opened++;
      if (r.isResolved) trendsMap[month].closed++;
    });
    return Object.values(trendsMap);
  }, [filteredReports]);

  /** ===========================
   *  Categories Pie Chart
   * ============================*/
  const categoriesData = useMemo(() => {
    const catMap = {};
    filteredReports.forEach((r) => {
      const name = r.category?.name || "Uncategorised";
      if (!catMap[name]) catMap[name] = 0;
      catMap[name]++;
    });
    return Object.keys(catMap).map((key) => ({ name: key, value: catMap[key] }));
  }, [filteredReports]);

  /** ===========================
   *  Resolution Status Bar Chart
   * ============================*/
  const resolutionData = useMemo(() => {
    const statusMap = {};
    filteredReports.forEach((r) => {
      const st = r.status || "Unknown";
      if (!statusMap[st]) statusMap[st] = 0;
      statusMap[st]++;
    });
    return Object.keys(statusMap).map((key) => ({ name: key, value: statusMap[key] }));
  }, [filteredReports]);

  /** ===========================
   *  Top Issues (most reported titles)
   * ============================*/
  const topIssues = useMemo(() => {
    const issueMap = {};
    filteredReports.forEach((r) => {
      const t = r.title || "Untitled";
      if (!issueMap[t]) issueMap[t] = 0;
      issueMap[t]++;
    });
    const sorted = Object.keys(issueMap)
      .map((k) => ({ issue: k, agencyReports: issueMap[k] }))
      .sort((a, b) => b.agencyReports - a.agencyReports);
    return sorted.slice(0, 5);
  }, [filteredReports]);

  /** ===========================
   *  Agency Performance
   * ============================*/
  const agencyPerformance = useMemo(() => {
    const agencyMap = {};
    filteredReports.forEach((r) => {
      const agencyName = r.agencyAssigned?.name || "Unassigned";
      if (!agencyMap[agencyName]) agencyMap[agencyName] = { agency: agencyName, handled: 0, pending: 0 };
      agencyMap[agencyName].handled++;
      if (!r.isResolved) agencyMap[agencyName].pending++;
    });
    return Object.values(agencyMap);
  }, [filteredReports]);

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
                {Array.from(new Set(agencyReports?.map(r => r.category?.name || "Uncategorised"))).map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
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
                {Array.from(new Set(agencyReports?.map(r => r.status))).map((st) => (
                  <MenuItem key={st} value={st}>{st}</MenuItem>
                ))}
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
              onClick={() => {}}
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
            <Typography variant="h6" gutterBottom>Case Trends Over Time</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={caseTrends}>
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
            <Typography variant="h6" gutterBottom>Case Categories</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoriesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoriesData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
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
            <Typography variant="h6" gutterBottom>Resolution Status</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resolutionData}>
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
            <Typography variant="h6" gutterBottom>Top Reported Issues</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topIssues} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="issue" type="category" />
                <Tooltip />
                <Bar dataKey="agencyReports" fill="#0088FE" />
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
              <BarChart data={agencyPerformance}>
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
