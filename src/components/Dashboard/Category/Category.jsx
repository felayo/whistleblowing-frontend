import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CreateCategoryDialog from "./CreateCategoryDialog";

const Category = () => {
  const categories = [
    "Road / Traffic Infrastructure",
    "Graffiti / Defacement",
    "Public Building & Facilities",
    "Water & Drainage Systems",
    "Electricity & Power Installations",
    "Telecommunication Infrastructure",
  ];

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    console.log("Create category Submitted Successfully");
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
        }}>
        <Typography variant="h5" fontWeight="bold" pb={3} pt={3} gutterBottom>
          Categories
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
        <CreateCategoryDialog
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      </Box>
      <Box sx={{ bgcolor: "white", borderRadius: 1, p: 4, m: 3 }}>
        {categories.map((category, index) => (
          <Typography
            variant="body1"
            key={index}
            sx={{ py: 2, borderBottom: "1px solid #e0e0e0" }}>
            {category}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Category;
