import { useState } from "react";
import { saveAs } from "file-saver"; 
import Papa from "papaparse"; 
import { Box, Typography, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import Sidebar from "../../components/Dashboard/AgencyDashboard/Layout/Sidebar";
import Navbar from "../../components/Dashboard/AgencyDashboard/Layout/Navbar";
import CasesHeader from "../../components/Dashboard/Cases/CasesHeader";
import AgencyCasesTable from "../../components/Dashboard/AgencyDashboard/AgencyCasesTable";
import { useAgencyReport } from "../../context/AgencyReportContext";

const AgencyCasePage = () => {
  const { agencyReports } = useAgencyReport(); 

   const [search, setSearch] = useState("");
   const [period, setPeriod] = useState("all");
  
   const handleExport = () => {
    if (!agencyReports || agencyReports.length === 0) return;
  
    // Map the report data to a simple object structure
    const exportData = agencyReports.map((r) => ({
      "Case ID": r.caseID,
      "Title": r.title,
      "Category": r.category?.name || "-",
      "Agency": r.agencyAssigned?.name || "-",
      "Status": r.status,
      "Created At": new Date(r.createdAt).toLocaleString(),
    }));
  
    // Convert to CSV
    const csv = Papa.unparse(exportData);
  
    // Save as file
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `cases_export_${new Date().toISOString()}.csv`);
  };
  
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, bgcolor: "#d9d9d9", minHeight: "100vh" }}>
        <Navbar />

        {/* Cases content */}
        <Box sx={{ p: 3, mt: 8 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              pl: 2,
            }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              pb={3}
              pt={3}
              gutterBottom>
              Cases
            </Typography>
            {/* Export Button */}
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              sx={{ textTransform: "none" }}
              onClick={handleExport}
            >
              Export
            </Button>
          </Box>

          <CasesHeader
            period={period}
            onSearchChange={setSearch}
            onPeriodChange={setPeriod}
          />
          {/* Assigned Cases Table */}
          <AgencyCasesTable search={search} period={period}/>
        </Box>
      </Box>
    </Box>
  );
};

export default AgencyCasePage;
