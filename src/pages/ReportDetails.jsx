import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  CircularProgress,
  Typography,
  Box,
  Paper,
  Grid,
  Chip,
  Stack,
} from "@mui/material";

import Navbar from "../components/Home/Navbar";
import CaseDetails from "../components/Reports/CaseDetails";
import Messages from "../components/Reports/Messages";
import FilePreview from "../components/FilePreview";
import { api } from "../api/axios";

const ReportDetailsPage = () => {
  const { password } = useParams();
  const [caseDetails, setCaseDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [evidenceFiles, setEvidenceFiles] = useState([]);
  const [reporterType, setReporterType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.post("/reports/follow-up", { password });
        const data = response.data;

        if (!data.success) {
          throw new Error(data.message || "Unable to fetch report");
        }

        const report = data.data;

        const formattedDetails = {
          "Case ID": report.caseID,
          "Date and Time": new Date(report.createdAt).toLocaleString(),
          Subject: report.title || "-",
          Description: report.description || "-",
          Name: report.reporterName || "-",
          Phone: report.reporterPhone || "-",
          Email: report.reporterEmail || "-",
          Status: report.status || "-",
          Category: report.category?.name || "-",
          Agency: report.agencyAssigned?.name || "-",
          "Case Location": report.location || "-",
        };

        setCaseDetails(formattedDetails);
        setReporterType(report.reporterType || "-");
        setComments(report.comments || []);
        setEvidenceFiles(report.evidenceFiles || []);
      } catch (err) {
        console.error("Error fetching report:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [password]);

  return (
    <Container maxWidth="md">
      <Navbar />

      {loading && (
        <Box textAlign="center" mt={5}>
          <CircularProgress sx={{ color: "#ff8c00" }} />
        </Box>
      )}

      {!loading && error && (
        <Typography color="error" align="center" mt={5}>
          {error}
        </Typography>
      )}

      {!loading && caseDetails && (
        <>
          <Box mt={3}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ color: "#ff8c00" }}>
                Case Details
              </Typography>

              <Chip
                label={`Reporter: ${reporterType}`}
                sx={{
                  backgroundColor: "#ff8c00",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            </Grid>

            <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
              <CaseDetails details={caseDetails} />
            </Paper>

            {/* Evidence Files Section */}
            {evidenceFiles.length > 0 && (
              <>
                <Typography
                  variant="h6"
                  sx={{ color: "#ff8c00", fontWeight: 600, mt: 3, mb: 1 }}>
                  Evidence Files
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  {evidenceFiles.map((file) => (
                    <FilePreview key={file._id} file={file} />
                  ))}
                </Stack>
              </>
            )}

            {/* Comments Section */}
            <Box mt={4}>
              <Messages
                comments={comments || []}
                password={password}
                userRole={reporterType} // pass reporterType as userRole
                onNewMessage={(updatedData) => {
                  setComments(updatedData.comments || []);
                  setEvidenceFiles(updatedData.evidenceFiles || []);
                }}
              />
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default ReportDetailsPage;
