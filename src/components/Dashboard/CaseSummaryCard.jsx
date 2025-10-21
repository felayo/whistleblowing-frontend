// components/DashboardStats.jsx
import { Grid, Paper, Typography } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const stats = [
  { label: "Total Cases", value: 120, icon: <FolderOpenIcon fontSize="large" />, color: "#1976d2" },
  { label: "New Cases", value: 45, icon: <NewReleasesIcon fontSize="large" />, color: "#ff9800" },
  { label: "Open Cases", value: 60, icon: <CheckCircleIcon fontSize="large" />, color: "#4caf50" },
  { label: "Closed Cases", value: 15, icon: <DoneAllIcon fontSize="large" />, color: "#9c27b0" },
];

const CaseSummaryCard = () => {
  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={6} md={3} key={stat.label}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              borderTop: `4px solid ${stat.color}`,
              borderRadius: 2,
            }}
          >
            <Typography sx={{ color: stat.color, mb: 1 }}>
              {stat.icon}
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {stat.value}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {stat.label}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default CaseSummaryCard;
