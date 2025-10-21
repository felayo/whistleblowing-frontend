import { Box, Typography, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import Sidebar from "../../components/Dashboard/AgencyDashboard/Layout/Sidebar";
import Navbar from "../../components/Dashboard/AgencyDashboard/Layout/Navbar";
import CasesHeader from "../../components/Dashboard/Cases/CasesHeader";
import AssignedCasesTable from "../../components/Dashboard/AssignedCasesTable";

const AgencyCasePage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, bgcolor: "#d9d9d9", minHeight: "100vh" }}>
        <Navbar />

        {/* Cases content */}
        <Box sx={{ p: 3, mt: 8 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              pl: 2,
            }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              pb={3}
              pt={3}
              gutterBottom>
              Cases
            </Typography>
            {/* Export Button */}
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              sx={{ textTransform: "none" }}>
              Export
            </Button>
          </Box>

          <CasesHeader />
          {/* Assigned Cases Table */}
          <AssignedCasesTable />
        </Box>
      </Box>
    </Box>
  );
};

export default AgencyCasePage;
