import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function ReportSubmitted({ caseId, password }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([`Case ID: ${caseId}\nPassword: ${password}`], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `report_${caseId}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <Box>
      <Paper
        elevation={1}
        sx={{
          mt: 5,
          p: 4,
          border: "1px solid #555",
          bgcolor: "#e0e0e0",
        }}>
        {/* Case ID */}
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Case ID: {caseId}
          </Typography>
          <InfoOutlinedIcon fontSize="small" />
        </Box>

        {/* Report Submitted */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          The report was submitted. Save the following password:
        </Typography>

        {/* Important Notice */}
        <Typography variant="body2" color="error" gutterBottom>
          IMPORTANT:
          <Typography component="span" color="text.primary">
            {" "}
            Save the password below and store it securely. Your report has been
            sent and the password gives you access to this report. Do not share
            the password with anyone.
          </Typography>
        </Typography>

        {/* Password Info */}
        <Typography variant="body2" sx={{ mt: 2 }}>
          Your unique password, that must be saved is:
        </Typography>

        {/* Password with copy button */}
        <Box
          display="flex"
          alignItems="center"
          sx={{
            border: "1px solid #ddd",
            borderRadius: 1,
            p: 1,
            mb: 2,
            backgroundColor: "#fff",
          }}>
          <TextField
            fullWidth
            value={password}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
              sx: { fontFamily: "monospace" },
            }}
          />
          <Tooltip title={copied ? "Copied!" : "Copy"}>
            <IconButton onClick={handleCopy}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Download Button */}
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          onClick={handleDownload}
          sx={{ mt: 3, borderColor: "black", color: "black" }}>
          Download
        </Button>
      </Paper>
    </Box>
  );
}
