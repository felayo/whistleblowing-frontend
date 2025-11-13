import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
  Grid,
  Button,
  Radio,
  Stack,
  FormHelperText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { api } from "../../api/axios";

const MAX_FILE_SIZE = 100 * 1024 * 10; // 10 MB

export default function ReportingForm() {
  const navigate = useNavigate();

  const [reporterType, setReportType] = useState("anonymous");
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    reporterName: "",
    reporterPhone: "",
    reporterEmail: "",
    evidenceFiles: [],
  });
  const [fileErrors, setFileErrors] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleReportTypeChange = (type) => {
    if (type === "anonymous") {
      setForm((f) => ({
        ...f,
        reporterName: "",
        reporterPhone: "",
        reporterEmail: "",
      }));
    }
    setReportType(type);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFiles = (e) => {
    setFileErrors("");
    const files = Array.from(e.target.files || []);
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        setFileErrors(`File "${file.name}" exceeds 10MB limit.`);
        return;
      }
    }
    setForm((f) => ({ ...f, evidenceFiles: files }));
  };

  const removeFile = (index) => {
    setForm((f) => {
      const newFiles = [...f.evidenceFiles];
      newFiles.splice(index, 1);
      return { ...f, evidenceFiles: newFiles };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFileErrors("");

    if (!form.title.trim()) return alert("Please enter title.");
    if (!form.description.trim()) return alert("Please enter description.");
    if (!form.location.trim())
      return alert("Please enter incident location.");
    if (form.evidenceFiles.some((f) => f.size > MAX_FILE_SIZE)) {
      setFileErrors("One or more files exceed the 100MB limit.");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("location", form.location);
      formData.append("reporterType", reporterType);

      if (reporterType === "confidential") {
        formData.append("reporterName", form.reporterName);
        formData.append("reporterPhone", form.reporterPhone);
        formData.append("reporterEmail", form.reporterEmail);
      }

      form.evidenceFiles.forEach((file) =>
        formData.append("evidenceFiles", file)
      );

      const response = await api.post("/reports", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { caseID, generatedPassword } = response.data.data;
      let password = generatedPassword;

      navigate("/report-submitted", { state: { caseID, password } });

      setForm({
        title: "",
        description: "",
        location: "",
        reporterName: "",
        reporterPhone: "",
        reporterEmail: "",
        evidenceFiles: [],
      });
      setReportType("anonymous");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Error submitting report. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      {/* Back */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={() => navigate(-1)} aria-label="Go back">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body1" sx={{ ml: 1 }}>
          Back
        </Typography>
      </Box>

      <Paper
        variant="outlined"
        sx={{ p: 3, backgroundColor: "#d9d9d9", borderColor: "#bdbdbd" }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Create New Report
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Subject */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Subject
            </Typography>
            <TextField
              fullWidth
              size="small"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Brief title"
              sx={{ backgroundColor: "#fff" }}
            />
          </Box>

          {/* Report mode */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Choose how you would like to report
            </Typography>

            <Stack spacing={1}>
              <Box
                onClick={() => handleReportTypeChange("anonymous")}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  p: 2,
                  bgcolor: reporterType === "anonymous" ? "#fff" : "#fafafa",
                  border: "1px solid #cfcfcf",
                  borderLeft:
                    reporterType === "anonymous"
                      ? "6px solid #ff8c00"
                      : "1px solid #cfcfcf",
                  cursor: "pointer",
                }}
              >
                <Radio
                  checked={reporterType === "anonymous"}
                  value="anonymous"
                  sx={{ mt: 0.5 }}
                />
                <Box>
                  <Typography fontWeight={700}>Report anonymously</Typography>
                  <Typography variant="body2">
                    You can choose to report anonymously if you prefer not to
                    provide your identity.
                  </Typography>
                </Box>
              </Box>

              <Box
                onClick={() => handleReportTypeChange("confidential")}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  p: 2,
                  bgcolor: reporterType === "confidential" ? "#fff" : "#fafafa",
                  border: "1px solid #cfcfcf",
                  borderLeft:
                    reporterType === "confidential"
                      ? "6px solid #ff8c00"
                      : "1px solid #cfcfcf",
                  cursor: "pointer",
                }}
              >
                <Radio
                  checked={reporterType === "confidential"}
                  value="confidential"
                  sx={{ mt: 0.5 }}
                />
                <Box>
                  <Typography fontWeight={700}>
                    Report confidentially
                  </Typography>
                  <Typography variant="body2">
                    You can choose to report confidentially. Your identity will
                    only be known to those handling your case.
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>

          {/* Description */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Description
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              size="small"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the incident (who, what, where, when)..."
              sx={{ backgroundColor: "#fff" }}
            />
          </Box>

          {/* Confidential details */}
          {reporterType === "confidential" && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Your details (visible only to case handlers)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    name="reporterName"
                    label="Name"
                    value={form.reporterName}
                    onChange={handleChange}
                    sx={{ backgroundColor: "#fff" }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    name="reporterPhone"
                    label="Phone (optional)"
                    value={form.reporterPhone}
                    onChange={handleChange}
                    sx={{ backgroundColor: "#fff" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    name="reporterEmail"
                    label="Email (optional)"
                    value={form.reporterEmail}
                    onChange={handleChange}
                    sx={{ backgroundColor: "#fff" }}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Incident location */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Incident Location
            </Typography>
            <TextField
              fullWidth
              size="small"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Street, landmark, or GPS"
              sx={{ backgroundColor: "#fff" }}
            />
          </Box>

          {/* Files */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Evidence Files
            </Typography>

            <label htmlFor="file-upload">
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFiles}
                style={{ display: "none" }}
                accept="image/*,video/*,application/pdf"
              />
              <Box
                component="span"
                sx={{
                  display: "block",
                  py: 6,
                  border: "2px dashed #9e9e9e",
                  borderRadius: 1,
                  textAlign: "center",
                  cursor: "pointer",
                  bgcolor: "#f7f7f7",
                }}
              >
                <CloudUploadIcon sx={{ fontSize: 36, mb: 1 }} />
                <Typography>Upload file (100mb max)</Typography>
              </Box>
            </label>

            {fileErrors && (
              <FormHelperText error sx={{ mt: 1 }}>
                {fileErrors}
              </FormHelperText>
            )}

            {form.evidenceFiles.length > 0 && (
              <Stack spacing={1} sx={{ mt: 2 }}>
                {form.evidenceFiles.map((f, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #ddd",
                      p: 1,
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2">{f.name}</Typography>
                    <Button size="small" onClick={() => removeFile(i)}>
                      Remove
                    </Button>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>

          {/* Submit */}
          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              disableElevation
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#ff8c00",
                "&:hover": { bgcolor: "#e67a00" },
                textTransform: "none",
                fontWeight: "bold",
              }}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
