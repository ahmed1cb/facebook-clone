import { useState } from "react";
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
  Chip,
} from "@mui/material";
import {
  ChatBubbleOutline as CommentIcon,
  Public as PublicIcon,
  MoreHoriz as MoreHorizIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  Report as ReportIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import api from "../../App/services/api";
import Alert from "../../App/Alert/Swal";
import VideoPlayer from "./VideoPlayer";
import { useNavigate } from "react-router-dom";

export default ({
  user = null,
  post,
  ref,
  onLike,
  onDelete,
  onCommentsOpen,
  onEdit,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const open = Boolean(anchorEl);
  const go = useNavigate();

  const authUser = useSelector((s) => s.auth.user);
  user = user ?? post.user ?? authUser;

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
        onEdit();
        break;
      case "delete":
        let check = await Alert.confirm("Post Deletion", "Are You Sure");
        if (check) {
          onDelete();
        }
        break;
      case "share":
        // Share functionality
        break;
      case "report":
        // Report functionality
        break;
      case "save":
        // Save functionality
        break;
      default:
        break;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  let profileImage = user.photo ? (
    <Avatar
      src={`${api.getUri()}/../storage/${user.photo}`}
      sx={{
        width: 44,
        height: 44,
        border: `2px solid ${theme.palette.primary.main}20`,
      }}
    />
  ) : (
    <Avatar
      sx={{
        width: 44,
        height: 44,
        bgcolor: theme.palette.primary.main,
        fontSize: "1rem",
        fontWeight: 600,
      }}
    >
      {user.name.slice(0, 2).toUpperCase()}
    </Avatar>
  );

  let mediaPath =
    post.post_type == "IMG" || post.post_type == "VID"
      ? `${api.getUri()}/../storage/${post.post_content}`
      : "";

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 2,
        bgcolor: theme.palette.background.paper,
        width: "100% !important",
        boxShadow: isHovered
          ? "0 6px 20px rgba(0,0,0,0.08)"
          : "0 1px 3px rgba(0,0,0,0.05)",
        transition: "all 0.2s ease",
        overflow: "hidden",
        border: `1px solid ${theme.palette.divider}`,
      }}
      ref={ref ?? null}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardHeader
        onClick={() => authUser.id !== user.id && go(`/user/${user.id}`)}
        avatar={profileImage}
        action={
          <Box>
            {post.post_type !== "TXT" && post.post_type && (
              <Chip
                label={post.post_type}
                size="small"
                sx={{
                  mr: 1,
                  bgcolor: theme.palette.primary.main + "15",
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                  fontSize: "0.7rem",
                }}
              />
            )}
            <IconButton
              onClick={handleMenuClick}
              aria-label="post options"
              size="small"
              sx={{
                bgcolor: isHovered ? "action.hover" : "transparent",
                transition: "background-color 0.2s",
              }}
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
                  minWidth: 200,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                },
              }}
            >
              {user.id === authUser.id && (
                <MenuItem
                  onClick={() => handleMenuItemClick("edit")}
                  sx={{ py: 1.2 }}
                >
                  <ListItemIcon>
                    <EditIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Edit Post"
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </MenuItem>
              )}

              {user.id === authUser.id && (
                <MenuItem
                  onClick={() => handleMenuItemClick("delete")}
                  sx={{ py: 1.2 }}
                >
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Delete Post"
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </MenuItem>
              )}

              <MenuItem
                onClick={() => handleMenuItemClick("share")}
                sx={{ py: 1.2 }}
              >
                <ListItemIcon>
                  <ShareIcon fontSize="small" color="action" />
                </ListItemIcon>
                <ListItemText
                  primary="Share"
                  primaryTypographyProps={{ variant: "body2" }}
                />
              </MenuItem>

              <MenuItem
                onClick={() => handleMenuItemClick("save")}
                sx={{ py: 1.2 }}
              >
                <ListItemIcon>
                  <BookmarkBorderIcon fontSize="small" color="action" />
                </ListItemIcon>
                <ListItemText
                  primary="Save Post"
                  primaryTypographyProps={{ variant: "body2" }}
                />
              </MenuItem>

              {user.id !== authUser.id && (
                <MenuItem
                  onClick={() => handleMenuItemClick("report")}
                  sx={{ py: 1.2 }}
                >
                  <ListItemIcon>
                    <ReportIcon fontSize="small" color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Report"
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </MenuItem>
              )}
            </Menu>
          </Box>
        }
        title={
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, fontSize: "1rem" }}
            >
              {user.name}
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.2 }}
            >
              <PublicIcon
                sx={{ fontSize: 14, color: theme.palette.text.secondary }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                {post.creation_date || "Now"}
              </Typography>
            </Box>
          </Box>
        }
        sx={{
          pb: 1.5,
          borderBottom: `1px solid ${theme.palette.divider}`,
          alignItems: "flex-start",
        }}
      />

      {post.post_type == "TXT" && (
        <CardContent sx={{ pt: 2.5, pb: 3 }}>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{
              fontSize: "1.05rem",
              lineHeight: 1.6,
              whiteSpace: "pre-line",
            }}
          >
            {post.post_content}
          </Typography>
        </CardContent>
      )}

      {post.post_type !== "TXT" &&
        post.subtext &&
        post.subtext.trim() != "" && (
          <CardContent sx={{ pt: 2.5, pb: post.post_type === "TXT" ? 3 : 2 }}>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                fontSize: "1.05rem",
                lineHeight: 1.6,
                whiteSpace: "pre-line",
                mb: post.post_type !== "TXT" ? 2 : 0,
              }}
            >
              {post.subtext}
            </Typography>
          </CardContent>
        )}

      {post.post_type == "IMG" && (
        <CardMedia
          component="img"
          image={mediaPath}
          alt="Post image"
          sx={{
            maxHeight: 600,
            objectFit: "cover",
            width: "100%",
            display: "block",
          }}
        />
      )}

      {post.post_type == "VID" && <VideoPlayer src={mediaPath} />}

      <Box sx={{ px: 2.5, py: 1.5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                bgcolor: theme.palette.primary.main + "15",
                px: 1.5,
                py: 0.5,
                borderRadius: 20,
              }}
            >
              <FavoriteIcon
                sx={{
                  fontSize: 16,
                  color: theme.palette.primary.main,
                }}
              />
              <Typography
                variant="body2"
                color="primary"
                sx={{ fontWeight: 600 }}
              >
                {post.likes_count ?? 0}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: theme.palette.text.secondary,
              }}
            >
              <CommentIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {post.comments_count}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider />

      <CardActions sx={{ justifyContent: "space-around", p: 0.5 }}>
        <Button
          startIcon={
            post.isLiked ? (
              <FavoriteIcon sx={{ color: theme.palette.primary.main }} />
            ) : (
              <FavoriteBorderIcon />
            )
          }
          sx={{
            textTransform: "none",
            color: post.isLiked
              ? theme.palette.primary.main
              : theme.palette.text.secondary,
            flex: 1,
            fontWeight: 600,
            fontSize: "0.95rem",
            borderRadius: 1,
            py: 1.2,
            "&:hover": {
              bgcolor: theme.palette.primary.main + "08",
            },
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
            fontSize: "0.95rem",
            borderRadius: 1,
            py: 1.2,
            "&:hover": {
              bgcolor: theme.palette.action.hover,
            },
          }}
          onClick={onCommentsOpen}
        >
          Comment
        </Button>
      </CardActions>
    </Card>
  );
};
