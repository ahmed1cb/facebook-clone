import {
  Box,
  Container,
  Avatar,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import { PersonAdd, PersonRemove } from "@mui/icons-material";
import api from "../../App/services/api";
import { useState } from "react";
import { request } from "../../App/services/usersServices";

export default function ProfileHeader({ user, isOwnProfile = true }) {
  const theme = useTheme();
  const [isRequested, setIsRequested] = useState(user.isRequested);
  const [loading, setLoading] = useState(false);

  let profileImage = user.photo ? (
    <Avatar
      sx={{
        width: { xs: 120, md: 160 },
        height: { xs: 120, md: 160 },
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
        width: { xs: 120, md: 160 },
        height: { xs: 120, md: 160 },
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

  const handleSendRequest = async () => {
    const id = user.id;
    if (loading || user.isFriend) return;

    setIsRequested(!isRequested);

    setLoading(true);

    await request(id);

    setLoading(false);
  };
  return (
    <Box sx={{ bgcolor: theme.palette.background.default }}>
      {/* Cover Photo */}
      <Box
        sx={{
          height: { xs: 200, md: 300 },
          backgroundImage: user?.cover
            ? `url('${api.getUri()}/../storage/${user.cover}')`
            : "linear-gradient(to left , white , black)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          bgcolor: theme.palette.grey[900],
        }}
      />

      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Main Profile Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          {/* Profile Picture */}
          <Box sx={{ mt: { xs: -12, md: -10 }, position: "relative" }}>
            {profileImage}
          </Box>

          {/* Info Section */}
          <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
            {/* Name */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: theme.palette.text.primary,
              }}
            >
              {user.name}
            </Typography>

            {/* Bio */}
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                mb: 2,
              }}
            >
              {user.bio}
            </Typography>

            {/* Stats */}
            <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Friends {user.friends.length}
                </Typography>
              </Box>
              {
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {user.location ?? "Loaction Not Shared"}
                  </Typography>
                </Box>
              }
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2 }}>
              {(!isOwnProfile && !user.isFriend && !user.hasRequestFrom && (
                <>
                  <Button
                    disabled={loading}
                    variant="contained"
                    color={isRequested ? "error" : "primary"}
                    startIcon={isRequested ? <PersonRemove /> : <PersonAdd />}
                    sx={{ textTransform: "none", fontWeight: 600 }}
                    onClick={() => handleSendRequest()}
                  >
                    {!isRequested ? "Send Request" : "Cancel Request"}
                  </Button>
                </>
              )) || (
                <Typography component={"span"} sx={{ color: "gray" }}>
                  {user.hasRequestFrom
                    ? "You Have A Reqeust From This User"
                    : "Your Friend"}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
