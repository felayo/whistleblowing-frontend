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
  LinearProgress,
  useMediaQuery,
  Pagination,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [agencies, setAgencies] = useState([]);
  const [summary, setSummary] = useState(null);

  // PAGINATION STATES
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const handlePageChange = (_, value) => setPage(value);

  useEffect(() => {
    const fetchScorecard = async () => {
      try {
        const res = await axios.get(
          "https://whistleblowing-api.onrender.com/api/scorecard"
        );
        let { agencies, summary } = res.data;

        // ❌ Remove unassigned agency
        agencies = agencies.filter((a) => a.agencyName !== "unassigned");

        // Sort highest resolved rate first
        const sorted = agencies.sort((a, b) => {
          const rateA = a.resolved / a.total;
          const rateB = b.resolved / b.total;
          return rateB - rateA;
        });

        setAgencies(sorted);
        setSummary(summary);
      } catch (error) {
        console.error("Failed to load scorecard", error);
      }
    };

    fetchScorecard();
  }, []);

  const getPerformanceColor = (pending, total) => {
    const rate = pending / total;
    if (rate <= 0.2) return "green";
    if (rate <= 0.5) return "orange";
    return "red";
  };

  // Apply pagination to agencies list
  const paginatedAgencies = agencies.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ my: 4, backgroundColor: "#f5f5f5", p: 4 }}>
      <Typography variant="h5" align="center" sx={{ fontWeight: "bold", mb: 1 }}>
        Lagos Public Accountability Scorecard
      </Typography>

      <Typography
        variant="body2"
        align="center"
        sx={{ fontStyle: "italic", mb: 3 }}
      >
        Tracking how government agencies respond to citizen reports.
      </Typography>

      {/* GLOBAL SUMMARY */}
      {summary && (
        <Box
          sx={{
            my: 2,
            p: 2,
            borderRadius: 2,
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Total Reports: {summary.totalReports}
          </Typography>
          <Typography>Pending: {summary.pending}</Typography>
          <Typography>Under Review: {summary.underReview}</Typography>
          <Typography>Resolved: {summary.resolved}</Typography>
          <Typography>Closed: {summary.closed}</Typography>
        </Box>
      )}

      {/* MOBILE VIEW */}
      {isMobile ? (
        <Box sx={{ display: "grid", gap: 2 }}>
          {paginatedAgencies.map((agency, i) => {
            const { total, resolved, pending, agencyName } = agency;
            const resolvedRate = Math.round((resolved / total) * 100);

            return (
              <Card key={i} variant="outlined">
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {agencyName}
                  </Typography>

                  <Typography>Total Reports: {total}</Typography>
                  <Typography>Resolved: {resolved}</Typography>

                  <Typography>
                    Pending:
                    <Box
                      component="span"
                      sx={{
                        px: 1.2,
                        py: 0.2,
                        borderRadius: 1,
                        color: "#fff",
                        ml: 1,
                        backgroundColor: getPerformanceColor(pending, total),
                      }}
                    >
                      {pending}
                    </Box>
                  </Typography>

                  <Box sx={{ mt: 1 }}>
                    <LinearProgress variant="determinate" value={resolvedRate} />
                    <Typography variant="caption">
                      Performance: {resolvedRate}% resolved
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            );
          })}

          {/* Pagination */}
          <Pagination
            count={Math.ceil(agencies.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            sx={{ mt: 2, mx: "auto" }}
          />
        </Box>
      ) : (
        // DESKTOP TABLE VIEW
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Agency</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Resolved</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Pending</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Performance</TableCell>

                {/* ❌ Removed Last Update */}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedAgencies.map((agency, i) => {
                const { total, resolved, pending, agencyName } = agency;
                const rate = Math.round((resolved / total) * 100);

                return (
                  <TableRow key={i}>
                    <TableCell>{agencyName}</TableCell>
                    <TableCell>{total}</TableCell>
                    <TableCell>{resolved}</TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                          color: "#fff",
                          fontWeight: "bold",
                          display: "inline-block",
                          backgroundColor: getPerformanceColor(pending, total),
                        }}
                      >
                        {pending}
                      </Box>
                    </TableCell>

                    <TableCell sx={{ width: "25%" }}>
                      <LinearProgress variant="determinate" value={rate} />
                      <Typography variant="caption">{rate}% resolved</Typography>
                    </TableCell>

                    {/* ❌ Removed Last Update */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination (Desktop Only) */}
      {!isMobile && (
        <Pagination
          count={Math.ceil(agencies.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          sx={{ mt: 2, display: "flex", justifyContent: "center" }}
        />
      )}
    </Box>
  );
};

export default Hero;
