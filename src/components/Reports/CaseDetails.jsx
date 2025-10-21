import {
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

const CaseDetails = ({ details }) => {
  return (
    <Box mt={3} mb={2}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Case Details
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Table>
          <TableBody>
            {Object.entries(details).map(([label, value]) => (
              <TableRow key={label}>
                <TableCell sx={{ fontWeight: "bold", width: "40%" }}>
                  {label}
                </TableCell>
                <TableCell sx={{textAlign: "right"}}>{value || ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default CaseDetails;
