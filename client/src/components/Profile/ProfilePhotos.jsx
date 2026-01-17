import { Box, Paper, Typography, Grid, useTheme, Button } from "@mui/material";
import { useSelector } from "react-redux";

export default () => {
  const theme = useTheme();

  const user = useSelector((s) => s.auth.user);
  let photos = user.posts.filter((p) => p.type === "IMG");

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Photos
        </Typography>
        <Button
          sx={{
            textTransform: "none",
            color: theme.palette.primary.main,
            fontWeight: 600,
          }}
        >
          See all photos
        </Button>
      </Box>

      <Grid container spacing={1}>
        {photos.slice(0, 9).map((photo, index) => (
          <Grid item xs={4} key={index}>
            <Box
              component="img"
              src={photo}
              alt={`Photo ${index + 1}`}
              sx={{
                width: "100%",
                height: 120,
                objectFit: "cover",
                borderRadius: 1,
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.9,
                },
              }}
            />
          </Grid>
        ))}
        {photos.length === 0 && "No Shared Photos Yet"}
      </Grid>
    </Paper>
  );
};
