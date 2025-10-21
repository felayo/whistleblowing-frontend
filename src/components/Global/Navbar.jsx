import { Link } from "react-router-dom";
import { AppBar, Toolbar, Box, Select, MenuItem } from "@mui/material";
import logo from "../../assets/lagos.png";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      style={{ backgroundColor: "#fff", color: "#ff8c00" }}>
      <Toolbar disableGutters>
        {/* Logo */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            mr: 2,
          }}>
          <Box component="img" src={logo} alt="Logo" sx={{ height: 40 }} />
        </Box>

        {/* Spacer to push language selector to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Language Selector */}
        <Select
          defaultValue="English"
          variant="outlined"
          sx={{
            color: "#333",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
          }}>
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Yoruba">Yoruba</MenuItem>
        </Select>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
