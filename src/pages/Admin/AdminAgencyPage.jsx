import { Box  } from "@mui/material";

import Sidebar from "../../components/Dashboard/Layout/Sidebar";
import Navbar from "../../components/Dashboard/Layout/Navbar";
import AgencyContent from "../../components/Dashboard/Agency/AgencyContent";

const AdminAgencyPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, bgcolor: "#d9d9d9", minHeight: "100vh" }}>
        <Navbar />

        {/* Agency content */}
        <Box sx={{ p: 3, mt: 8 }}>

          <AgencyContent />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminAgencyPage;
