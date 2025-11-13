import { Box, Typography } from "@mui/material";
import Sidebar from "../../components/Dashboard/Layout/Sidebar";
import Navbar from "../../components/Dashboard/Layout/Navbar";
import CaseSummaryCard from "../../components/Dashboard/CaseSummaryCard";
import UnAssignedCasesTable from "../../components/Dashboard/UnAssignedCasesTable";
import DashboardStats from "../../components/Dashboard/DashboardStats";

const AdminDashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: "#d9d9d9", minHeight: "100vh" }}>
        <Navbar />

        <Box sx={{ p: 3, mt: 8 }}>
          <Typography variant="h5" fontWeight="bold" pt={3} gutterBottom>
            Welcome, Admin!
          </Typography>

          <Box sx={{ mb: 6 }}>
            <CaseSummaryCard  />
          </Box>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            UnAssigned Cases
          </Typography>
          <UnAssignedCasesTable />

          <DashboardStats />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
