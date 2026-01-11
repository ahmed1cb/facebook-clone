import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  useTheme,
  Button,
} from "@mui/material";

export default function ProfileFriends({ friends }) {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 2,
        width: "100%",
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",

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
        {friends.map((friend, index) => {
          friend = friend.friend;

          let profileImage = friend.photo ? (
            <Avatar
              sx={{
                width: 90,
                height: 90,
                p: 8,

                border: `4px solid ${theme.palette.background.default}`,
                bgcolor: theme.palette.primary.main,
                color: "white",
                fontSize: 48,
                fontWeight: 700,
              }}
              src={`${api.getUri()}/../storage/app/public/${friend.photo}`}
            ></Avatar>
          ) : (
            <Avatar
              sx={{
                width: 90,
                height: 90,
                p: 8,
                border: `4px solid ${theme.palette.background.default}`,
                bgcolor: theme.palette.primary.main,
                color: "white",
                fontSize: 48,
                fontWeight: 700,
              }}
            >
              {friend.name.slice(0, 2).toUpperCase()}
            </Avatar>
          );

          return (
            <Grid item xs={12} key={index}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {profileImage}
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {friend.name}
                </Typography>
              </Box>
            </Grid>
          );
        })}

        {friends.length == 0 && "No Friends Yet"}
      </Grid>
    </Paper>
  );
}
