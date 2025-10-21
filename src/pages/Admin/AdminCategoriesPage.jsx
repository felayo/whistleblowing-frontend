import { Box } from "@mui/material";

import Sidebar from "../../components/Dashboard/Layout/Sidebar";
import Navbar from "../../components/Dashboard/Layout/Navbar";
import Category from "../../components/Dashboard/Category/Category";

const Categories = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, bgcolor: "#d9d9d9", minHeight: "100vh" }}>
        <Navbar />

        {/* Categories content */}
        <Box sx={{ p: 3, mt: 8 }}>
          <Category />
        </Box>
      </Box>
    </Box>
  );
};

export default Categories;
