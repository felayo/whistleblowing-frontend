import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Box, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ReportIcon from "@mui/icons-material/AssignmentTurnedIn";
import AddIcon from "@mui/icons-material/Add";

import FollowUpDialog from "./FollowUpDialog";

const Buttons = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (password) => {
    console.log("Password submitted:", password);
  };
  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={4}>
          <Tooltip title="Click to report new cases" arrow>
            <Button
              variant="contained"
              component={Link}
              to="/create-report"
              startIcon={<AddIcon />}
              sx={{
                py: 1,
                fontWeight: "bold",
                borderRadius: 1.5,
                backgroundColor: "#ff8c00",
                textTransform: "none",
              }}
              disableElevation>
              Create Report
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Tooltip title="Click to follow up your existing reports" arrow>
            <Button
              variant="outlined"
              onClick={handleOpen}
              startIcon={<ReportIcon />}
              sx={{
                color: "#ff8c00",
                py: 1,
                fontWeight: "bold",
                borderRadius: 1.5,
                textTransform: "none",
                borderColor: "#ff8c00",
                "&:hover": {
                  borderColor: "#e67a00",
                  backgroundColor: "rgba(255,140,0,0.04)",
                },
              }}
              disableElevation>
              Follow Up
            </Button>
            <FollowUpDialog
              open={open}
              onClose={handleClose}
              onSubmit={handleSubmit}
            />
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Buttons;
