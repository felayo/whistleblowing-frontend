import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import { useAgencyReport } from "../../../context/AgencyReportContext";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const ChangeStatus = ({ report }) => {
  const axiosPrivate = useAxiosPrivate();

  const { fetchReportsPerAgency, fetchReportByIdPerAgency } = useAgencyReport();

  const [status, setStatus] = useState(report?.status || "pending");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const statuses = ["pending", "under review", "resolved", "closed"];

  useEffect(() => {
    if (report) {
      setStatus(report.status || "pending");
    }
  }, [report]);

  const handleSave = async () => {
    if (!report?._id) return;

    setSaving(true);
    setMessage("");

    const id = report._id;

    try {
      // FIXED ENDPOINT
      if (status !== report.status) {
        await axiosPrivate.patch(`/agency/${id}/status`, { status });

        // Refresh data
        await fetchReportByIdPerAgency(id);
        await fetchReportsPerAgency();
      }

      setMessage("✅ Status updated successfully.");
    } catch (err) {
      console.error("❌ Error updating case:", err);
      setMessage("⚠️ Failed to save changes.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Change Case Status
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          label="Status"
          onChange={(e) => setStatus(e.target.value)}
        >
          {statuses.map((s) => (
            <MenuItem key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="warning"
        fullWidth
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save"}
      </Button>

      {message && (
        <Typography
          variant="body2"
          color={message.startsWith("✅") ? "green" : "error"}
          sx={{ mt: 1 }}
        >
          {message}
        </Typography>
      )}
    </Paper>
  );
};

export default ChangeStatus;
