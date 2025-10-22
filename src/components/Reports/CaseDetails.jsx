import {
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

const CaseDetails = ({ details }) => {
  return (
    <Box>
      <Table>
        <TableBody>
          {Object.entries(details).map(([label, value]) => (
            <TableRow key={label}>
              <TableCell sx={{ fontWeight: "bold", width: "40%" }}>
                {label}
              </TableCell>
              <TableCell sx={{ textAlign: "right" }}>
                {value || ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default CaseDetails;
