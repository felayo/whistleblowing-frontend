import { Box } from "@mui/material";

import Sidebar from "../../components/Dashboard/Layout/Sidebar";
import Navbar from "../../components/Dashboard/Layout/Navbar";
import User from "../../components/Dashboard/User/User";


const Users = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, bgcolor: "#d9d9d9", minHeight: "100vh" }}>
        <Navbar />

        {/* Users content */}
        <Box sx={{ p: 3, mt: 8 }}>
          <User />
        </Box>
      </Box>
    </Box>
  );
};

export default Users;

