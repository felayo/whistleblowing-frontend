import { useState } from "react";
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
  Typography,
} from "@mui/material";
import { useReport } from "../../context/ReportContext";

const UnAssignedCasesTable = () => {
  const { unassignedReports, loadingList } = useReport();

  // pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  // handle pagination
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = unassignedReports.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Empty state
  if (!loadingList && unassignedReports.length === 0) {
    return (
      <Typography align="center" py={2}>
        No unassigned cases found.
      </Typography>
    );
  }

  return (
    <Paper elevation={1} sx={{ borderRadius: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Case ID</strong>
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
              <TableRow key={row._id}>
                <TableCell>{row.caseID}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.category?.name}</TableCell>
                <TableCell>{row.agencyAssigned?.name}</TableCell>
                <TableCell>{row.status}</TableCell>
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
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={unassignedReports.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default UnAssignedCasesTable;
