import { useNavigate } from "react-router-dom";

import { Box, Typography, Grid, Button, IconButton } from "@mui/material";
import Sidebar from "../../components/Dashboard/Layout/Sidebar";
import Navbar from "../../components/Dashboard/Layout/Navbar";
import CaseDetailsInfo from "../../components/Dashboard/Cases/CaseDetailsInfo";
import CaseMessages from "../../components/Dashboard/Cases/CaseMessages";
import CaseTools from "../../components/Dashboard/Cases/CaseTools";
import CaseInternalNotes from "../../components/Dashboard/Cases/CaseInternalNotes";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const mockCase = {
  date: "18 Sept 2024, 11:53:46",
  subject: "Vandalism of Transformer",
  description: "This guy was seen removing transformer components.",
  name: "",
  phone: "",
  email: "",
  location: "Ikeja, Lagos",
};

const CaseDetailsPage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, bgcolor: "#d9d9d9", minHeight: "100vh" }}>
        <Navbar />

        <Box sx={{ p: 3, mt: 8 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 5,
              pl: 2,
              pt: 4,
            }}>
            <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => navigate(-1)}>
              <IconButton  aria-label="Go back">
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Back
              </Typography>
            </Box>

            <Button
              disableElevation
              variant="contained"
              color="inherit"
              startIcon={<FileDownloadIcon />}
              sx={{
                py: 1,
                fontWeight: "bold",
                backgroundColor: "#f6f6f6",
                textTransform: "none",
              }}>
              Export
            </Button>
          </Box>

          <Grid container spacing={3}>
            {/* Left Column */}
            <Grid item xs={12} md={8}>
              <CaseDetailsInfo caseData={mockCase} />
              <CaseMessages />
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={4}>
              <CaseTools
                category="Graffiti"
                status="Resolved"
                assignedTo="KAI"
              />
              <CaseInternalNotes />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default CaseDetailsPage; // Dashboard.jsx
