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
} from "@mui/material";

const FollowUpDialog = ({ open, onClose, onSubmit }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!password) return;

    // For now: just simulate successful password entry
    // Later, we can verify with backend
    navigate(`/follow-up/${password}`);
    onClose();
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
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          sx={{ textTransform: "none" }}>
          ❌ Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: "#ff8c00",
            textTransform: "none",
            "&:hover": { backgroundColor: "#e67a00" },
          }}>
          Go to report
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FollowUpDialog;
