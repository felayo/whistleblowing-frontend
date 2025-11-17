import { Box, Typography } from "@mui/material";
import Sidebar from "../../components/Dashboard/AgencyDashboard/Layout/Sidebar";
import Navbar from "../../components/Dashboard/AgencyDashboard/Layout/Navbar";
import AllCasesTable from "../../components/Dashboard/Cases/AllCasesTable";

const AgencyDashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, bgcolor: "#d9d9d9", minHeight: "100vh" }}>
        <Navbar />

        {/* Dashboard content */}
        <Box sx={{ p: 3, mt: 8 }}>
          <Typography variant="h5" fontWeight="bold" pt={3} gutterBottom>
            Welcome, LAWMA
          </Typography>

          {/* Assigned Cases Table */}
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Assigned to me
          </Typography>

          <AllCasesTable />
        </Box>
      </Box>
    </Box>
  );
};

export default AgencyDashboard;
