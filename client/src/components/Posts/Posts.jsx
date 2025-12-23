import { Box } from "@mui/material";
import Post from './Post'

export default  ({ posts }) => {
  return (
    
    <Box width={'100%'}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Box>
  );
};
