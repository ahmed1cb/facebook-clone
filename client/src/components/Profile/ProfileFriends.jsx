import { Box, Paper, Typography, Grid, Avatar, useTheme, Button } from "@mui/material";

export default ({ friends }) => {
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
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Friends
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {friends.length} friends
          </Typography>
        </Box>
        <Button
          sx={{
            textTransform: "none",
            color: theme.palette.primary.main,
            fontWeight: 600,
          }}
        >
          See all friends
        </Button>
      </Box>

      <Grid container spacing={2}>
        {friends.slice(0, 9).map((friend, index) => (
          <Grid item xs={4} key={index}>
            <Box
              sx={{
                cursor: "pointer",
                "&:hover": {
                  "& .friend-name": {
                    textDecoration: "underline",
                  },
                },
              }}
            >
              <Avatar
                src={friend.avatar}
                sx={{
                  width: "100%",
                  height: 120,
                  borderRadius: 1,
                  fontSize: "2rem",
                }}
              >
                {friend.name[0]}
              </Avatar>
              <Typography
                className="friend-name"
                variant="body2"
                sx={{ mt: 0.5, fontWeight: 600 }}
              >
                {friend.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};