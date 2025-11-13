import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/lagos.png";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import { AuthContext } from "../../../../context/AuthContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, link: "/agency/dashboard" },
  { text: "Cases", icon: <DescriptionIcon />, link: "/agency/cases" },
  { text: "Statistics", icon: <BarChartIcon />, link: "/agency/analytics" },
  { text: "Settings", icon: <PeopleIcon />, link: "/agency/settings" },
];

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <Box
        sx={{
          width: 240,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}>
        {/* Logo */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 64,
            mb: 2,
            mt: 2,
            textDecoration: "none",
          }}>
          <Box component="img" src={logo} alt="Logo" sx={{ height: 40 }} />
        </Box>

        {/* Menu Items */}
        <List>
          {menuItems.map((item, index) => (
            <ListItemButton key={index} component={Link} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>

        {/* Sign out button at bottom */}
        <Box sx={{ mt: "auto", p: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={logout}
            startIcon={<ExitToAppIcon />}
            sx={{
              textTransform: "none",
              borderColor: "#ff8c00",
              color: "#ff8c00",
            }}>
            Sign out
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
