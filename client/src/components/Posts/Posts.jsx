import { Box, Typography } from "@mui/material";
import Post from "./Post";

export default ({ posts }) => {
  return (
    <Box width={"100%"}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}


      {posts.length == 0 && <Typography color="gray" variant="h2" sx={{textAlign:'center'}} >No Posts Yet</Typography>}
    </Box>
  );

};
