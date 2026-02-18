import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  alpha,
  useTheme,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import api from "../../App/services/api";
import { useNavigate } from "react-router-dom";
import { acceptRequest, rejectRequest } from "../../App/services/usersServices";
const FriendRequestCard = ({ request }) => {
  const theme = useTheme();
  const go = useNavigate();

  const acceptUser = async () => {
    await acceptRequest(request.id);
    location.reload();
  };

  const rejectUser = async () => {
    await rejectRequest(request.id);
    location.reload();
  };
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        gap: 2,
        p: 2,
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
      <Avatar
        src={`${api.getUri()}/../storage/${request.photo}`}
        sx={{
          width: 56,
          height: 56,
          cursor: "pointer",
          border: "2px solid",
          borderColor: "transparent",
          transition: theme.transitions.create("border-color"),
          "&:hover": {
            borderColor: theme.palette.primary.main,
          },
        }}
      />

      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: "pointer",
                color: theme.palette.text.primary,
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => go(`/user/${request.id}`)}
            >
              {request.name}
            </Typography>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Check sx={{ fontSize: 18 }} />}
            sx={{
              textTransform: "none",
              borderRadius: "6px",
              py: 0.8,
              fontSize: "0.85rem",
              fontWeight: 600,
              boxShadow: "none",
            }}
            onClick={acceptUser}
          >
            Confirm
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Close sx={{ fontSize: 18 }} />}
            sx={{
              textTransform: "none",
              borderRadius: "6px",
              py: 0.8,

              fontSize: "0.85rem",
              fontWeight: 600,
            }}
            onClick={rejectUser}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default FriendRequestCard;
