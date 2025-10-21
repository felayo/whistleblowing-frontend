import { Box, Typography } from "@mui/material";

import Sidebar from "../../components/Dashboard/AgencyDashboard/Layout/Sidebar";
import Navbar from "../../components/Dashboard/AgencyDashboard/Layout/Navbar";
import Settings from "../../components/Dashboard/AgencyDashboard/Settings";

const AgencySettingsPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, bgcolor: "#d9d9d9", minHeight: "100vh" }}>
        <Navbar />

        {/* Cases content */}
        <Box sx={{ p: 3, mt: 8 }}>
          <Typography variant="h5" fontWeight="bold" pb={3} pt={3} gutterBottom>
            Personal Information
          </Typography>
            <Settings />
        </Box>
      </Box>
    </Box>
  );
};

export default AgencySettingsPage;
