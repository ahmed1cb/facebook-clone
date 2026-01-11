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
} from "@mui/material";
import {
  ThumbUp as ThumbUpIcon,
  ChatBubbleOutline as CommentIcon,
  Public as PublicIcon,
  MoreHoriz as MoreHorizIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import api from "../../App/services/api";


export default ({ post }) => {
  const theme = useTheme();

  let user = post.user;

   user = user ??  useSelector((s) => s.auth.user);

  let profileImage = user.photo ? (
    <Avatar
      src={`${api.getUri()}/../storage/app/public/${user.photo}`}
    ></Avatar>
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
    >
      <CardHeader
        avatar={profileImage}
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
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
            color: post.isLiked ? 'primary' : theme.palette.text.secondary,
            flex: 1,
            fontWeight: 600,
            
          }}
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
