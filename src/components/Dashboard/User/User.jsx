import { useState, useMemo } from "react";
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
  TextField,
  MenuItem,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

import CreateUsersDialog from "./CreateUserDialog";
import { useAdminData } from "../../../context/AdminDataContext";

const User = () => {
  const { users = [], agencies = [], loading } = useAdminData();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [agencyFilter, setAgencyFilter] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log("Users:", users);
  const getAgencyName = (user) =>
  user?.agency?.name ?? "Independent";

  // === FILTERED USERS BASED ON SEARCH + AGENCY FILTER ===
 const filteredUsers = useMemo(() => {
  return (users || [])
    .filter((u) => {
      // 🚫 Exclude all admin users
      if (u.role === "admin") return false;

      const fullName = `${u.firstname || ""} ${u.lastname || ""}`.toLowerCase();

      const matchesSearch =
        fullName.includes(search.toLowerCase()) ||
        (u.username || "").toLowerCase().includes(search.toLowerCase());

      const matchesAgency =
        !agencyFilter || u.agency?._id === agencyFilter;

      return matchesSearch && matchesAgency;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}, [users, search, agencyFilter]);


  return (
    <Box sx={{ p: 2 }}>
      {/* ---- Page Header ---- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          pl: 1,
        }}
      >
        <Typography variant="h5" fontWeight="bold" pt={1}>
          Users
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

        <CreateUsersDialog open={open} onClose={handleClose} agencies={agencies} />
      </Box>

      {/* ---- Filters ---- */}
      <Box sx={{ display: "flex", gap: 2, mb: 2, px: 1 }}>
        <TextField
          label="Search users..."
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TextField
          select
          label="Filter by agency"
          value={agencyFilter}
          onChange={(e) => setAgencyFilter(e.target.value)}
          sx={{ width: 250 }}
        >
          <MenuItem value="">All Agencies</MenuItem>
          {agencies.map((agency) => (
            <MenuItem key={agency._id} value={agency._id}>
              {agency.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* ---- Users Table ---- */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Agency</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            )}

            {!loading && filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  No users found
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              filteredUsers.map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell>{getAgencyName(user)}</TableCell>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell>{user.username}</TableCell>

                  <TableCell>
                    <Chip
                      label={user.active ? "Active" : "Inactive"}
                      color={user.active ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <Link to={`/admin/users/${user._id}`}>
                      <Button variant="outlined" size="small" sx={{ textTransform: "none" }}>
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default User;
