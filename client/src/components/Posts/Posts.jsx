import { Box, Typography, useTheme } from "@mui/material";
import Post from "./Post";
import { useContext, useEffect, useState } from "react";
import PostContext from "../../App/Context/PostsContext";
import { DeletePost, like } from "../../App/services/postservices";
import Alert from "../../App/Alert/Swal";

export default ({ user, lastElementRef, openCommentsPlace, openEditModal }) => {
  const { posts, setPosts } = useContext(PostContext);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Alert.init(theme);
  }, []);

  const onCommentsOpen = (idx) => {
    openCommentsPlace(posts[idx]);
  };
  const likePost = async (idx) => {
    if (loading) {
      return;
    }

    setLoading(() => true);

    setPosts((prevPosts) =>
      prevPosts.map((post, i) =>
        i === idx
          ? {
              ...post,
              likes_count: post.isLiked
                ? post.likes_count - 1
                : post.likes_count + 1,
              isLiked: !post.isLiked,
            }
          : post,
      ),
    );

    await like(posts[idx].id);

    setLoading(() => false);
  };

  const deletePost = async (idx) => {
    if (loading) {
      return;
    }
    setLoading(() => true);

    let post = posts[idx];
    await DeletePost(post.id);
    setPosts(posts.filter((p) => p.id !== post.id));

    setLoading(() => false);
  };

  const onPostEditClicked = (idx) => {
    let post = posts[idx];
    openEditModal(post);
  };

  return (
    <Box width={"100%"}>
      {posts.map((post, i) => {
        let isLast = i === posts.length - 1;
        return (
          <Post
            user={user}
            key={post.id}
            post={posts[i]}
            ref={isLast ? lastElementRef : null}
            onLike={() => likePost(i)}
            onDelete={() => deletePost(i)}
            onCommentsOpen={() => onCommentsOpen(i)}
            onEdit={() => onPostEditClicked(i)}
          />
        );
      })}
      {posts.length == 0 && (
        <Typography color="gray" variant="h2" sx={{ textAlign: "center" }}>
          No Posts Yet
        </Typography>
      )}
    </Box>
  );
};
