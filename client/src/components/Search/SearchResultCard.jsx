import {
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Typography,
  Box,
  IconButton,
  Stack,
  alpha,
  useTheme,
} from "@mui/material";
import {
  CheckCircle,
  Public,
  CalendarToday,
  OpenInNew,
} from "@mui/icons-material";
import api from "../../App/services/api";
import VideoPlayer from "../Posts/VideoPlayer";

const SearchResultCard = ({ result }) => {
  const theme = useTheme();
  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (result.type === "people") {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: theme.shadows[4],
            borderColor: alpha(theme.palette.primary.main, 0.3),
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack
            direction="row"
            spacing={3}
            alignItems={"center"}
            sx={{ cursor: "pointer" }}
          >
            {/* Avatar Section */}
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={`${api.getUri()}/../storage/${result.photo}`}
                sx={{
                  width: 75,
                  height: 75,
                  fontWeight: 700,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  border: `3px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
              >
                {getInitials(result.name)}
              </Avatar>
            </Box>

            {/* Content Section */}
            <Box sx={{ flex: 1 }}>
              <Stack spacing={2}>
                {/* Name and Tags */}
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {result.name}
                    </Typography>
                    {result.verified && (
                      <CheckCircle
                        sx={{
                          fontSize: 18,
                          color: theme.palette.primary.main,
                        }}
                      />
                    )}
                  </Box>

                  {result.bio && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, lineHeight: 1.6 }}
                    >
                      {result.bio}
                    </Typography>
                  )}
                </Box>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  if (result.type === "posts") {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: theme.shadows[4],
            borderColor: alpha(theme.palette.primary.main, 0.3),
          },
        }}
      >
        
        <CardContent sx={{ p: 3, pb: 2 }}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar
              src={`${api.getUri()}/../storage/${result.user.photo}`}
              sx={{
                width: 48,
                height: 48,
                fontSize: 18,
                fontWeight: 600,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              }}
            >
              {getInitials(result.user.name)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 0.5,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {result.user.name}
                    </Typography>
                    <Public
                      sx={{ fontSize: 14, color: theme.palette.text.secondary }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      <CalendarToday
                        sx={{ fontSize: 12, verticalAlign: "middle", mr: 0.5 }}
                      />
                      {result.creation_date}
                    </Typography>
                  </Box>
                </Box>
                <IconButton size="small">
                  <OpenInNew />
                </IconButton>
              </Stack>
            </Box>
          </Stack>
        </CardContent>

        {/* Content */}
        <CardContent sx={{ p: 3, pt: 0 }}>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              lineHeight: 1.7,
              color: theme.palette.text.primary,
            }}
          >
            {result.subtext}
          </Typography>

          {result.type === "IMG" && (
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                mb: 2,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              <CardMedia
                component="img"
                image={`${api.getUri()}/../storage/${result.post_content}`}
                alt="Post image"
                sx={{
                  width: "100%",
                  maxHeight: 400,
                  objectFit: "cover",
                }}
              />
            </Box>
          )}

          {result.type === "VID" && (
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                mb: 2,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              <VideoPlayer
                src={`${api.getUri()}/../storage/${result.post_content}`}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    );
  }
  return null;
};

export default SearchResultCard;
