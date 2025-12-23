import React, { useState } from "react";
import {
  Box,
  Container,
  Avatar,
  Typography,
  Button,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  PhotoCamera as PhotoCameraIcon,
  Edit as EditIcon,
  MoreHoriz as MoreHorizIcon,
  PersonAdd as PersonAddIcon,
  Message as MessageIcon,
} from "@mui/icons-material";

export default({ user, isOwnProfile = true }) => {
  const theme = useTheme();
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <Box sx={{ bgcolor: theme.palette.background.paper }}>
      {/* Cover Photo */}
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            height: { xs: 200, md: 400 },
            bgcolor: theme.palette.grey[300],
            backgroundImage: user.coverPhoto
              ? `url(${user.coverPhoto})`
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {isOwnProfile && (
          <Button
            startIcon={<PhotoCameraIcon />}
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                bgcolor: theme.palette.grey[200],
              },
            }}
          >
            Edit cover photo
          </Button>
        )}
      </Box>

      {/* Profile Info */}
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-end" },
            gap: 2,
            pb: 2,
          }}
        >
          {/* Profile Picture */}
          <Box
            sx={{
              position: "relative",
              mt: { xs: -8, md: -10 },
            }}
          >
            <Avatar
              src={user.avatar}
              sx={{
                width: { xs: 150, md: 180 },
                height: { xs: 150, md: 180 },
                border: `5px solid ${theme.palette.background.paper}`,
                fontSize: "4rem",
              }}
            >
              {user.name[0]}
            </Avatar>
            {isOwnProfile && (
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 5,
                  right: 5,
                  bgcolor: theme.palette.grey[200],
                  "&:hover": {
                    bgcolor: theme.palette.grey[300],
                  },
                }}
              >
                <PhotoCameraIcon />
              </IconButton>
            )}
          </Box>

          {/* Name and Stats */}
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "left" },
              pt: { xs: 1, md: 2 },
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              {user.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              {user.friendsCount} friends
            </Typography>

            {/* Friends Avatars */}
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                gap: 0.5,
              }}
            >
              {user.mutualFriends?.slice(0, 8).map((friend, index) => (
                <Avatar
                  key={index}
                  src={friend.avatar}
                  sx={{
                    width: 32,
                    height: 32,
                    border: `2px solid ${theme.palette.background.paper}`,
                  }}
                >
                  {friend.name[0]}
                </Avatar>
              ))}
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              pt: { xs: 1, md: 2 },
            }}
          >
            {isOwnProfile ? (
              <>
                <Button
                  startIcon={<EditIcon />}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    bgcolor: theme.palette.primary.main,
                  }}
                >
                  Edit profile
                </Button>
                <IconButton
                  onClick={handleMenuClick}
                  sx={{
                    bgcolor: theme.palette.grey[200],
                  }}
                >
                  <MoreHorizIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  startIcon={<PersonAddIcon />}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    bgcolor: theme.palette.primary.main,
                  }}
                >
                  Add Friend
                </Button>
                <Button
                  startIcon={<MessageIcon />}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    bgcolor: theme.palette.grey[200],
                    color: theme.palette.text.primary,
                  }}
                >
                  Message
                </Button>
                <IconButton
                  onClick={handleMenuClick}
                  sx={{
                    bgcolor: theme.palette.grey[200],
                  }}
                >
                  <MoreHorizIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Box>

        {/* Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleMenuClose}>View as</MenuItem>
          <MenuItem onClick={handleMenuClose}>Search profile</MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        </Menu>

        {/* Navigation Tabs */}
        <Divider sx={{ mt: 2 }} />
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Button
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: theme.palette.primary.main,
              borderBottom: `3px solid ${theme.palette.primary.main}`,
              borderRadius: 0,
              py: 2,
            }}
          >
            Posts
          </Button>
          <Button
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: theme.palette.text.secondary,
              py: 2,
            }}
          >
            About
          </Button>
          <Button
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: theme.palette.text.secondary,
              py: 2,
            }}
          >
            Friends
          </Button>
          <Button
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: theme.palette.text.secondary,
              py: 2,
            }}
          >
            Photos
          </Button>
          <Button
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: theme.palette.text.secondary,
              py: 2,
            }}
          >
            Videos
          </Button>
          <Button
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: theme.palette.text.secondary,
              py: 2,
            }}
          >
            More
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
