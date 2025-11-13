import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Sidebar from "../../components/Dashboard/Layout/Sidebar";
import Navbar from "../../components/Dashboard/Layout/Navbar";
import CaseDetailsInfo from "../../components/Dashboard/Cases/CaseDetailsInfo";
import CaseMessages from "../../components/Dashboard/Cases/CaseMessages";
import CaseTools from "../../components/Dashboard/Cases/CaseTools";
import CaseInternalNotes from "../../components/Dashboard/Cases/CaseInternalNotes";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useReport } from "../../context/ReportContext";

const CaseDetailsPage = () => {
  const navigate = useNavigate();
  const { caseId } = useParams();

  const { selectedReport, fetchReportById } = useReport();
  // 🧠 Fetch the report details once we have the id
  useEffect(() => {
    if (caseId) fetchReportById(caseId);
  }, [caseId]);

  // Not found or still loading
  if (!selectedReport) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress sx={{ color: "#ff8c00" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, bgcolor: "#d9d9d9", minHeight: "100vh" }}>
        <Navbar />

        <Box sx={{ p: 3, mt: 8 }}>
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 5,
              pl: 2,
              pt: 4,
            }}>
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              onClick={() => navigate(-1)}>
              <IconButton aria-label="Go back">
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
              }}
              onClick={() =>
                console.log("Exporting case:", selectedReport._id)
              }>
              Export
            </Button>
          </Box>

          <Grid container spacing={3}>
            {/* Left Column */}
            <Grid item xs={12} md={8}>
              <CaseDetailsInfo caseData={selectedReport} />
              <CaseMessages caseId={selectedReport._id} />
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={4}>
              <CaseTools report={selectedReport} />
              <CaseInternalNotes caseId={selectedReport._id} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default CaseDetailsPage;
