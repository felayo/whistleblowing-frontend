import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CreateAgencyDialog from "./CreateAgencyDialog";

const AgencyContent = () => {
  const agencies = ["LAWMA", "LASAA", "LASEMA", "KAI", "LASEPA", "LASPARK"];

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    console.log("Create Agency Submitted Successfully");
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
          pl: 2
        }}>
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
          }}>
          Create
        </Button>
        <CreateAgencyDialog
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      </Box>
      <Box sx={{ bgcolor: "white", borderRadius: 1, p: 4, m: 3 }}>
        {agencies.map((agency, index) => (
          <Typography
            variant="body1"
            key={index}
            sx={{ py: 2, borderBottom: "1px solid #e0e0e0" }}>
            {agency}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default AgencyContent;
