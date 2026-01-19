import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  Box,
  IconButton,
  Avatar,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import {
  Close,
  Favorite,
  FavoriteBorder,
  Send,
  MoreVert,
} from "@mui/icons-material";
import api from "../../App/services/api";
import { useSelector } from "react-redux";
import PostContext from "../../App/Context/PostsContext";
import { comment } from "../../App/services/postservices";

export default function CommentsModal({
  open = true,
  onClose = () => {},
  post,
}) {
  const [comments, setComments] = useState(post?.comments);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const authUser = useSelector((s) => s.auth.user);
  const { setPosts } = useContext(PostContext);
  const addComment = async () => {
    if (!text.trim()) return;
    let id = post.id;

    let commentData = {
      content: text.trim(),
    };

    setLoading(() => true);
    const uploadedComment = await comment(id, commentData);
    setPosts((posts) =>
      posts.map((p) =>
        p.id === post.id
          ? {
              ...p,
              comments: [...p.comments, uploadedComment.data.data.comment],
            }
          : p,
      ),
    );

    setComments([...comments, uploadedComment.data.data.comment]);

    setText("");
    setLoading(() => false);
  };

  useEffect(() => {
    if (post) {
      setComments(post.comments);
    }
  }, [post]);

  return (
    comments && (
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
                  return (
                    <React.Fragment key={c.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            src={`${api.getUri()}/../storage/${c?.user?.photo ?? (!c.user ? authUser.photo : "")}`}
                          />
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
                              <Typography fontWeight={700}>
                                {c?.user?.name || authUser.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {c.time}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography sx={{ my: 1 }}>
                                {c.content}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              ></Box>
                            </>
                          }
                        />
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
              onKeyDown={(e) =>
                e.key === "Enter" &&
                !e.shiftKey &&
                (e.preventDefault(), addComment())
              }
            />
            <IconButton onClick={addComment} disabled={!text.trim()}>
              <Send />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    )
  );
}
