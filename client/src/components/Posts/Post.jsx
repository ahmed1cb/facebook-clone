import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  Button,
  Divider,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ThumbUp as ThumbUpIcon,
  ChatBubbleOutline as CommentIcon,
  Public as PublicIcon,
  MoreHoriz as MoreHorizIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  Report as ReportIcon,
  Bookmark as BookmarkIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import api from "../../App/services/api";
import Alert from "../../App/Alert/Swal";

export default ({ post, ref, onLike, onDelete }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const authUser = useSelector((s) => s.auth.user);
  const user = post.user ?? authUser;

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = async (action) => {
    handleMenuClose();

    switch (action) {
      case "edit":
        // Handle edit logic
        break;
      case "delete":
        let check = await Alert.confirm("Post Deletion", "Are You Sure");
        if (check) {
          onDelete();
        }
        break;
      case "share":
        // Handle share logic
        break;
      case "report":
        // Handle report logic
        break;
      case "save":
        // Handle save logic
        break;
      default:
        break;
    }
  };

  let profileImage = user.photo ? (
    <Avatar src={`${api.getUri()}/../storage/${user.photo}`}></Avatar>
  ) : (
    <Avatar>{user.name.slice(0, 2).toUpperCase()}</Avatar>
  );

  let mediaPath =
    post.post_type == "IMG" || post.post_type == "VID"
      ? `${api.getUri()}/../storage/${post.post_content}`
      : "";

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 2,
        bgcolor: theme.palette.background.paper,
        width: "100% !important",
      }}
      ref={ref ?? null}
    >
      <CardHeader
        avatar={profileImage}
        action={
          <>
            <IconButton
              onClick={handleMenuClick}
              aria-label="post options"
              aria-controls={open ? "post-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id="post-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 1,
                  minWidth: 180,
                },
              }}
            >
              {user.id === authUser.id && (
                <MenuItem onClick={() => handleMenuItemClick("edit")}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Edit Post</ListItemText>
                </MenuItem>
              )}

              {user.id === authUser.id && (
                <MenuItem onClick={() => handleMenuItemClick("delete")}>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Delete Post</ListItemText>
                </MenuItem>
              )}

              <MenuItem onClick={() => handleMenuItemClick("share")}>
                <ListItemIcon>
                  <ShareIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Share</ListItemText>
              </MenuItem>

              <MenuItem onClick={() => handleMenuItemClick("save")}>
                <ListItemIcon>
                  <BookmarkIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Save Post</ListItemText>
              </MenuItem>

              {user.id !== authUser.id && (
                <MenuItem onClick={() => handleMenuItemClick("report")}>
                  <ListItemIcon>
                    <ReportIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Report</ListItemText>
                </MenuItem>
              )}
            </Menu>
          </>
        }
        title={
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {user.name}
          </Typography>
        }
        subheader={
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              {post.creation_date || "Now"}
            </Typography>
            <Typography variant="caption">•</Typography>
            <PublicIcon
              sx={{ fontSize: 12, color: theme.palette.text.secondary }}
            />
          </Box>
        }
      />
      {post.post_type == "TXT" && (
        <CardContent sx={{ pt: 0 }}>
          <Typography variant="body1" color="text.primary">
            {post.post_content}
          </Typography>
        </CardContent>
      )}
      {post.post_type !== "TXT" &&
        post.subtext &&
        post.subtext.trim() != "" && (
          <CardContent sx={{ pt: 0 }}>
            <Typography variant="body1" color="text.primary">
              {post.subtext}
            </Typography>
          </CardContent>
        )}
      {post.post_type == "IMG" && (
        <CardMedia
          component="img"
          image={mediaPath}
          alt="Post image"
          sx={{ maxHeight: 500, objectFit: "cover" }}
        />
      )}
      <Box sx={{ px: 2, py: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            <Box
              component="span"
              sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
            >
              <Box
                component="span"
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  bgcolor: theme.palette.primary.main,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                }}
              >
                👍
              </Box>
              {post.likes_count}
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.comments_count} Comments
          </Typography>
        </Box>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: "space-around", py: 0.5 }}>
        <Button
          startIcon={<ThumbUpIcon />}
          sx={{
            textTransform: "none",
            color: post.isLiked
              ? theme.palette.primary.main
              : theme.palette.text.secondary,
            flex: 1,
            fontWeight: 600,
          }}
          onClick={onLike}
        >
          Like
        </Button>
        <Button
          startIcon={<CommentIcon />}
          sx={{
            textTransform: "none",
            color: theme.palette.text.secondary,
            flex: 1,
            fontWeight: 600,
          }}
        >
          Comment
        </Button>
      </CardActions>
    </Card>
  );
};
