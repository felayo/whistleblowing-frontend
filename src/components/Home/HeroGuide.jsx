import { Typography, Box, List, ListItem, ListItemText } from "@mui/material";
const Hero = () => {
  return (
    <Box sx={{ my: 4, backgroundColor: "#d9d9d9", p: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }} gutterBottom>
        Video Guide
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: 250,
          mb: 2,
        }}>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/VIDEO_ID"
          title="Video Guide"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
      </Box>
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        How to Report a Case
      </Typography>
      <List sx={{ textAlign: "left" }}>
        <ListItem>
          <ListItemText
            primary="Click 'Create report' at the bottom of the page."
            secondary="This opens the secure reporting form. You may choose to report anonymously or provide your contact details."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Fill in the case details."
            secondary="describe what happened, share location and upload evidence if available."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Submit your report."
            secondary="A unique tracking ID (Password) will be generated for you. Save it for follow-ups."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Follow up on your report."
            secondary="Click 'Follow Up' and enter your password to view updates, and reply feedback."
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default Hero;
