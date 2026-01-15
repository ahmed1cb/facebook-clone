import { Box, Typography } from "@mui/material";
import Post from "./Post";
import { useContext } from "react";
import PostContext from "../../App/Context/PostsContext";

export default ({ lastElementRef }) => {
  const { posts, setPosts } = useContext(PostContext);

  const likePost = (idx) => {
    setPosts((prevPosts) =>
      prevPosts.map((post, i) =>
        i === idx ? { ...post, isLiked: !post.isLiked } : post
      )
    );
  };

  return (
    <Box width={"100%"}>
      {posts.map((post, i) => {
        if (i === 0) {
          return (
            <Post
              key={post.id}
              post={posts[i]}
              ref={lastElementRef}
              onLike={() => likePost(i)}
            />
          );
        } else {
          return <Post key={post.id} post={post} onLike={() => likePost(i)} />;
        }
      })}
      {posts.length == 0 && (
        <Typography color="gray" variant="h2" sx={{ textAlign: "center" }}>
          No Posts Yet
        </Typography>
      )}
    </Box>
  );
};
