import { Paper, Typography, Box, Divider, Grid, Stack } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FilePreview from "../../FilePreview";

const CaseDetailsInfo = ({ caseDetails }) => {
  const evidenceFiles = caseDetails.evidenceFiles || [];

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        {/* Case title & ID */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}>
          <Typography variant="h6" fontWeight="bold">
            {caseDetails.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              bgcolor: "#E3E8FF",
              color: "#3F51B5",
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontWeight: "bold",
            }}>
            {caseDetails.caseID}
          </Typography>
        </Box>

        {/* Section header + Anonymous badge */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 1 }}>
            Details
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#f5f5f5",
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
            }}>
            <PersonOutlineIcon
              sx={{ mr: 0.5, fontSize: 16, color: "text.secondary" }}
            />
            <Typography variant="body2" color="text.secondary">
              {caseDetails.reporterType}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Grid-based table layout */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              Date and time
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">
              {new Date(caseDetails.createdAt).toLocaleString()}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              Subject
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">{caseDetails.title}</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              Description
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">{caseDetails.description}</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              Category
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">{caseDetails?.category?.name}</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              Agency Assigned
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">{caseDetails?.agencyAssigned?.name}</Typography>
          </Grid>
          {caseDetails.reporterType === "confidential" && (
            <>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Name
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">
                  {caseDetails.reporterName || "-"}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Phone
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">
                  {caseDetails.reporterPhone || "-"}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">
                  {caseDetails.reporterEmail || "-"}
                </Typography>
              </Grid>
            </>
          )}

          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              Case Location
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">
              {caseDetails.location || "-"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      {/* Evidence Files Section */}
      {evidenceFiles.length > 0 && (
        <>
          <Typography
            variant="h6"
            sx={{ color: "#ff8c00", fontWeight: 600, mt: 3, mb: 1 }}>
            Evidence Files
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" mb={4}>
            {evidenceFiles.map((file) => (
              <FilePreview key={file._id} file={file} />
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default CaseDetailsInfo;
