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
  Share as ShareIcon,
  Public as PublicIcon,
  MoreHoriz as MoreHorizIcon,
} from "@mui/icons-material";

export default  ({ post }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 2,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <CardHeader
        avatar={<Avatar>{post.avatar}</Avatar>}
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title={
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {post.author}
          </Typography>
        }
        subheader={
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              {post.time}
            </Typography>
            <Typography variant="caption">•</Typography>
            <PublicIcon sx={{ fontSize: 12, color: theme.palette.text.secondary }} />
          </Box>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body1" color="text.primary">
          {post.content}
        </Typography>
      </CardContent>
      {post.image && (
        <CardMedia
          component="img"
          image={post.image}
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
            <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
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
              {post.likes}
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.comments} Comments • {post.shares} Shares
          </Typography>
        </Box>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: "space-around", py: 0.5 }}>
        <Button
          startIcon={<ThumbUpIcon />}
          sx={{
            textTransform: "none",
            color: theme.palette.text.secondary,
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
        <Button
          startIcon={<ShareIcon />}
          sx={{
            textTransform: "none",
            color: theme.palette.text.secondary,
            flex: 1,
            fontWeight: 600,
          }}
        >
          Share
        </Button>
      </CardActions>
    </Card>
  );
};
