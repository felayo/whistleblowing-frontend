import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import MovieIcon from "@mui/icons-material/Movie";

const FilePreview = ({ file }) => {
  if (!file) return null;

  const { filePath, fileType, fileName, uploadedAt } = file;

  const isImage = fileType?.startsWith("image/");
  const isPDF = fileType === "application/pdf";
  const isVideo = fileType?.startsWith("video/");
  const isAudio = fileType?.startsWith("audio/");

  return (
    <Card
      sx={{
        width: 260,
        borderRadius: 3,
        boxShadow: 2,
        border: "1px solid #eee",
        "&:hover": { boxShadow: 4 },
      }}
    >
      {isImage ? (
        <CardMedia
          component="img"
          image={filePath}
          alt={fileName}
          sx={{ height: 160, objectFit: "cover" }}
        />
      ) : isVideo ? (
        <CardMedia
          component="video"
          controls
          src={filePath}
          sx={{ height: 160, objectFit: "cover", backgroundColor: "#000" }}
        />
      ) : isAudio ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ height: 160, backgroundColor: "#fffaf5", px: 2 }}
        >
          <AudiotrackIcon sx={{ fontSize: 50, color: "#ff8c00" }} />
          <audio
            controls
            style={{ width: "100%", marginTop: 8 }}
            src={filePath}
          />
        </Stack>
      ) : (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ height: 160, backgroundColor: "#fffaf5" }}
        >
          {isPDF ? (
            <PictureAsPdfIcon sx={{ fontSize: 50, color: "#ff8c00" }} />
          ) : (
            <InsertDriveFileIcon sx={{ fontSize: 50, color: "#ff8c00" }} />
          )}
        </Stack>
      )}

      <CardContent>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: "#333",
            wordBreak: "break-word",
          }}
        >
          {fileName}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mt: 0.5, mb: 1 }}
        >
          Uploaded: {new Date(uploadedAt).toLocaleString()}
        </Typography>

        {/* View / Download Buttons */}
        {isImage || isPDF || isVideo || isAudio ? (
          <Button
            size="small"
            href={filePath}
            target="_blank"
            variant="outlined"
            sx={{
              textTransform: "none",
              borderColor: "#ff8c00",
              color: "#ff8c00",
              "&:hover": {
                backgroundColor: "#ff8c00",
                color: "#fff",
                borderColor: "#ff8c00",
              },
            }}
          >
            View File
          </Button>
        ) : (
          <Button
            size="small"
            href={filePath}
            download={fileName}
            variant="outlined"
            sx={{
              textTransform: "none",
              borderColor: "#ff8c00",
              color: "#ff8c00",
              "&:hover": {
                backgroundColor: "#ff8c00",
                color: "#fff",
                borderColor: "#ff8c00",
              },
            }}
          >
            Download
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FilePreview;
