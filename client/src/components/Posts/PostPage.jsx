import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Divider,
  Chip,
  useTheme,
} from "@mui/material";
import {
  ThumbUp,
  ThumbUpOutlined,
  InsertPhoto,
  Videocam,
  TextFields,
  ChatBubbleOutline,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { getPostById } from "../../App/services/postservices";
import api from "../../App/services/api";
import Loader from "../Loader/Loader";
import NotFound from "../States/404";

const PostPage = () => {
  const theme = useTheme();
  const [post, setPost] = useState(null);
  const { id: postId } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!post || (post && post.id != postId)) {
      // get The Post Details
      getPost();
    }
  }, [postId]);

  async function getPost() {
    setLoading((s) => true);

    let res = await getPostById(postId);
    setPost(res?.data?.data?.post);
    setLoading((s) => false);
  }

  const handleLikeToggle = () => {
    setPost({
      ...post,
      isLiked: !post.isLiked,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1,
    });
  };
  const renderPostTypeIcon = () => {
    switch (post.post_type) {
      case "IMG":
        return <InsertPhoto fontSize="small" />;
      case "VID":
        return <Videocam fontSize="small" />;
      case "TXT":
        return <TextFields fontSize="small" />;
      default:
        return null;
    }
  };

  const renderPostContent = () => {
    if (post.type === "IMG") {
      return (
        <Box sx={{ mt: 2, borderRadius: 1, overflow: "hidden" }}>
          <img
            src={post.mediaUrl}
            alt="Post content"
            style={{
              width: "100%",
              maxHeight: "500px",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>
      );
    } else if (post.type === "VID") {
      return (
        <Box sx={{ mt: 2, borderRadius: 1, overflow: "hidden" }}>
          <video
            controls
            style={{
              width: "100%",
              maxHeight: "500px",
              backgroundColor: "#000",
              display: "block",
            }}
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Box>
      );
    }
    return null;
  };

  const renderPhoto = (s) => {
    return `${api.getUri()}/../storage/${s}`;
  };

  return (
    (post && (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100% !important",
          mt: 5,
          backgroundColor:
            theme.palette.mode === "dark" ? "#18191a" : "#f0f2f5",
        }}
      >
        <Card
          sx={{
            minWidth: "85%",
            borderRadius: "8px",
            boxShadow: theme.shadows[3],
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: 40,
                  height: 40,
                }}
                src={renderPhoto(post.user.photo)}
              ></Avatar>
            }
            title={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {post.user.name}
                </Typography>
              </Box>
            }
            subheader={
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
              >
                <Typography variant="caption" color="text.secondary">
                  {post.creation_date}
                </Typography>
                {post.post_privacy && (
                  <>
                    <Typography variant="caption" color="text.secondary">
                      •
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {post.post_privacy}
                    </Typography>
                  </>
                )}
              </Box>
            }
            sx={{
              "& .MuiCardHeader-title": {
                fontSize: "0.9375rem",
              },
              "& .MuiCardHeader-subheader": {
                fontSize: "0.8125rem",
              },
              padding: theme.spacing(2),
            }}
          />

          <CardContent sx={{ padding: theme.spacing(0, 2, 2, 2) }}>
            <Typography
              variant="body1"
              paragraph
              sx={{ fontSize: "0.9375rem" }}
            >
              {post.subtext}
            </Typography>

            {renderPostContent()}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 2,
                pt: 2,
                borderTop: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip
                  icon={renderPostTypeIcon()}
                  label={
                    post.post_type === "IMG"
                      ? "Photo"
                      : post.post_type === "VID"
                        ? "Video"
                        : "Text"
                  }
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: "6px",
                    borderColor: theme.palette.divider,
                    "& .MuiChip-icon": {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  {post.likes_count} likes
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {post.comments.length} comments
                </Typography>
              </Box>
            </Box>
          </CardContent>

          <Divider />

          {/* Like, Comment, Share Actions */}
          <CardActions sx={{ padding: "4px 8px" }}>
            <IconButton
              onClick={handleLikeToggle}
              aria-label="like"
              sx={{
                color: post.isLiked
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
                borderRadius: "4px",
                padding: "8px 16px",
                flex: 1,
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.04)",
                },
              }}
            >
              {post.isLiked ? (
                <ThumbUp fontSize="small" sx={{ mr: 1 }} />
              ) : (
                <ThumbUpOutlined fontSize="small" sx={{ mr: 1 }} />
              )}
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Like
              </Typography>
            </IconButton>

            <IconButton
              aria-label="share"
              sx={{
                color: theme.palette.text.secondary,
                borderRadius: "4px",
                padding: "8px 16px",
                flex: 1,
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.04)",
                },
              }}
            >
              <ChatBubbleOutline fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Comment
              </Typography>
            </IconButton>
          </CardActions>

          <Divider />

          <Box sx={{ padding: theme.spacing(2) }}>
            <Box sx={{ mb: 2 }}>
              {post.comments.map((comment) => (
                <Box key={comment.id} sx={{ display: "flex", mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      mr: 1.5,
                      fontSize: "0.75rem",
                    }}
                    src={renderPhoto(comment.user.photo)}
                  ></Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(0,0,0,0.02)",
                        borderRadius: "18px",
                        padding: "12px",
                        maxWidth: "90%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                        >
                          {comment.user.name}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "0.9375rem" }}
                      >
                        {comment.content}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 1,
                          gap: 1.5,
                        }}
                      ></Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Card>
      </Box>
    )) ||
    (loading && <Loader />) ||
    (!loading && !post && <NotFound />)
  );
};

export default PostPage;
