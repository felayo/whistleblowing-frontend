// src/components/Reports/Messages.jsx
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
import api from "../../api/axios"; // adjust path if needed

const Messages = ({ comments = [], password, userRole = "reporter", onNewMessage }) => {
  const [commentsState, setCommentsState] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]); // local File objects
  const [loading, setLoading] = useState(false);

  // sync local state when parent comments prop changes
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

  const formatRole = (role) => (role ? role.charAt(0).toUpperCase() + role.slice(1) : "Unknown");

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

  const handleSend = async () => {
    if (!newMessage.trim() && selectedFiles.length === 0) return;

    if (!password) {
      // password must be provided (parent should pass it from route)
      alert("Case password is required to send a follow-up.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("password", password);
      formData.append("message", newMessage);

      // append files only if reporter and files selected
      if (userRole === "reporter" && selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append("files", file);
        });
      }

      // send to backend (multipart/form-data)
      const res = await api.post("/reports/message", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = res.data;
      if (data && data.success) {
        // backend returns data.comments and data.evidenceFiles
        // update local comments state by appending returned comments (if any)
        if (Array.isArray(data.data?.comments) && data.data.comments.length > 0) {
          setCommentsState((prev) => [...prev, ...data.data.comments]);
        }

        // notify parent so it can update evidenceFiles and comments globally
        onNewMessage?.(data.data);

        // reset composer
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
      }}
    >
      <Typography variant="h6" gutterBottom>
        Messages
      </Typography>

      {/* Messages Thread */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
        {commentsState.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center", color: "text.secondary" }}>
            <Typography variant="body2">No one has responded to this case</Typography>
          </Box>
        ) : (
          commentsState.map((msg, index) => (
            <Box
              key={msg._id || `msg-${index}`}
              sx={{
                display: "flex",
                justifyContent: msg.role === "admin" ? "flex-end" : "flex-start",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  maxWidth: "70%",
                  bgcolor: getBgColor(msg.role),
                  color: getTextColor(msg.role),
                }}
              >
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
                  }}
                >
                  — {formatRole(msg.role)}
                </Typography>

                {/* timestamp */}
                <Typography variant="caption" display="block" sx={{ opacity: 0.6 }}>
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ""}
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
              disabled={loading}
            >
              Evidence file
              <input type="file" hidden multiple onChange={handleFileChange} />
            </Button>
          )}

          <Button
            variant="contained"
            color="warning"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send message"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default Messages;
