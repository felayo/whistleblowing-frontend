import { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { api, axiosPrivate } from "../../api/axios";
import logo from "../../assets/lagos.png";

const Login = () => {
  const navigate = useNavigate();
  const { login, auth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Redirect if user already logged in
  useEffect(() => {
    if (auth?.user) {
      if (auth.user.role === "admin") navigate("/admin/dashboard");
      if (auth.user.role === "agency") navigate("/agency/dashboard");
    }
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data?.success) {
        const { token, user } = res.data;

        // store in AuthContext
        login(user, token);

        // redirect by role
        if (user.role === "admin") navigate("/admin/dashboard");
        else if (user.role === "agency") navigate("/agency/dashboard");
        else navigate("/");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}>
      {/* Logo centered above the card */}
      <img
        src={logo}
        alt="Lagos State Logo"
        style={{ width: 100, marginBottom: 50 }}
      />
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          borderRadius: 3,
        }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          color="warning.main"
          gutterBottom>
          Admin / Agency Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            label="Password"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="warning"
            sx={{ mt: 2, py: 1.2 }}
            disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
