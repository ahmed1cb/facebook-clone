import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  InputBase,
  useTheme,
  alpha,
  Container,
  Stack,
  Chip,
  Grid,
} from "@mui/material";
import {
  Search,
  People,
  PersonAdd,
  Close as CloseIcon,
  GroupAdd,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import FriendCard from "./FriendCard";
import FriendRequestCard from "./FriendRequestCard";

const FriendsPage = () => {
  const theme = useTheme();

  const user = useSelector((s) => s.auth.user);
  const requests = user.recived_requests;
  const friends = user.friends;
  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 2,
              bgcolor: theme.palette.background.paper,
              border: "1px solid",
              borderColor: theme.palette.divider,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <People
                  sx={{ color: theme.palette.primary.main, fontSize: 28 }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color: theme.palette.text.primary,
                  }}
                >
                  Friends
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  sx={{
                    bgcolor: alpha(theme.palette.action.hover, 0.3),
                    borderRadius: 2,
                    color: theme.palette.text.secondary,
                  }}
                >
                  <Search sx={{ fontSize: 20 }} />
                </IconButton>
              </Box>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                bgcolor: alpha(theme.palette.action.hover, 0.3),
                borderRadius: 3,
                border: "1px solid",
                borderColor: theme.palette.divider,
              }}
            >
              <IconButton sx={{ p: "10px" }} disabled>
                <Search
                  sx={{ fontSize: 20, color: theme.palette.text.secondary }}
                />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: "0.95rem" }}
                placeholder="Search friends"
                color="primary"
              />
            </Paper>
          </Paper>

          {/* Friend Requests Section */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              bgcolor: theme.palette.background.paper,
              border: "1px solid",
              borderColor: theme.palette.divider,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                p: 2.5,
                borderBottom: "1px solid",
                borderColor: theme.palette.divider,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: theme.palette.text.primary,
                  }}
                >
                  Friend Requests
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {requests.length} pending requests
                </Typography>
              </Box>
            </Box>

            {/* Requests Grid */}
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={2}>
                {requests.map((request) => (
                  <Grid item xs={12} md={4} key={request.id}>
                    <FriendRequestCard request={request.sender} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              bgcolor: theme.palette.background.paper,
              border: "1px solid",
              borderColor: theme.palette.divider,
              overflow: "hidden",
            }}
          >
            {/* Friends List Header */}
            <Box
              sx={{
                p: 2.5,
                borderBottom: "1px solid",
                borderColor: theme.palette.divider,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: theme.palette.text.primary,
                  }}
                >
                  All Friends
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {friends.length} total friends
                </Typography>
              </Box>
            </Box>

            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={1.5}>
                {friends.map((friend) => (
                  <Grid item xs={12} sm={6} md={3} key={friend.id}>
                    <FriendCard friend={friend.friend} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default FriendsPage;
