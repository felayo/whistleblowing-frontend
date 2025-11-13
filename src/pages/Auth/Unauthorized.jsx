import { Typography, Box } from "@mui/material";

const Unauthorized = () => (
  <Box sx={{ textAlign: "center", mt: 10 }}>
    <Typography variant="h4" gutterBottom>
      Unauthorized Access
    </Typography>
    <Typography variant="body1" color="text.secondary">
      You don’t have permission to view this page.
    </Typography>
  </Box>
);

export default Unauthorized;
