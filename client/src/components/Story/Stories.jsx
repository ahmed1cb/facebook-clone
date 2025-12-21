import { Box, Paper } from "@mui/material";
import Story from "./Story";

export default () => {
  const stories = [
    { name: "Create Story", avatar: "U", isCreate: true },
    { name: "John Doe", avatar: "JD", isCreate: false },
    { name: "Sarah Smith", avatar: "SS", isCreate: false },
    { name: "Mike Johnson", avatar: "MJ", isCreate: false },
    { name: "Emma Wilson", avatar: "EW", isCreate: false },
  ];

  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        bgcolor: (theme) => theme.palette.background.paper,
      }}
    >
      <Box sx={{ display: "flex", gap: 2, overflowX: "auto" }}>
        {stories.map((story, index) => (
          <Story key={index} story={story} />
        ))}
      </Box>
    </Paper>
  );
};
