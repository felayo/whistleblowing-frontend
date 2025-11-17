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
import { useReport } from "../../../context/ReportContext";

const AllCasesTable = ({ search, period }) => {
  const { reports } = useReport();

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (!reports) return null;

  // FILTERING LOGIC

  let filteredReports = reports;

  // Search filter
  if (search) {
    const s = search.toLowerCase();
    filteredReports = filteredReports.filter((r) => {
      return (
        r.caseID?.toLowerCase().includes(s) ||
        r.title?.toLowerCase().includes(s) ||
        r.category?.name?.toLowerCase().includes(s) ||
        r.agencyAssigned?.name?.toLowerCase().includes(s) ||
        r.status?.toLowerCase().includes(s)
      );
    });
  }

  // Period filter
  if (period !== "all") {
    const now = new Date();

    filteredReports = filteredReports.filter((r) => {
      const created = new Date(r.createdAt);

      if (period === "7days") {
        return now - created <= 7 * 24 * 60 * 60 * 1000;
      }

      if (period === "14days") {
        return now - created <= 14 * 24 * 60 * 60 * 1000;
      }

      if (period === "30days") {
        return now - created <= 30 * 24 * 60 * 60 * 1000;
      }

      if (period === "90days") {
        return now - created <= 90 * 24 * 60 * 60 * 1000;
      }

      return true;
    });
  }

  // ----------------------------
  // 🔢 2. PAGINATION
  // ----------------------------
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = filteredReports.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getRowColor = (status) => {
    switch (status?.toLowerCase()) {
      case "under review":
        return "#fff8c6"; // light yellow
      case "resolved":
        return "#d8ffd6"; // light green
      case "closed":
        return "#ffd6d6"; // light red
      case "pending":
        return "#d6e9ff"; // light blue
      default:
        return "white"; // fallback
    }
  };

  return (
    <Paper elevation={0}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Subject</strong>
              </TableCell>
              <TableCell>
                <strong>Category</strong>
              </TableCell>
              <TableCell>
                <strong>Agency</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow
                key={row._id}
                sx={{
                  backgroundColor: getRowColor(row.status),
                }}>
                <TableCell>{row.caseID}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.category?.name || "—"}</TableCell>
                <TableCell>
                  {row.agencyAssigned?.name || "Not Assigned"}
                </TableCell>
                <TableCell style={{ textTransform: "capitalize" }}>
                  {row.status}
                </TableCell>

                <TableCell align="right">
                  <Button
                    component={Link}
                    to={`/admin/cases/${row._id}`}
                    variant="outlined"
                    size="small"
                    sx={{ textTransform: "none" }}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {paginatedRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No cases found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
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

export default AllCasesTable;
