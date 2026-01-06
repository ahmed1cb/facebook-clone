import { Box, Container, useTheme } from "@mui/material";
import VideosList from "./VideosList";

const Videos = () => {
  const theme = useTheme();

  const videos = [
    {
      id: 1,
      title: "Amazing Nature Timelapse",
      description: "Stunning sunset timelapse captured in the mountains.",
      author: "Nature Lens",
      authorAvatar: "NL",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      views: "1.2M",
      timeAgo: "2 days ago",
      likes: 45000,
      hashtags: ["nature", "timelapse"],
    },
    {
      id: 2,
      title: "Quick Recipe: Pasta Perfection",
      description: "Learn how to make perfect creamy pasta.",
      author: "Chef Mike",
      authorAvatar: "CM",
      thumbnail: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800",
      views: "890K",
      timeAgo: "1 day ago",
      likes: 32000,
      hashtags: ["cooking", "recipe"],
    },
    {
      id: 3,
      title: "Epic Skateboard Trick",
      description: "Finally landed this trick after 100 attempts!",
      author: "Skate Pro",
      authorAvatar: "SP",
      thumbnail: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=800",
      views: "2.1M",
      timeAgo: "5 hours ago",
      likes: 67000,
      hashtags: ["skateboarding", "tricks"],
    },
    {
      id: 4,
      title: "Cute Puppy Compilation",
      description: "The cutest puppies you'll see today!",
      author: "Pet Lovers",
      authorAvatar: "PL",
      thumbnail: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800",
      views: "3.5M",
      timeAgo: "3 days ago",
      likes: 125000,
      hashtags: ["puppies", "cute"],
    },
    {
      id: 5,
      title: "Travel Vlog: Tokyo Streets",
      description: "Exploring the beautiful streets of Tokyo at night.",
      author: "Travel Diaries",
      authorAvatar: "TD",
      thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      views: "1.8M",
      timeAgo: "1 week ago",
      likes: 58000,
      hashtags: ["travel", "tokyo"],
    },
    {
      id: 6,
      title: "Workout Motivation",
      description: "Your body can do amazing things!",
      author: "Fit Life",
      authorAvatar: "FL",
      thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
      views: "950K",
      timeAgo: "4 days ago",
      likes: 41000,
      hashtags: ["fitness", "workout"],
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
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