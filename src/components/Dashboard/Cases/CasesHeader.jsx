// components/CasesHeader.jsx
import { Box, TextField, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useState } from "react";

const CasesHeader = () => {
  const [period, setPeriod] = useState("all");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {/* Search */}
      <TextField
        size="small"
        placeholder="Search..."
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1, color: "gray" }} />,
        }}
        sx={{ width: { xs: "100%", sm: "250px" }, backgroundColor: "#fff" }}
      />

      
      {/* Period Filter */}
      <TextField
        select
        size="small"
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        sx={{ width: { xs: "100%", sm: "200px" }, backgroundColor: "#fff" }}
      >
        <MenuItem value="all">All time</MenuItem>
        <MenuItem value="7days">Last 7 days</MenuItem>
        <MenuItem value="30days">Last 30 days</MenuItem>
        <MenuItem value="custom">Custom range</MenuItem>
      </TextField>
    </Box>
  );
};

export default CasesHeader;
