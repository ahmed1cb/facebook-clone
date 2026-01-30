import { Paper, Box, Avatar, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import api from "../../App/services/api";
export default ({ setOpen }) => {
  const theme = useTheme();
  const user = useSelector((s) => s.auth.user);

  let profileImage = user.photo ? (
    <Avatar
      sx={{
        border: `4px solid ${theme.palette.background.default}`,
        bgcolor: theme.palette.primary.main,
        color: "white",
        fontSize: 48,
        fontWeight: 700,
      }}
      src={`${api.getUri()}/../storage/${user.photo}`}
    ></Avatar>
  ) : (
    <Avatar
      sx={{
        border: `4px solid ${theme.palette.background.default}`,
        bgcolor: theme.palette.primary.main,
        color: "white",
        fontSize: 48,
        fontWeight: 700,
      }}
    >
      {user.name.slice(0, 2).toUpperCase()}
    </Avatar>
  );

  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1.5 }}>
        {profileImage}
        <Box
          onClick={() => {
            setOpen((o) => !o);
          }}
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
    </Paper>
  );
};
