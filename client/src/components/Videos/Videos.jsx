import { Box, Container, useTheme } from "@mui/material";
import VideosList from "./VideosList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVideos } from "../../App/Redux/Features/Posts/Services";

const Videos = () => {
  const theme = useTheme();

  const dispatch = useDispatch()
  const videos = useSelector((s) => s.posts.videos);
  useEffect(() => {
    if (!videos){
      dispatch(getVideos(1))
    }
  },[videos])

  return videos && ( 
    <Box
      sx={{
        minHeight: "95vh",
        bgcolor: theme.palette.background.default,
        pt: 2,
      }}
    >
      <Container maxWidth="lg">
        <VideosList videos={videos} />
      </Container>
    </Box>
  );
};

export default Videos;