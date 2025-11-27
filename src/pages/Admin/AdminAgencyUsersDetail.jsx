import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import VisibilityIcon from "@mui/icons-material/Visibility";
import Sidebar from "../../components/Dashboard/Layout/Sidebar";
import Navbar from "../../components/Dashboard/Layout/Navbar";
import { useAdminData } from "../../context/AdminDataContext";

const AdminAgencyUsersDetail = () => {
  const { agencyId } = useParams();
  const navigate = useNavigate();

  const { agencies, users, loading, error } = useAdminData();

  const [agency, setAgency] = useState(null);
  const [agencyUsers, setAgencyUsers] = useState([]);

  // Load selected agency
  useEffect(() => {
    if (!agencies?.length) return;

    const foundAgency = agencies.find((a) => a._id === agencyId);

    setAgency(foundAgency);

    if (foundAgency) {
      // Convert user IDs to full user objects
      const filteredUsers = users.filter((u) =>
        foundAgency.users.includes(u._id)
      );

      setAgencyUsers(filteredUsers);
    }
  }, [agencies, users, agencyId]);

  if (loading || !agency) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" p={3}>
        {error}
      </Typography>
    );
  }

  return (
      <Box sx={{ display: "flex" }}>
          <Sidebar />
          {/* Main Content Area */}
          <Box sx={{ flexGrow: 1, bgcolor: "#d9d9d9", minHeight: "100vh" }}>
              <Navbar />
              <Box sx={{ p: 4, mt: 8 }}>
                {/* Header */}
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {agency.name} — Users
                </Typography>

                <Typography sx={{ mb: 2, color: "gray" }}>
                    Showing all users assigned to this agency.
                </Typography>

                {/* Table */}
                <TableContainer component={Paper} elevation={0}>
                    <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Actions
                        </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {agencyUsers.length > 0 ? (
                        agencyUsers.map((user) => (
                            <TableRow hover key={user._id}>
                            <TableCell>
                                {user.firstname} {user.lastname}
                            </TableCell>

                            <TableCell>{user.email}</TableCell>

                            <TableCell>{user.phone || "—"}</TableCell>

                            <TableCell>{user.role}</TableCell>

                            <TableCell align="center">
                                <IconButton
                                color="primary"
                                onClick={() => navigate(`/admin/users/${user._id}`)}
                                >
                                <VisibilityIcon />
                                </IconButton>
                            </TableCell>
                            </TableRow>
                        ))
                        ) : (
                        <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                            No users found for this agency
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Box>
          </Box>
    </Box>
  );
};

export default AdminAgencyUsersDetail;
