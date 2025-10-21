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

const rows = [
  {
    id: "C-001",
    subject: "Graffiti on bridge",
    category: "Graffiti",
    agency: "LAWMA",
    state: "New",
  },

  {
    id: "C-002",
    subject: "Flooded street",
    category: "Drainage",
    agency: "LAWMA",
    state: "Pending Review",
  },
  {
    id: "C-003",
    subject: "Blocked drainage",
    category: "Drainage",
    agency: "LAWMA",
    state: "Closed",
  },

  {
    id: "C-004",
    subject: "Illegal dumping",
    category: "Waste",
    agency: "LAWMA",
    state: "Closed",
  },
];

const AssignedCasesTable = () => {
  // pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // slice data for pagination
  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper elevation={0}>
      <TableContainer>
        <Table>
          {/* Table Head */}
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
                <strong>State</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.agency}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    to={`/admin/cases/${row.id}`}
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
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default AssignedCasesTable;
