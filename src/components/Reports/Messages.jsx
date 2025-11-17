import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import { useState, useEffect } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { api } from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Messages = ({
  comments = [],
  password,
  userRole,
  onNewMessage,
  reportId,
}) => {
  const [commentsState, setCommentsState] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  // Sync with parent
  useEffect(() => {
    setCommentsState(Array.isArray(comments) ? comments : []);
  }, [comments]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveSelectedFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatRole = (role) =>
    role ? role.charAt(0).toUpperCase() + role.slice(1) : "Unknown";

  const getBgColor = (role) => {
    switch (role) {
      case "reporter":
        return "#ffcc80";
      case "admin":
        return "#f57c00";
      case "agency":
        return "#81c784";
      default:
        return "#e0e0e0";
    }
  };

  const getTextColor = (role) => (role === "admin" ? "white" : "black");

  // ------------------------------
  // MAIN SEND HANDLER
  // ------------------------------
  const handleSend = async () => {
    if (!newMessage.trim() && selectedFiles.length === 0) return;

    try {
      setLoading(true);

      let response;

      // --------------------------
      // REPORTER ENDPOINT
      // --------------------------
      if (userRole === "reporter") {
        if (!password) {
          alert("Password is required for reporter messages.");
          return;
        }

        const formData = new FormData();
        formData.append("message", newMessage);
        formData.append("password", password);

        selectedFiles.forEach((file) => {
          formData.append("evidenceFiles", file);
        });

        response = await api.post("/reports/message", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // --------------------------
      // ADMIN ENDPOINT
      // --------------------------
      else if (userRole === "admin") {
        if (!reportId) {
          alert("reportId is required for admin messages.");
          return;
        }

        response = await axiosPrivate.post(`/admin/reports/${reportId}/messages`, {
          message: newMessage,
        });
      }

      // --------------------------
      // AGENCY ENDPOINT
      // --------------------------
      else if (userRole === "agency") {
        if (!reportId) {
          alert("reportId is required for agency messages.");
          return;
        }

        response = await axiosPrivate.post(`/agency/${reportId}/messages`, {
          message: newMessage,
        });
      }

      // --------------------------
      // Update UI after sending
      // --------------------------
      const data = response.data;

      if (data && data.success) {
        // Update local comments immediately
        if (Array.isArray(data.data)) {
          // admin/agency returns comments array only
          setCommentsState(data.data);
        } else {
          // reporter returns {comments, evidenceFiles}
          setCommentsState(data.data.comments);
        }

        // Notify parent
        onNewMessage?.(data.data);

        // reset input
        setNewMessage("");
        setSelectedFiles([]);
      } else {
        alert(data?.message || "Failed to send message");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert(err.response?.data?.message || "Error sending message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        mb: 3,
        display: "flex",
        flexDirection: "column",
        height: 520,
      }}>
      <Typography variant="h6" gutterBottom>
        Messages
      </Typography>

      {/* Messages Thread */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
        {commentsState.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center", color: "text.secondary" }}>
            <Typography variant="body2">
              No one has responded to this case
            </Typography>
          </Box>
        ) : (
          commentsState.map((msg, index) => (
            <Box
              key={msg._id || `msg-${index}`}
              sx={{
                display: "flex",
                justifyContent:
                  msg.role === userRole ? "flex-end" : "flex-start",
                mb: 2,
              }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  maxWidth: "70%",
                  bgcolor: getBgColor(msg.role),
                  color: getTextColor(msg.role),
                }}>
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                  {msg.message}
                </Typography>

                {/* role label */}
                <Typography
                  variant="caption"
                  display="block"
                  sx={{
                    mt: 0.5,
                    fontStyle: "italic",
                    fontWeight: "bold",
                    color: "rgba(0,0,0,0.7)",
                  }}>
                  — {formatRole(msg.role)}
                </Typography>

                {/* timestamp */}
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ opacity: 0.6 }}>
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleString()
                    : ""}
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>

      {/* Input Area */}
      <Box>
        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder="Write a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{ mb: 2 }}
          disabled={loading}
        />

        {/* show selected filenames (if any) */}
        {selectedFiles.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
            {selectedFiles.map((f, i) => (
              <Chip
                key={f.name + "-" + i}
                icon={<InsertDriveFileIcon />}
                label={f.name}
                size="small"
                sx={{ bgcolor: "white" }}
                onDelete={() => handleRemoveSelectedFile(i)}
              />
            ))}
          </Stack>
        )}

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {userRole === "reporter" && (
            <Button
              variant="outlined"
              component="label"
              startIcon={<AttachFileIcon />}
              disabled={loading}>
              Evidence file
              <input type="file" hidden multiple onChange={handleFileChange} />
            </Button>
          )}

          <Button
            variant="contained"
            color="warning"
            onClick={handleSend}
            disabled={loading}>
            {loading ? "Sending..." : "Send message"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default Messages;
