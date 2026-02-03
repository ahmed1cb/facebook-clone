import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  Modal,
  Box,
  IconButton,
  Avatar,
  Typography,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import { Close, Send, MoreVert, Delete } from "@mui/icons-material";
import api from "../../App/services/api";
import { useSelector } from "react-redux";
import PostContext from "../../App/Context/PostsContext";
import { comment, deleteCommentById } from "../../App/services/postservices";

export default function CommentsModal({
  open = true,
  onClose = () => {},
  post,
  onComment = () => {},
  onDelete = () => {},
}) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);
  const authUser = useSelector((s) => s.auth.user);
  const { setPosts } = useContext(PostContext);

  useEffect(() => {
    if (post?.comments) setComments(post.comments);
  }, [post]);

  const addComment = useCallback(async () => {
    if (!text.trim() || !post) return;

    setLoading(true);
    try {
      const res = await comment(post.id, { content: text.trim() });
      const newComment = res?.data?.data?.comment;
      if (!newComment) return;

      onComment(newComment);

      setComments([...comments, newComment]);

      setText("");
    } finally {
      setLoading(false);
    }
  }, [text, post, onComment, setPosts]);

  const handleMenuOpen = useCallback((event, comment) => {
    setAnchorEl(event.currentTarget);
    setSelectedComment(comment);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    setSelectedComment(null);
  }, []);

  const handleDeleteComment = useCallback(async () => {
    if (!selectedComment || !post) return;

    setDeleting(true);
    try {
      await deleteCommentById(selectedComment.id);

      setComments((prev) => prev.filter((c) => c.id !== selectedComment.id));
      onDelete(selectedComment.id);
    } finally {
      setDeleting(false);
      handleMenuClose();
    }
  }, [selectedComment, post, onDelete, setPosts, handleMenuClose]);

  const canDeleteComment = useCallback(
    (comment) => authUser.id === comment?.user?.id || !comment.user,
    [authUser.id],
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          maxHeight: "85vh",
          width: "90vw",
          bgcolor: "background.paper",
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography fontWeight={700}>Comments</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {/* List */}
        <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : comments.length ? (
            <List disablePadding>
              {comments.map((c, i) => {
                const user = c.user || authUser;
                const avatarSrc = `${api.getUri()}/../storage/${user?.photo || ""}`;

                return (
                  <React.Fragment key={c.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src={avatarSrc} />
                      </ListItemAvatar>

                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography component="span" fontWeight={700}>
                              {user?.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              component="span"
                            >
                              {c.time}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography component="span" sx={{ my: 1 }}>
                            {c.content}
                          </Typography>
                        }
                        secondaryTypographyProps={{ component: "span" }}
                      />

                      {canDeleteComment(c) && (
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, c)}
                          disabled={deleting}
                          sx={{ ml: 1 }}
                        >
                          <MoreVert fontSize="small" />
                        </IconButton>
                      )}
                    </ListItem>
                    {i < comments.length - 1 && <Divider />}
                  </React.Fragment>
                );
              })}
            </List>
          ) : (
            <Typography align="center" color="text.secondary">
              No comments yet
            </Typography>
          )}
        </Box>

        {/* Delete Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDeleteComment} disabled={deleting}>
            {deleting ? (
              <CircularProgress size={20} sx={{ mr: 1 }} />
            ) : (
              <Delete fontSize="small" sx={{ mr: 1 }} />
            )}
            Delete Comment
          </MenuItem>
        </Menu>

        {/* Input */}
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: "divider",
            display: "flex",
            gap: 1,
          }}
        >
          <Avatar src={`${api.getUri()}/../storage/${authUser.photo}`} />
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                addComment();
              }
            }}
          />
          <IconButton onClick={addComment} disabled={!text.trim()}>
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
}
