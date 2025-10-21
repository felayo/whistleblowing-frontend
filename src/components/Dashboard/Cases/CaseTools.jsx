import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const CaseTools = ({ category, status, assignedTo }) => {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Tools
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select value={category} label="Category">
          <MenuItem value="Graffiti">Graffiti</MenuItem>
          <MenuItem value="Theft">Theft</MenuItem>
          <MenuItem value="Corruption">Corruption</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select value={status} label="Status">
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Resolved">Resolved</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Assigned to</InputLabel>
        <Select value={assignedTo} label="Assigned to">
          <MenuItem value="KAI">KAI</MenuItem>
          <MenuItem value="Police">Police</MenuItem>
          <MenuItem value="LASMA">LASMA</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="warning" fullWidth>
        Save
      </Button>
    </Paper>
  );
};

export default CaseTools;
