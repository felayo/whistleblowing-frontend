import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import api from "../../api/axios";

const FollowUpDialog = ({ open, onClose, onSubmit }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!password) return setError("Please enter your password.");

    setError("");
    setLoading(true);

    try {
      // POST to backend for validation
      const res = await api.post("/reports/follow-up", { password });

      if (res.data.success) {
        navigate(`/follow-up/${password}`);
        onClose();
      } else {
        setError(res.data.message || "Invalid password. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Password required to access
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 2 }}>
          When you created the case you were given a unique password. Please
          paste the password into the input below.
        </Typography>

        <Box>
          <Typography sx={{ mb: 1, fontWeight: "bold" }}>Password</Typography>
          <TextField
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          ❌ Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: "#ff8c00",
            textTransform: "none",
            "&:hover": { backgroundColor: "#e67a00" },
          }}>
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Go to report"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FollowUpDialog;
