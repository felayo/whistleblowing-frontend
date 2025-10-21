import { Box, Typography } from "@mui/material";
import Sidebar from "../../components/Dashboard/Layout/Sidebar";
import Navbar from "../../components/Dashboard/Layout/Navbar";
import CaseSummaryCard from "../../components/Dashboard/CaseSummaryCard";
import AssignedCasesTable from "../../components/Dashboard/AssignedCasesTable";
import DashboardStats from "../../components/Dashboard/DashboardStats";

const AdminDashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, bgcolor: "#d9d9d9", minHeight: "100vh" }}>
        <Navbar />

        {/* Dashboard content */}
        <Box sx={{ p: 3, mt: 8 }}>
          <Typography variant="h5" fontWeight="bold" pt={3} gutterBottom>
            Welcome, Ayorinde
          </Typography>

          {/* Case Summary Cards */}
          <Box sx={{ mb: 6 }}>
            <CaseSummaryCard />
          </Box>

          {/* Assigned Cases Table */}
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Assigned Cases
          </Typography>
          <AssignedCasesTable />

          {/* Admin Dashboard Charts */}
          <DashboardStats />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard; // Dashboard.jsx
