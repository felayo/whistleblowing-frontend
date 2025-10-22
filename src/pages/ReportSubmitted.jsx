import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Alert,
  Stack,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PrintIcon from "@mui/icons-material/Print";
import { useState } from "react";

export default function ReportSubmitted() {
  const location = useLocation();
  const navigate = useNavigate();
  const { caseID, password } = location.state || {};
  const [copied, setCopied] = useState(false);

  if (!caseID || !password) {
    return (
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          ⚠️ No submission data found.
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Please submit a new report to receive your case details.
        </Typography>
        <Button
          sx={{
            mt: 3,
            bgcolor: "#ff8c00",
            color: "#fff",
            "&:hover": { bgcolor: "#e67e00" },
          }}
          variant="contained"
          onClick={() => navigate("/")}
        >
          Go to Report Form
        </Button>
      </Box>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`Case ID: ${caseID}\nPassword: ${password}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([`Case ID: ${caseID}\nPassword: ${password}`], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `report_${caseID}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head><title>Report Details</title></head>
        <body>
          <h2>Whistleblowing Report Submitted</h2>
          <p><strong>Case ID:</strong> ${caseID}</p>
          <p><strong>Password:</strong> ${password}</p>
          <p>Please store this information securely.</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderTop: "6px solid #ff8c00",
          borderRadius: 3,
          background: "#fffaf3",
        }}
      >
        <Alert
          icon={false}
          severity="success"
          sx={{
            mb: 3,
            bgcolor: "#ff8c00",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: 2,
          }}
        >
          ✅ Report Submitted Successfully
        </Alert>

        <Typography
          variant="h6"
          gutterBottom
          fontWeight="bold"
          color="#333"
        >
          Case Details
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, color: "#444" }}>
          Please save the details below securely. You’ll need them to view or
          follow up on your report.
        </Typography>

        <Box
          sx={{
            border: "1px solid #ddd",
            borderRadius: 2,
            p: 2,
            mb: 3,
            bgcolor: "#fff",
          }}
        >
          <Typography variant="body1" sx={{ mb: 1, color: "#000" }}>
            <strong>Case ID:</strong> {caseID}
          </Typography>
          <Typography variant="body1" sx={{ color: "#000" }}>
            <strong>Password:</strong> {password}
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Tooltip title={copied ? "Copied!" : "Copy"}>
            <IconButton
              onClick={handleCopy}
              sx={{
                color: copied ? "green" : "#ff8c00",
                border: "1px solid #ff8c00",
                "&:hover": { bgcolor: "rgba(255,140,0,0.1)" },
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>

          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={handleDownload}
            sx={{
              color: "#ff8c00",
              borderColor: "#ff8c00",
              "&:hover": { bgcolor: "rgba(255,140,0,0.1)" },
            }}
          >
            Download
          </Button>

          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
            sx={{
              color: "#ff8c00",
              borderColor: "#ff8c00",
              "&:hover": { bgcolor: "rgba(255,140,0,0.1)" },
            }}
          >
            Print
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
