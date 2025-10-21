import {
  Paper,
  Typography,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const CaseDetailsInfo = () => {
  const caseData = {
    id: "CMQH-O-1",
    anonymous: true,
    subject: "Vandalism of Transformer",
    description: "This guy was seen removing transformer components",
    date: "18 Sept 2024, 11:53:46",
    name: "",
    phone: "",
    email: "",
    location: "",
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      {/* Case title & ID */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {caseData.subject}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            bgcolor: "#E3E8FF",
            color: "#3F51B5",
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontWeight: "bold",
          }}
        >
          {caseData.id}
        </Typography>
      </Box>

      {/* Section header + Anonymous badge */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          gutterBottom
          sx={{ mt: 1 }}
        >
          Details
        </Typography>

        {caseData.anonymous && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#f5f5f5",
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
            }}
          >
            <PersonOutlineIcon sx={{ mr: 0.5, fontSize: 16, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              Anonymous
            </Typography>
          </Box>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Grid-based table layout */}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">
            Date and time
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">{caseData.date}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">
            Subject
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">{caseData.subject}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">
            Description
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">{caseData.description}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">
            Name
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">{caseData.name || "-"}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">
            Phone
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">{caseData.phone || "-"}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">
            Email
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">{caseData.email || "-"}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">
            Case Location
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">{caseData.location || "-"}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CaseDetailsInfo;
