import { useState, useRef, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import VideoCard from "./VideoCard";

export default ({ videos, setActivePost, setOpen, onEndReached }) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < videos.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const scrollToNextVideo = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      const nextIndex = currentIndex + 1;
      const element = document.getElementById(`video-${videos[nextIndex].id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (
      currentIndex === videos.length - 1 &&
      typeof onEndReached === "function"
    ) {
      onEndReached(currentIndex);
    }
  }, [currentIndex, videos.length, onEndReached]);

  const handleWheel = (e) => {
    if (e.deltaY > 0) handleNext();
    else handlePrev();
  };

  const onCommentClicked = (post) => {
    setActivePost(post);
    setOpen(true);
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        overflow: "hidden",
        bgcolor: theme.palette.grey[900],
      }}
      onWheel={handleWheel}
    >
      <Box
        ref={containerRef}
        sx={{
          height: "100%",
          overflowY: "auto",
          scrollSnapType: "y mandatory",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {videos.length === 0 && (
          <Typography
            component="h2"
            sx={{ fontSize: "40px", color: "gray", p: 3, textAlign: "center" }}
          >
            No Videos Yet
          </Typography>
        )}

        {videos.map((video) => (
          <Box
            key={video.id}
            id={`video-${video.id}`}
            sx={{
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
              height: "100%",
            }}
          >
            <VideoCard 
              video={video} 
              onCommentClicked={onCommentClicked} 
              onEnded={scrollToNextVideo} 
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
