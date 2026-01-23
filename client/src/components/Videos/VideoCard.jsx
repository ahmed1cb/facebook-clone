import { useState, useEffect, useRef } from "react";
import { Box, IconButton, Avatar, Typography, Button } from "@mui/material";
import {
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  Favorite as FavoriteIcon,
  ChatBubbleOutline as ChatIcon,
  Share as ShareIcon,
  MoreHoriz as MoreIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
} from "@mui/icons-material";
import api from "../../App/services/api";
import { like } from "../../App/services/postservices";

const VideoCard = (props) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [video, setVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!video) {
      setVideo(props.video);
    }
  }, [video]);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsPlaying(false);
        } else {
          setIsPlaying(true);
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
    setShowControls(true);
    setTimeout(() => setShowControls(false), 2000);
  };

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
  };

  const handleLike = async () => {
    if (loading) return;

    setLoading(() => true);

    await like(video.id);

    setVideo({
      ...video,
      isLiked: !video.isLiked,
      likes_count: video.isLiked
        ? video.likes_count - 1
        : video.likes_count + 1,
    });
    setLoading(() => false);
  };

  return (
    video && (
      <Box
        ref={containerRef}
        sx={{
          position: "relative",
          width: "100%",
          height: "95vh",
          bgcolor: "black",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={handlePlayPause}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setTimeout(() => setShowControls(false), 2000)}
      >
        {/* Video */}
        <video
          ref={videoRef}
          src={`${api.getUri()}/../storage/${video.post_content}`}
          style={{
            width: "100%",
            height: "100%",
          }}
          loop
          playsInline
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Top Bar */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)",
            opacity: showControls ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: 700,
              fontSize: "1.5rem",
              letterSpacing: "-0.5px",
            }}
          >
            Reels
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleMuteToggle();
              }}
              sx={{
                color: "white",
                bgcolor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                width: 40,
                height: 40,
                "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
              }}
            >
              {isMuted ? (
                <VolumeOffIcon sx={{ fontSize: 22 }} />
              ) : (
                <VolumeUpIcon sx={{ fontSize: 22 }} />
              )}
            </IconButton>

            <IconButton
              onClick={(e) => e.stopPropagation()}
              sx={{
                color: "white",
                bgcolor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                width: 40,
                height: 40,
                "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
              }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: showControls ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handlePlayPause();
            }}
            sx={{
              bgcolor: "rgba(255,255,255,0.9)",
              color: "#1877f2",
              width: 72,
              height: 72,
              "&:hover": { bgcolor: "white" },
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            {isPlaying ? (
              <PauseIcon sx={{ fontSize: 40 }} />
            ) : (
              <PlayIcon sx={{ fontSize: 40 }} />
            )}
          </IconButton>
        </Box>

        {/* Right Side Actions */}
        <Box
          sx={{
            position: "absolute",
            right: 16,
            bottom: 120,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          {/* Like Button */}
          <Box sx={{ textAlign: "center" }}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
              sx={{
                color: "white",
                width: 44,
                height: 44,
                bgcolor: video.isLiked
                  ? "rgba(249, 24, 128, 0.2) !important"
                  : "rgba(0,0,0,0.4)",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  bgcolor: video.isLiked
                    ? "rgba(249, 24, 128, 0.3) !important"
                    : "rgba(0,0,0,0.5)",
                },
              }}
            >
              <FavoriteIcon
                sx={{
                  fontSize: 26,
                  color: video.isLiked ? "#f91880 !important" : "white",
                }}
              />
            </IconButton>
            <Typography
              sx={{
                color: "white",
                fontSize: "0.8rem",
                fontWeight: 700,
                mt: 0.5,
                textShadow: "0 1px 2px rgba(0,0,0,0.8)",
              }}
            >
              {video.likes_count}
            </Typography>
          </Box>

          {/* Comment Button */}
          <Box sx={{ textAlign: "center" }}>
            <IconButton
              onClick={(e) => {e.stopPropagation(); props.onCommentClicked(video)}}
              sx={{
                color: "white",
                width: 44,
                height: 44,
                bgcolor: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(10px)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
              }}
            >
              <ChatIcon sx={{ fontSize: 26 }} />
            </IconButton>
            <Typography
              sx={{
                color: "white",
                fontSize: "0.8rem",
                fontWeight: 700,
                mt: 0.5,
                textShadow: "0 1px 2px rgba(0,0,0,0.8)",
              }}
            >
              {video.comments_count.toLocaleString()}
            </Typography>
          </Box>

          {/* Share Button */}
          <Box sx={{ textAlign: "center" }}>
            <IconButton
              onClick={(e) => e.stopPropagation()}
              sx={{
                color: "white",
                width: 44,
                height: 44,
                bgcolor: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(10px)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
              }}
            >
              <ShareIcon sx={{ fontSize: 26 }} />
            </IconButton>
            <Typography
              sx={{
                color: "white",
                fontSize: "0.8rem",
                fontWeight: 700,
                mt: 0.5,
                textShadow: "0 1px 2px rgba(0,0,0,0.8)",
              }}
            >
              Share
            </Typography>
          </Box>

          {/* More Options */}
          <IconButton
            onClick={(e) => e.stopPropagation()}
            sx={{
              color: "white",
              width: 44,
              height: 44,
              bgcolor: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(10px)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
            }}
          >
            <MoreIcon sx={{ fontSize: 26 }} />
          </IconButton>
        </Box>

        {/* Bottom Content */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 80,
            p: 2.5,
            pb: 4,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
          }}
        >
          {/* User Info */}
          <Box
            sx={{ display: "flex", alignItems: "center", mb: 1.5, gap: 1.5 }}
          >
            <Avatar
              src={`${api.getUri()}/../storage/${video.user.photo}`}
              sx={{
                width: 40,
                height: 40,
                border: "2px solid white",
              }}
            />
            <Typography
              sx={{
                color: "white",
                fontWeight: 700,
                fontSize: "1rem",
                textShadow: "0 1px 3px rgba(0,0,0,0.8)",
              }}
            >
              {video.user.name}
            </Typography>
          </Box>

          {/* Description */}
          <Typography
            sx={{
              color: "white",
              fontSize: "0.95rem",
              mb: 1,
              lineHeight: 1.4,
              maxWidth: "85%",
              textShadow: "0 1px 3px rgba(0,0,0,0.8)",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {video.subtext}
          </Typography>

          {/* Hashtags */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
            {video.tags?.slice(0, 3).map((tag, index) => (
              <Typography
                key={index}
                sx={{
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                #{tag}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Progress Bar */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            bgcolor: "rgba(255,255,255,0.3)",
          }}
        >
          <Box
            sx={{
              width: `${progress}%`,
              height: "100%",
              bgcolor: "white",
              transition: "width 0.05s linear",
            }}
          />
        </Box>
      </Box>
    )
  );
};

export default VideoCard;
