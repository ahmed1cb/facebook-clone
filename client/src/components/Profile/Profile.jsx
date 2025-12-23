import { Box, Container, Grid, useTheme } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileIntro from "./ProfileIntro";
import ProfilePhotos from "./ProfilePhotos";
import ProfileFriends from "./ProfileFriends";
import CreatePost from "../Posts/CreatePost";
import Posts from "../Posts/Posts";

const Profile = () => {
  const theme = useTheme();

  // Mock user data
  const user = {
    name: "Ahmed Hassan",
    avatar: "",
    coverPhoto:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200",
    friendsCount: 542,
    bio: "Software Developer | Tech Enthusiast | Coffee Lover ☕",
    work: "Tech Company Inc.",
    education: "University of Technology",
    location: "New York, NY",
    hometown: "Cairo, Egypt",
    relationship: "Single",
    joinedDate: "January 2020",
    mutualFriends: [
      { name: "John Doe", avatar: "" },
      { name: "Sarah Smith", avatar: "" },
      { name: "Mike Johnson", avatar: "" },
      { name: "Emma Wilson", avatar: "" },
      { name: "David Brown", avatar: "" },
      { name: "Lisa Anderson", avatar: "" },
      { name: "Tom Harris", avatar: "" },
      { name: "Amy Martinez", avatar: "" },
    ],
  };

  const photos = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400",
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
    "https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=400",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
  ];

  const friends = [
    { name: "John Doe", avatar: "" },
    { name: "Sarah Smith", avatar: "" },
    { name: "Mike Johnson", avatar: "" },
    { name: "Emma Wilson", avatar: "" },
    { name: "David Brown", avatar: "" },
    { name: "Lisa Anderson", avatar: "" },
    { name: "Tom Harris", avatar: "" },
    { name: "Amy Martinez", avatar: "" },
    { name: "Chris Lee", avatar: "" },
  ];

  const posts = [
    {
      id: 1,
      author: "Ahmed Hassan",
      avatar: "",
      time: "2h",
      content:
        "Just finished working on a new project! Excited to share it with you all soon. 🚀 #coding #developer",
      likes: 89,
      comments: 12,
      shares: 3,
    },
    {
      id: 2,
      author: "Ahmed Hassan",
      avatar: "",
      time: "1 day ago",
      content:
        "Beautiful sunset today! Sometimes you need to take a break and enjoy the moment. 🌅",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      likes: 234,
      comments: 45,
      shares: 12,
    },
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default }}>
      <ProfileHeader user={user} isOwnProfile={true} />

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <ProfileIntro user={user} isOwnProfile={true} />
              <ProfilePhotos photos={photos} />
              <ProfileFriends friends={friends} />
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={7} sx={{width:'100%'}}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CreatePost />
              <Posts posts={posts} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
