import { useState } from "react";
import {
  Box,
  IconButton,
  Avatar,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  ThumbUp as ThumbUpIcon,
  ChatBubble as ChatIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

const VideoPlayer = ({ video }) => {
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleMuteToggle = () => setIsMuted(!isMuted);
  const handleLike = () => setIsLiked(!isLiked);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        bgcolor: theme.palette.grey[900],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Video Background */}
      <Box
        component="img"
        src={video.thumbnail}
        alt={video.title}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.8)",
        }}
      />

      {/* Center Play Button */}
      {!isPlaying && (
        <IconButton
          onClick={handlePlayPause}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            width: 72,
            height: 72,
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.8)",
              transform: "translate(-50%, -50%) scale(1.1)",
            },
          }}
        >
          <PlayIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}

      {/* Top Bar */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar 
            sx={{ 
              width: 44, 
              height: 44,
              bgcolor: theme.palette.primary.main,
              fontWeight: 600
            }}
          >
            {video.authorAvatar}
          </Avatar>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ color: "white", fontWeight: 600, fontSize: 16 }}
            >
              {video.author}
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
              {video.timeAgo}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              fontSize: 12,
              fontWeight: 600,
              "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
            }}
          >
            Follow
          </Button>
          <IconButton
            onClick={handleMuteToggle}
            sx={{ color: "white" }}
          >
            {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>
        </Box>
      </Box>

      {/* Bottom Content */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: 600,
            fontSize: 20,
            mb: 1,
          }}
        >
          {video.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "rgba(255,255,255,0.9)",
            mb: 2,
            fontSize: 14,
          }}
        >
          {video.description}
        </Typography>

        {/* Hashtags */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
          {video.hashtags.map((tag, index) => (
            <Typography
              key={index}
              variant="caption"
              sx={{
                color: theme.palette.primary.light,
                fontWeight: 600,
                fontSize: 12,
              }}
            >
              #{tag}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Right Side Actions */}
      <Box
        sx={{
          position: "absolute",
          right: 16,
          bottom: 120,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <IconButton
            onClick={handleLike}
            sx={{
              bgcolor: isLiked ? theme.palette.primary.main : "rgba(255,255,255,0.1)",
              color: "white",
              width: 48,
              height: 48,
              mb: 0.5,
              "&:hover": {
                bgcolor: isLiked ? theme.palette.primary.dark : "rgba(255,255,255,0.2)",
              },
            }}
          >
            <ThumbUpIcon sx={{ fontSize: 24 }} />
          </IconButton>
          <Typography variant="caption" sx={{ color: "white", fontSize: 12 }}>
            {isLiked ? video.likes + 1 : video.likes}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <IconButton
            sx={{
              bgcolor: "rgba(255,255,255,0.1)",
              color: "white",
              width: 48,
              height: 48,
              mb: 0.5,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.2)",
              },
            }}
          >
            <ChatIcon sx={{ fontSize: 24 }} />
          </IconButton>
          <Typography variant="caption" sx={{ color: "white", fontSize: 12 }}>
            {video.comments}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <IconButton
            sx={{
              bgcolor: "rgba(255,255,255,0.1)",
              color: "white",
              width: 48,
              height: 48,
              mb: 0.5,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.2)",
              },
            }}
          >
            <ShareIcon sx={{ fontSize: 24 }} />
          </IconButton>
          <Typography variant="caption" sx={{ color: "white", fontSize: 12 }}>
            Share
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoPlayer;