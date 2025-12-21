import {
  Paper,
  Box,
  Avatar,
  Typography,
  Divider,
  Button,
  useTheme,
} from "@mui/material";
import {
  OndemandVideo as VideoIcon,
  PhotoLibrary as PhotoIcon,
  EmojiEmotions as EmojiIcon,
} from "@mui/icons-material";

export default  () => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
        <Avatar>U</Avatar>
        <Box
          onClick={() => {}}
          sx={{
            flex: 1,
            bgcolor: theme.palette.mode === "light" ? "#F0F2F5" : "#3A3B3C",
            borderRadius: 50,
            px: 2,
            py: 1.5,
            cursor: "pointer",
            "&:hover": {
              bgcolor: theme.palette.mode === "light" ? "#E4E6EB" : "#4E4F50",
            },
          }}
        >
          <Typography color="text.secondary">What's on your mind?</Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          startIcon={<VideoIcon sx={{ color: theme.palette.error.main }} />}
          sx={{
            textTransform: "none",
            color: theme.palette.text.secondary,
            fontWeight: 600,
          }}
        >
          Live video
        </Button>
        <Button
          startIcon={<PhotoIcon sx={{ color: theme.palette.success.main }} />}
          sx={{
            textTransform: "none",
            color: theme.palette.text.secondary,
            fontWeight: 600,
          }}
        >
          Photo/video
        </Button>
        <Button
          startIcon={<EmojiIcon sx={{ color: theme.palette.warning.main }} />}
          sx={{
            textTransform: "none",
            color: theme.palette.text.secondary,
            fontWeight: 600,
            display: { xs: "none", sm: "flex" },
          }}
        >
          Feeling/activity
        </Button>
      </Box>
    </Paper>
  );
};
