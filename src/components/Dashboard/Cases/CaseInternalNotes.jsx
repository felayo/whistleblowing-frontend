import {
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

const CaseInternalNotes = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Internal Notes
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        No internal notes. Be the first to add one below:
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={3}
        placeholder="Write a note"
        sx={{ mb: 2 }}
      />

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="outlined" component="label">
          Upload file
          <input type="file" hidden />
        </Button>
        <Button variant="contained" color="primary">
          Add note
        </Button>
      </Stack>
    </Paper>
  );
};

export default CaseInternalNotes;
