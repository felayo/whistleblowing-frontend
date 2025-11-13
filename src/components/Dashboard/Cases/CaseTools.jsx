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

import { useAdminData } from "../../../context/AdminDataContext";
import { useReport } from "../../../context/ReportContext";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const CaseTools = ({ report }) => {
  const axiosPrivate = useAxiosPrivate();
  const { categories, agencies, loading: dataLoading } = useAdminData();
  const { fetchReportById, fetchUnassignedReports } = useReport();

  const [category, setCategory] = useState(report?.category?._id || "");
  const [status, setStatus] = useState(report?.status || "pending");
  const [assignedTo, setAssignedTo] = useState(
    report?.agencyAssigned?._id || ""
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const statuses = ["pending", "under review", "resolved", "closed"];

  // Populate local state when props change
  useEffect(() => {
    if (report) {
      setCategory(report.category?._id || "");
      setStatus(report.status || "pending");
      setAssignedTo(report.agencyAssigned?._id || "");
    }
  }, [report]);

  const handleSave = async () => {
    if (!report?._id) return;

    setSaving(true);
    setMessage("");
    const id = report._id;
    let shouldRefreshUnassigned = false;

    try {
      // Update Category
      if (category && category !== report.category?._id) {
        await axiosPrivate.patch(`/admin/reports/${id}/category`, {
          categoryId: category,
        });
      }

      // Update Status
      if (status && status !== report.status) {
        await axiosPrivate.patch(`/admin/reports/${id}/status`, {
          status: status,
        });
      }

      // Update Assigned To
      if (assignedTo && assignedTo !== report.agencyAssigned?._id) {
        await axiosPrivate.patch(`/admin/reports/${id}/assign`, {
          agencyId: assignedTo,
        });
        shouldRefreshUnassigned = true;
      }
      // Always refresh the current report
      await fetchReportById(id);

      // Only refetch unassigned if assignment changed
      if (shouldRefreshUnassigned) {
        await fetchUnassignedReports();
      }

      setMessage("✅ Changes saved successfully.");
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
        Tools
      </Typography>

      {dataLoading ? (
        <Typography>Loading categories and agencies...</Typography>
      ) : (
        <>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}>
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}>
              {statuses.map((s) => (
                <MenuItem key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Assigned to</InputLabel>
            <Select
              value={assignedTo}
              label="Assigned to"
              onChange={(e) => setAssignedTo(e.target.value)}>
              {agencies.map((agency) => (
                <MenuItem key={agency._id} value={agency._id}>
                  {agency.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="warning"
            fullWidth
            onClick={handleSave}
            disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>

          {message && (
            <Typography
              variant="body2"
              color={message.startsWith("✅") ? "green" : "error"}
              sx={{ mt: 1 }}>
              {message}
            </Typography>
          )}
        </>
      )}
    </Paper>
  );
};

export default CaseTools;
