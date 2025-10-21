import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const agencies = [
  {
    name: "LAWMA",
    reported: 20,
    resolved: 16,
    pending: 4,
    lastUpdate: "Aug 30, 2025",
  },
  {
    name: "LASAA",
    reported: 34,
    resolved: 30,
    pending: 4,
    lastUpdate: "Aug 30, 2025",
  },
  {
    name: "KAI",
    reported: 12,
    resolved: 2,
    pending: 10,
    lastUpdate: "Aug 30, 2025",
  },
  {
    name: "LASEMA",
    reported: 48,
    resolved: 40,
    pending: 8,
    lastUpdate: "Aug 30, 2025",
  },
];

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ my: 4, backgroundColor: "#d9d9d9", p: 4 }}>
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: "bold", mb: 1 }}>
        Agency Accountability Scorecard
      </Typography>
      <Typography
        variant="body2"
        align="center"
        gutterBottom
        sx={{ fontStyle: "italic", mb: 3 }}>
        See how government agencies are performing based on reported cases and
        resolutions.
      </Typography>

      {isMobile ? (
        // ✅ Mobile view: stacked cards
        <Box sx={{ display: "grid", gap: 2 }}>
          {agencies.map((agency, index) => (
            <Card key={index} variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {agency.name}
                </Typography>
                <Typography>Reported Cases: {agency.reported}</Typography>
                <Typography>Resolved Cases: {agency.resolved}</Typography>
                <Typography>
                  Pending Cases:{" "}
                  <Box
                    component="span"
                    sx={{
                      px: 1.5,
                      py: 0.2,
                      borderRadius: 1,
                      color: "#fff",
                      fontWeight: "bold",
                      backgroundColor: agency.pending > 5 ? "red" : "green",
                    }}>
                    {agency.pending}
                  </Box>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Last Update: {agency.lastUpdate}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        // ✅ Desktop view: table
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 1, overflowX: "auto" }}
          elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Agency</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Reported Cases
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Resolved Cases
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Pending Cases</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Last Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agencies.map((agency, index) => (
                <TableRow key={index}>
                  <TableCell>{agency.name}</TableCell>
                  <TableCell>{agency.reported}</TableCell>
                  <TableCell>{agency.resolved}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        color: "#fff",
                        fontWeight: "bold",
                        backgroundColor: agency.pending > 5 ? "red" : "green",
                      }}>
                      {agency.pending}
                    </Box>
                  </TableCell>
                  <TableCell>{agency.lastUpdate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Hero;
