import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Button,
  
  TextField,
  MenuItem,
} from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";

const UserDetails = () => {
  const { userId } = useParams();

  // Dummy users list (in real app, fetch from backend)
  const users = [
    {
      id: 1,
      initials: "AF",
      firstName: "Tade",
      lastName: "Okunu",
      agency: "LAWMA",
      email: "ajibaye@gmail.com",
      permission: "Administrator",
    },
    {
      id: 2,
      initials: "BA",
      firstName: "Bola",
      lastName: "Ade",
      agency: "LASAA",
      email: "bola@email.com",
      permission: "Editor",
    },
  ];

  const user = users.find((u) => u.id.toString() === userId);

  if (!user) {
    return (
      <Box p={4}>
        <Typography variant="h6">User not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      

      {/* User header */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {user.firstName} {user.lastName}
      </Typography>

      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 1,
          p: 4,
          border: "1px solid #e0e0e0",
          
        }}
      >
        {/* Avatar + Change button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar
            sx={{
              bgcolor: "#ff8c00",
              width: 80,
              height: 80,
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {user.initials}
          </Avatar>
          <Button variant="outlined" component="label">
            Change
            <input type="file" hidden />
          </Button>
        </Box>

        {/* Form Fields */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="First Name"
            defaultValue={user.firstName}
            fullWidth
          />
          <TextField
            label="Last Name"
            defaultValue={user.lastName}
            fullWidth
          />
        </Box>

        <TextField
          label="Agency"
          select
          fullWidth
          defaultValue={user.agency}
          sx={{ mb: 3 }}
        >
          <MenuItem value="LAWMA">LAWMA</MenuItem>
          <MenuItem value="LASAA">LASAA</MenuItem>
          <MenuItem value="LASEMA">LASEMA</MenuItem>
        </TextField>

        <TextField
          label="Email"
          type="email"
          fullWidth
          defaultValue={user.email}
          sx={{ mb: 3 }}
        />

        <TextField
          label="Permission"
          select
          fullWidth
          defaultValue={user.permission}
          sx={{ mb: 4 }}
        >
          <MenuItem value="Administrator">Administrator</MenuItem>
          <MenuItem value="Editor">Editor</MenuItem>
          <MenuItem value="Viewer">Viewer</MenuItem>
        </TextField>

        {/* Actions */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#ff8c00", px: 4 }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserDetails;
