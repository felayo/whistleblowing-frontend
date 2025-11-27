import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import Sidebar from "../../components/Dashboard/AgencyDashboard/Layout/Sidebar";
import Navbar from "../../components/Dashboard/AgencyDashboard/Layout/Navbar";
import PendingAgencyCasesTable from "../../components/Dashboard/AgencyDashboard/PendingAgencyCasesTable";
import { AuthContext } from "../../context/AuthContext";

const AgencyDashboard = () => {
  const { auth } = useContext(AuthContext);
  console.log("🚀 AgencyDashboard auth:", auth);
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, bgcolor: "#d9d9d9", minHeight: "100vh" }}>
        <Navbar />

        {/* Dashboard content */}
        <Box sx={{ p: 3, mt: 8 }}>
          <Typography variant="h5" fontWeight="bold" pt={3} mb={4} gutterBottom>
            Welcome, {auth?.user?.username || auth?.user?.email}!
          </Typography>

          {/* Assigned Cases Table */}
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Pending Cases
          </Typography>

          <PendingAgencyCasesTable />
        </Box>
      </Box>
    </Box>
  );
};

export default AgencyDashboard;
