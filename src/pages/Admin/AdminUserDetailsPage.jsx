import { useNavigate } from "react-router-dom";

import { Box, Typography, IconButton } from "@mui/material";
import Sidebar from "../../components/Dashboard/Layout/Sidebar";
import Navbar from "../../components/Dashboard/Layout/Navbar";
import UserDetails from "../../components/Dashboard/User/UserDetails";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";



const UserDetailsPage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, bgcolor: "#d9d9d9", minHeight: "100vh" }}>
        <Navbar />

        <Box sx={{ p: 3, mt: 8 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              mb: 2,
            }}
            onClick={() => navigate(-1)}>
            <IconButton aria-label="Go back">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Back
            </Typography>
          </Box>
          <Box>
            <UserDetails />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserDetailsPage;
