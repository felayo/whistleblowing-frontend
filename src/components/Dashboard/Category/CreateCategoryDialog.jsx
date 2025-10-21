import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";

const CreateCategoryDialog = ({ open, onClose, onSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold" }}>Create Category</DialogTitle>

      <DialogContent>
        <Box>
          <Typography sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
            Category Name
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter category name"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          sx={{ textTransform: "none" }}>
          ❌ Cancel
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ff8c00",
            textTransform: "none",
            "&:hover": { backgroundColor: "#e67a00" },
          }}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCategoryDialog;
