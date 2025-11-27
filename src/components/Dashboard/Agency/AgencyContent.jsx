import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

import CreateAgencyDialog from "./CreateAgencyDialog";
import { useAdminData } from "../../../context/AdminDataContext";

const AgencyContent = () => {
  const navigate = useNavigate();

  const { agencies, loading, error } = useAdminData();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 
  const handleViewUsers = (agencyId) => {
    navigate(`/admin/agencies/${agencyId}/users`);
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          pl: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" pb={3} pt={3} gutterBottom>
          Agencies
        </Typography>

        <Button
          disableElevation
          variant="contained"
          color="inherit"
          onClick={handleOpen}
          startIcon={<AddIcon />}
          sx={{
            py: 1,
            fontWeight: "bold",
            backgroundColor: "#f6f6f6",
            textTransform: "none",
          }}
        >
          Create
        </Button>

        <CreateAgencyDialog
          open={open}
          onClose={handleClose}
        />
      </Box>

      {/* Loading State */}
      {loading && (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Typography color="error" sx={{ px: 3, pb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Table */}
      {!loading && (
        <Box sx={{ bgcolor: "white", borderRadius: 1, p: 3, m: 3 }}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Agency Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {agencies?.length > 0 ? (
                  agencies
                    .filter((agency) => agency?.name?.toLowerCase() !== "unassigned")
                    .map((agency) => (
                      <TableRow key={agency._id} hover>
                        <TableCell sx={{ fontWeight: 500 }}>
                          {agency.name}
                        </TableCell>

                        <TableCell>
                          {agency.description || "—"}
                        </TableCell>

                        <TableCell>
                          {agency.phone || "—"}
                        </TableCell>

                        <TableCell>
                          {agency.email || "—"}
                        </TableCell>

                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            onClick={() => handleViewUsers(agency._id)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      No agencies found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>

            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default AgencyContent;
