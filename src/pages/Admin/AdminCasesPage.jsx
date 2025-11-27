import { useState } from "react";
import { saveAs } from "file-saver"; 
import Papa from "papaparse"; // 
import { Box, Typography, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import Sidebar from "../../components/Dashboard/Layout/Sidebar";
import Navbar from "../../components/Dashboard/Layout/Navbar";
import CasesHeader from "../../components/Dashboard/Cases/CasesHeader";
import AllCasesTable from "../../components/Dashboard/Cases/AllCasesTable";

import { useReport } from "../../context/ReportContext";

const CasesPage = () => {
  const { reports } = useReport();
  
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("all");

  const handleExport = () => {
  if (!reports || reports.length === 0) return;

  // Map the report data to a simple object structure
  const exportData = reports.map((r) => ({
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

      <Box sx={{ flexGrow: 1, bgcolor: "#d9d9d9", minHeight: "100vh" }}>
        <Navbar />

        <Box sx={{ p: 3, mt: 8 }}>
          {/* Title + Export */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              pl: 2,
            }}>
            <Typography variant="h5" fontWeight="bold" pb={3} pt={3}>
              Cases
            </Typography>

            <Button variant="outlined" onClick={handleExport} startIcon={<FileDownloadIcon />}>
              Export
            </Button>
          </Box>

          <CasesHeader
            period={period}
            onSearchChange={setSearch}
            onPeriodChange={setPeriod}
          />

          <AllCasesTable search={search} period={period} />
        </Box>
      </Box>
    </Box>
  );
};

export default CasesPage;
