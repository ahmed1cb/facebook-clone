import { Box, Paper, Typography, Grid, Avatar, useTheme, Button } from "@mui/material";

export default function ProfileFriends({ friends }) {
  const theme = useTheme();

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
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Friends
        </Typography>
        <Button
          sx={{
            textTransform: "none",
            color: theme.palette.primary.main,
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          See all friends
        </Button>
      </Box>

      <Grid container spacing={2}>
        {friends.map((friend, index) => (
          <Grid item xs={12} key={index}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: theme.palette.primary.light,
                  color: "white",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {friend.avatar}
              </Avatar>
              <Typography
                variant="body1"
                sx={{ fontWeight: 500 }}
              >
                {friend.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}