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
import Messages from "../../components/Reports/Messages";
import CaseTools from "../../components/Dashboard/Cases/CaseTools";
import CaseInternalNotes from "../../components/Dashboard/Cases/CaseInternalNotes";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useReport } from "../../context/ReportContext";

const CaseDetailsPage = () => {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const { selectedReport, fetchReportById, updateSelectedReportComments } = useReport();

  // Fetch report on load
  useEffect(() => {
    if (caseId) fetchReportById(caseId);
  }, [caseId]);

  // Still loading (nothing fetched yet)
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
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 5,
              pl: 2,
              pt: 4,
            }}
          >
            {/* Back button */}
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              onClick={() => navigate(-1)}
            >
              <IconButton aria-label="Go back">
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Back
              </Typography>
            </Box>

            {/* Export */}
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
              onClick={() => console.log("Export case:", selectedReport._id)}
            >
              Export
            </Button>
          </Box>

          <Grid container spacing={3}>
            {/* MAIN LEFT COLUMN */}
            <Grid item xs={12} md={8}>
              <CaseDetailsInfo caseDetails={selectedReport} />

              {/* Messages Section */}
              <Messages
                reportId={selectedReport._id}
                comments={selectedReport.comments}
                userRole="admin"
                onNewMessage={(updatedData) => {
                  // updatedData is array of comments (admin controller response)
                  updateSelectedReportComments(updatedData);
                }}
              />
            </Grid>

            {/* RIGHT COLUMN */}
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
