// Navbar.jsx
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  MenuItem,
  Select,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={1}
      sx={{ ml: 30, width: `calc(100% - 240px)` }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        {/* Language Selector */}
        <Select
          defaultValue="English"
          size="small"
          sx={{
            minWidth: 120,
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
          }}
        >
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Yoruba">Yoruba</MenuItem>
        </Select>

        {/* Notification Bell */}
        <IconButton>
          <NotificationsIcon />
        </IconButton>

        {/* User Avatar */}
        <Avatar sx={{ bgcolor: "#ff8c00" }}>AA</Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
