import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import { useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const initialMessages = [
  {
    id: 1,
    sender: "Whistleblower",
    text: "I saw someone tampering with the transformer last night.",
    time: "18 Sept 2024, 12:00 PM",
    attachments: [],
  },
  {
    id: 2,
    sender: "Admin",
    text: "Thanks for reporting. Can you provide the exact location?",
    time: "18 Sept 2024, 12:15 PM",
    attachments: [],
  },
];

const CaseMessages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const handleSend = () => {
    if (!newMessage.trim() && attachments.length === 0) return;

    const newMsg = {
      id: messages.length + 1,
      sender: "Admin",
      text: newMessage,
      time: new Date().toLocaleString(),
      attachments,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
    setAttachments([]); // clear after sending
  };

  return (
    <Paper
      sx={{
        p: 2,
        mb: 3,
        display: "flex",
        flexDirection: "column",
        height: 400,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Messages
      </Typography>

      {/* Messages Thread */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
        {messages.length === 0 ? (
          <Box
            sx={{
              py: 6,
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            <Typography variant="body2">
              No one has responded to this case
            </Typography>
          </Box>
        ) : (
          messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: "flex",
                justifyContent:
                  msg.sender === "Admin" ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  maxWidth: "70%",
                  bgcolor: msg.sender === "Admin" ? "#f57c00" : "#e0e0e0",
                  color: msg.sender === "Admin" ? "white" : "black",
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>

                {/* Attachments Preview */}
                {msg.attachments?.length > 0 && (
                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    sx={{ mt: 1 }}
                  >
                    {msg.attachments.map((file, idx) => (
                      <Chip
                        key={idx}
                        icon={<InsertDriveFileIcon />}
                        label={file.name}
                        size="small"
                        sx={{
                          bgcolor: "white",
                          color: "black",
                          "& .MuiChip-icon": { color: "#555" },
                        }}
                        onClick={() =>
                          window.open(URL.createObjectURL(file))
                        }
                      />
                    ))}
                  </Stack>
                )}

                <Typography
                  variant="caption"
                  display="block"
                  sx={{ mt: 0.5, opacity: 0.7 }}
                >
                  {msg.time}
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
        />

        {/* Selected files preview before sending */}
        {attachments.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
            {attachments.map((file, idx) => (
              <Chip
                key={idx}
                icon={<AttachFileIcon />}
                label={file.name}
                size="small"
                color="warning"
              />
            ))}
          </Stack>
        )}

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            component="label"
            startIcon={<AttachFileIcon />}
          >
            Upload file
            <input type="file" hidden multiple onChange={handleFileChange} />
          </Button>
          <Button variant="contained" color="warning" onClick={handleSend}>
            Send message
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default CaseMessages;
