import { useState, useRef, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import VideoCard from "./VideoCard";

export default ({ videos }) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const element = containerRef.current.children[currentIndex];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [currentIndex]);

  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      handleNext();
    } else {
      handlePrev();
    }

    return false;
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "95vh",
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
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
      >
        {videos.length === 0 && (
          <Typography
            component={"h2"}
            sx={{ fontSize: "40px", color: "gray", p: 3, textAlign: "center" }}
          >
            No Videos Yet
          </Typography>
        )}

        {videos.map((video, index) => (
          <Box
            key={video.id}
            sx={{
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
            }}
          >
            <VideoCard video={video} />
          </Box>
        ))}
      </Box>

      {/* Video Counter */}
      <Box
        sx={{
          position: "fixed",
          top: 80,
          right: 20,
          bgcolor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          px: 2,
          py: 1,
          borderRadius: 2,
          zIndex: 10,
        }}
      >
        <Typography variant="caption">
          {currentIndex + 1} / {videos.length}
        </Typography>
      </Box>
    </Box>
  );
};
