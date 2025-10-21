import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Box,
  CardContent,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "../../assets/lagos.png"; // Ensure you have the logo in the specified path

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace with your backend API call
    console.log("Admin Login:", { email, password });
    // Example: axios.post("/api/auth/login", { email, password })
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Logo centered above the card */}
      <img
        src={logo} // place this file inside your public/ folder
        alt="Lagos State Logo"
        style={{ width: 100, marginBottom: 50 }}
      />

      <Card sx={{ width: 380, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            align="center"
            gutterBottom
          >
            Administrator Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2, padding: 1.2, borderRadius: 2, backgroundColor: "#f57c00", "&:hover": { backgroundColor: "#ef6c00" }   }}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
