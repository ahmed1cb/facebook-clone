import React, { useEffect, useState, useCallback } from "react";
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
import { comment, getPostById, like } from "../../App/services/postservices";
import api from "../../App/services/api";
import Loader from "../Loader/Loader";
import NotFound from "../States/404";
import CommentsModal from "../Comments/Modal";
import { useSelector } from "react-redux";

const PostPage = () => {
  const theme = useTheme();
  const { id: postId } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const user = useSelector((s) => s.auth.user);
  const [isLiking, setisLiking] = useState(false);

  const getPost = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getPostById(postId);
      setPost(res?.data?.data?.post || null);
    } catch (err) {
      setPost(null);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  const handleLikeToggle = async () => {
    if (!post || isLiking) return;
    setisLiking(true);
    setPost((prev) => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes_count: prev.isLiked ? prev.likes_count - 1 : prev.likes_count + 1,
    }));
    await like(post.id);
    setisLiking(false);
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
    if (post.post_type === "IMG") {
      return (
        <Box sx={{ mt: 2, borderRadius: 1, overflow: "hidden" }}>
          <img
            src={renderPhoto(post.post_content)}
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
    }

    if (post.post_type === "VID") {
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
            <source src={renderPhoto(post.mediaUrl)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      );
    }

    return null;
  };

  const renderPhoto = (path) => {
    if (!path) return "";
    return `${api.getUri()}/../storage/${path}`;
  };

  if (loading) return <Loader />;
  if (!post) return <NotFound />;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        mt: 5,
        backgroundColor: theme.palette.mode === "dark" ? "#18191a" : "#f0f2f5",
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
              src={renderPhoto(post.user?.photo)}
            />
          }
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {post.user?.name}
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
            "& .MuiCardHeader-title": { fontSize: "0.9375rem" },
            "& .MuiCardHeader-subheader": { fontSize: "0.8125rem" },
            padding: theme.spacing(2),
          }}
        />

        <CardContent sx={{ padding: theme.spacing(0, 2, 2, 2) }}>
          <Typography variant="body1" paragraph sx={{ fontSize: "0.9375rem" }}>
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
                {post.comments?.length || 0} comments
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <Divider />

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
            onClick={() => setOpenModal(true)}
            aria-label="comment"
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
            {post.comments?.map((comment) => {
              comment.user = comment.user ?? user;
              return (
                <Box key={comment.id} sx={{ display: "flex", mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      mr: 1.5,
                      fontSize: "0.75rem",
                    }}
                    src={renderPhoto(comment.user?.photo)}
                  />
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
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {comment.user?.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "0.9375rem" }}
                      >
                        {comment.content}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <CommentsModal
            post={post}
            open={openModal}
            onClose={() => setOpenModal(false)}
            onComment={(c) => {
              setPost({
                ...post,
                comments: [...post.comments, c],
              });
            }}
            onDelete={(id) => {
              setPost({
                ...post,
                comments: post.comments.filter((comment) => comment.id != id),
              });
            }}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default PostPage;
