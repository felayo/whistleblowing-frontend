import { Link } from "react-router-dom";
import logo from "../../../assets/lagos.png";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import BarChartIcon from "@mui/icons-material/BarChart";
import BusinessIcon from "@mui/icons-material/Business";
import LayersIcon from "@mui/icons-material/Layers";
import PeopleIcon from "@mui/icons-material/People";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, link: "/admin/dashboard" },
  { text: "Cases", icon: <DescriptionIcon />, link: "/admin/cases" },
  { text: "Statistics", icon: <BarChartIcon />, link: "/admin/analytics" },
  { text: "Agency", icon: <BusinessIcon />, link: "/admin/agency" },
  { text: "Categories", icon: <LayersIcon />, link: "/admin/categories" },
  { text: "Users", icon: <PeopleIcon />, link: "/admin/users" },
];

const Sidebar = () => {
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
            startIcon={<ExitToAppIcon />}
            sx={{ textTransform: "none", borderColor: "#ff8c00", color: "#ff8c00" }}>
            Sign out
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
