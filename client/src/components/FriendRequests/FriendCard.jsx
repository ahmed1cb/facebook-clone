import { Box, Paper, Typography, Avatar, alpha, useTheme } from "@mui/material";
import api from "../../App/services/api";
import { useNavigate } from "react-router-dom";
const FriendCard = ({ friend }) => {
  const theme = useTheme();
  const go = useNavigate();
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 1.5,
        bgcolor: theme.palette.background.paper,
        borderRadius: 2,
        border: "1px solid",
        borderColor: theme.palette.divider,
        transition: theme.transitions.create(
          ["background-color", "border-color"],
          {
            duration: theme.transitions.duration.shorter,
          },
        ),
        "&:hover": {
          bgcolor: alpha(theme.palette.action.hover, 0.3),
          borderColor: theme.palette.action.disabled,
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Avatar
          src={`${api.getUri()}/../storage/${friend.photo}`}
          sx={{
            width: 48,
            height: 48,
            cursor: "pointer",
          }}
        />
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            fontSize: "0.9rem",
            color: theme.palette.text.primary,
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={() => go(`/user/${friend.id}`)}
        >
          {friend.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary, fontSize: "0.75rem" }}
        >
          {friend.bio?.slice(0, 10)}
        </Typography>
      </Box>
    </Paper>
  );
};

export default FriendCard;
