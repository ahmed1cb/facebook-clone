import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Avatar,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Divider,
  alpha,
  useTheme,
} from "@mui/material";
import {
  PersonAdd,
  Message,
  Favorite,
  ChatBubbleOutline,
  Share,
  MoreHoriz,
  CheckCircle,
  Public,
  Lock,
  Group,
  Photo,
  CalendarToday,
  People,
  Bookmark,
} from "@mui/icons-material";

const SearchResultCard = ({ result, type }) => {
  const theme = useTheme();

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (type === "people") {
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
          <Stack direction="row" spacing={3}>
            {/* Avatar Section */}
            <Box sx={{ position: "relative" }}>
              <Avatar
                sx={{
                  width: 96,
                  height: 96,
                  fontSize: 32,
                  fontWeight: 700,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  border: `3px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
              >
                {getInitials(result.name)}
              </Avatar>
              {result.verified && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: theme.palette.primary.main,
                    borderRadius: "50%",
                    p: 0.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckCircle
                    sx={{
                      fontSize: 20,
                      color: "white",
                    }}
                  />
                </Box>
              )}
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

                  {/* Tags */}
                  {result.tags && result.tags.length > 0 && (
                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}
                    >
                      {result.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.08),
                            color: theme.palette.primary.main,
                            fontWeight: 500,
                            borderRadius: 1,
                          }}
                        />
                      ))}
                    </Box>
                  )}

                  {/* Mutual Friends */}
                  {result.mutualFriends && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <People
                        sx={{
                          fontSize: 16,
                          color: theme.palette.text.secondary,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {result.mutualFriends} mutual friends
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Action Buttons */}
                <CardActions sx={{ p: 0 }}>
                  <Stack direction="row" spacing={1.5}>
                    <Button
                      variant="contained"
                      startIcon={<PersonAdd />}
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 2,
                        px: 3,
                        bgcolor: theme.palette.primary.main,
                        "&:hover": {
                          bgcolor: theme.palette.primary.dark,
                        },
                      }}
                    >
                      Add Friend
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Message />}
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        borderRadius: 2,
                        px: 3,
                        borderColor: alpha(theme.palette.divider, 0.5),
                        color: theme.palette.text.primary,
                        "&:hover": {
                          borderColor: theme.palette.primary.main,
                          bgcolor: alpha(theme.palette.primary.main, 0.04),
                        },
                      }}
                    >
                      Message
                    </Button>
                    <IconButton
                      sx={{
                        border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                        borderRadius: 2,
                      }}
                    >
                      <MoreHoriz />
                    </IconButton>
                  </Stack>
                </CardActions>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  if (type === "posts") {
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
        {/* Header */}
        <CardContent sx={{ p: 3, pb: 2 }}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar
              sx={{
                width: 48,
                height: 48,
                fontSize: 18,
                fontWeight: 600,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              }}
            >
              {getInitials(result.author?.name)}
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
                      {result.author?.name}
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
                      {result.time}
                    </Typography>
                  </Box>
                </Box>
                <IconButton size="small">
                  <MoreHoriz />
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
            {result.content}
          </Typography>

          {/* Image */}
          {result.image && (
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
                image={result.image}
                alt="Post image"
                sx={{
                  width: "100%",
                  maxHeight: 400,
                  objectFit: "cover",
                }}
              />
            </Box>
          )}

          {/* Stats */}
          <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Favorite
                sx={{ fontSize: 16, color: theme.palette.error.main }}
              />
              <Typography variant="body2" color="text.secondary">
                {result.likes}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ChatBubbleOutline
                sx={{ fontSize: 16, color: theme.palette.text.secondary }}
              />
              <Typography variant="body2" color="text.secondary">
                {result.comments} comments
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 1 }} />

          {/* Actions */}
          <CardActions sx={{ p: 0 }}>
            <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
              <Button
                fullWidth
                startIcon={<Favorite />}
                sx={{
                  textTransform: "none",
                  color: theme.palette.text.secondary,
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: alpha(theme.palette.error.main, 0.08),
                    color: theme.palette.error.main,
                  },
                }}
              >
                Like
              </Button>
              <Button
                fullWidth
                startIcon={<ChatBubbleOutline />}
                sx={{
                  textTransform: "none",
                  color: theme.palette.text.secondary,
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    color: theme.palette.primary.main,
                  },
                }}
              >
                Comment
              </Button>
              <Button
                fullWidth
                startIcon={<Share />}
                sx={{
                  textTransform: "none",
                  color: theme.palette.text.secondary,
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: alpha(theme.palette.success.main, 0.08),
                    color: theme.palette.success.main,
                  },
                }}
              >
                Share
              </Button>
            </Stack>
          </CardActions>
        </CardContent>
      </Card>
    );
  }

  if (type === "photos") {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: theme.shadows[4],
            borderColor: alpha(theme.palette.primary.main, 0.3),
            "& .photo-overlay": {
              opacity: 1,
            },
          },
        }}
      >
        {/* Photo */}
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={result.image}
            alt={result.title}
            sx={{
              width: "100%",
              height: 200,
              objectFit: "cover",
            }}
          />
          <Box
            className="photo-overlay"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: alpha(theme.palette.common.black, 0.4),
              opacity: 0,
              transition: "opacity 0.3s ease-in-out",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              startIcon={<Photo />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                bgcolor: "white",
                color: "black",
                "&:hover": {
                  bgcolor: alpha(theme.palette.common.white, 0.9),
                },
              }}
            >
              View Photo
            </Button>
          </Box>
        </Box>

        {/* Photo Info */}
        <CardContent sx={{ p: 2.5 }}>
          <Stack spacing={1.5}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                {result.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                By {result.author?.name}
              </Typography>
            </Box>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarToday
                  sx={{ fontSize: 14, color: theme.palette.text.secondary }}
                />
                <Typography variant="caption" color="text.secondary">
                  {result.time}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <IconButton size="small">
                  <Favorite sx={{ fontSize: 18 }} />
                </IconButton>
                <IconButton size="small">
                  <Bookmark sx={{ fontSize: 18 }} />
                </IconButton>
                <IconButton size="small">
                  <Share sx={{ fontSize: 18 }} />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  if (type === "groups") {
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
          <Stack spacing={3}>
            {/* Group Header */}
            <Stack direction="row" spacing={3}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Group
                  sx={{
                    fontSize: 40,
                    color: theme.palette.primary.main,
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {result.name}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 1.5 }}>
                  <Chip
                    icon={
                      result.privacy === "Public group" ? <Public /> : <Lock />
                    }
                    label={result.privacy}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontWeight: 500,
                      borderRadius: 1,
                    }}
                  />
                  <Chip
                    icon={<People />}
                    label={`${result.members} members`}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontWeight: 500,
                      borderRadius: 1,
                    }}
                  />
                </Stack>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {result.description}
                </Typography>
              </Box>
            </Stack>

            {/* Action Buttons */}
            <CardActions sx={{ p: 0 }}>
              <Stack direction="row" spacing={1.5} sx={{ width: "100%" }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Group />}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 2,
                    py: 1.5,
                    bgcolor: theme.palette.primary.main,
                    "&:hover": {
                      bgcolor: theme.palette.primary.dark,
                    },
                  }}
                >
                  Join Group
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Message />}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    borderRadius: 2,
                    py: 1.5,
                    borderColor: alpha(theme.palette.divider, 0.5),
                    color: theme.palette.text.primary,
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  View Details
                </Button>
              </Stack>
            </CardActions>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default SearchResultCard;
