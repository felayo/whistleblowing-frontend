import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";

const Messages = ({ messages = [] }) => {
  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Messages
      </Typography>
      {/* messages section grows */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        {messages.length === 0 ? (
          <Box textAlign="center" sx={{ py: 5 }}>
            <SearchIcon sx={{ fontSize: 48, color: "gray" }} />
            <Typography>No one has responded to this case</Typography>
          </Box>
        ) : (
          <Box>Messages go here...</Box>
        )}
      </Box>

      {/* input stays pinned at bottom */}
      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Write a message"
          variant="outlined"
        />
        <Stack direction="row" justifyContent={"space-between"} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<UploadFileIcon />}
            sx={{
              color: "#ff8c00",
              py: 1,
              fontWeight: "bold",
              borderRadius: 1.5,
              textTransform: "none",
              borderColor: "#ff8c00",
              "&:hover": {
                borderColor: "#e67a00",
                backgroundColor: "rgba(255,140,0,0.04)",
              },
            }}>
            Upload file
          </Button>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              backgroundColor: "#ff8c00",
              textTransform: "none",
              "&:hover": { backgroundColor: "#e67a00" },
            }}>
            Send message
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default Messages;
