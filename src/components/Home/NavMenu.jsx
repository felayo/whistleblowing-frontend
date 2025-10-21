import { Link, useLocation } from "react-router-dom";
// import { useState } from "react";
import { Typography, Button, Box } from "@mui/material";

const NavMenu = () => {
  const location = useLocation();
  // const [active, setActive] = useState("Home");
  const active = location.pathname === "/" ? "Home" : "Guide for Reporting";

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Guide for Reporting", path: "/guide" },
  ];
  return (
    <Box sx={{ display: "flex", my: 2 }}>
      {menuItems.map((item) => (
        <Button
          key={item.label}
          color="inherit"
          component={Link}
          to={item.path}
          sx={{
            textTransform: "none",
            mx: 2,
            borderBottom: active === item.label ? "2px solid #ff6500" : "none",
            borderRadius: 0,
            "&:hover": {
              borderBottom: "2px solid #ff6500",
              background: "transparent",
            },
          }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: active === item.label ? "#ff6500" : "none",
            }}>
            {item.label}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

export default NavMenu;
