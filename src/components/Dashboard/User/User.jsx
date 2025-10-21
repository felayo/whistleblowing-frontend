import { useState } from "react";
import { Box, Button, Typography, Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom"; // import Link

import CreateUsersDialog from "./CreateUserDialog";

const User = () => {
  const users = [
    { id: 1, initials: "AF", name: "LAWMA", email: "aijay@email.com" },
    { id: 2, initials: "BA", name: "LASAA", email: "aijay@email.com" },
    { id: 3, initials: "AC", name: "LASEMA", email: "aijay@email.com" },
    { id: 4, initials: "FF", name: "KAI", email: "aijay@email.com" },
    { id: 5, initials: "ZF", name: "LASEPA", email: "aijay@email.com" },
    { id: 6, initials: "AF", name: "LASPARK", email: "aijay@email.com" },
  ];

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    console.log("Create user Submitted Successfully");
    // TODO: Add form submission logic here
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          pl: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" pt={3} gutterBottom>
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
        <CreateUsersDialog
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      </Box>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 1,
          border: "1px solid #e0e0e0",
          overflow: "hidden",
          marginLeft: 4,
          marginRight: 4,
        }}
      >
        {users.map((user, index) => (
          <Link
            key={user.id}
            to={`/admin/users/${user.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 3,
                borderBottom:
                  index < users.length - 1 ? "1px solid #e0e0e0" : "none",
                gap: 2,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#ff8c00",
                  width: 40,
                  height: 40,
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                {user.initials}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" fontWeight="medium">
                  {user.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.875rem" }}
                >
                  {user.email}
                </Typography>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default User;
