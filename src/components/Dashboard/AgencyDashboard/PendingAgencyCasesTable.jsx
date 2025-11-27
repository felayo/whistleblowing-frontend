import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from "@mui/material";
import { useState } from "react";
import { useAgencyReport } from "../../../context/AgencyReportContext";

const PendingAgencyCasesTable = ({ search }) => {
  const { agencyReports } = useAgencyReport(); 
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (!agencyReports) return null;

  // -----------------------------------------
  // 🔍 1. FILTER: PENDING REPORTS ONLY
  // -----------------------------------------
  let filteredReports = agencyReports.filter(
    (r) => r.status?.toLowerCase() === "pending"
  );

  // Search filter (optional)
  if (search) {
    const s = search.toLowerCase();
    filteredReports = filteredReports.filter((r) => {
      return (
        r.caseID?.toLowerCase().includes(s) ||
        r.title?.toLowerCase().includes(s) ||
        r.category?.name?.toLowerCase().includes(s)
      );
    });
  }

  // -----------------------------------------
  // 🔢 2. PAGINATION
  // -----------------------------------------
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = filteredReports.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper elevation={0}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Subject</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="right"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow
                key={row._id}
              >
                <TableCell>{row.caseID}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.category?.name || "—"}</TableCell>
                <TableCell>{row.status}</TableCell>

                <TableCell align="right">
                  <Button
                    component={Link}
                    to={`/agency/cases/${row._id}`}
                    variant="outlined"
                    size="small"
                    sx={{ textTransform: "none" }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {paginatedRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No pending cases found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Section */}
      <TablePagination
        component="div"
        count={filteredReports.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default PendingAgencyCasesTable;
