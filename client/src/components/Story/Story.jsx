
import { Box, Avatar, Typography, useTheme } from "@mui/material";

export default  ({ story }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minWidth: 110,
        height: 190,
        borderRadius: 2,
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        bgcolor: story.isCreate
          ? theme.palette.background.paper
          : theme.palette.grey[800],
        border: `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: story.isCreate ? "flex-end" : "flex-start",
        p: 1,
        "&:hover": {
          transform: "scale(1.02)",
          transition: "transform 0.2s",
        },
      }}
    >
      {story.isCreate ? (
        <>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
            }}
          >
            <Typography
              sx={{
                color: theme.palette.primary.contrastText,
                fontSize: "1.5rem",
              }}
            >
              +
            </Typography>
          </Box>
          <Typography
            variant="caption"
            sx={{ fontWeight: 600, color: theme.palette.text.primary }}
          >
            Create Story
          </Typography>
        </>
      ) : (
        <>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              border: `3px solid ${theme.palette.primary.main}`,
            }}
          >
            {story.avatar}
          </Avatar>
          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              left: 8,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.common.white,
                fontWeight: 600,
                textShadow: "0 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              {story.name}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};