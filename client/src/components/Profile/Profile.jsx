import { Box, Container, Grid, useTheme } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileIntro from "./ProfileIntro";
import ProfilePhotos from "./ProfilePhotos";
import ProfileFriends from "./ProfileFriends";
import CreatePost from "../Posts/CreatePost";
import Posts from "../Posts/Posts";
import { useSelector } from "react-redux";

const Profile = () => {
  const theme = useTheme();

  // const user = {
  //   name: "Ahmed Hassan",
  //   avatar: "AH",
  //   coverPhoto: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200",
  //   friendsCount: 542,
  //   bio: "Software Developer | Tech Enthusiast",
  //   work: "Tech Company Inc.",
  //   education: "University of Technology",
  //   location: "New York, NY",
  //   hometown: "Cairo, Egypt",
  //   joinedDate: "January 2020",
  // };

  
  const user = useSelector((s) => s.auth.user);

  const photos = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400",
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400" 
   ];

  const friends = [
    { name: "John Doe", avatar: "JD" },
    { name: "Sarah Smith", avatar: "SS" },
    { name: "Mike Johnson", avatar: "MJ" },
    { name: "Emma Wilson", avatar: "EW" },
    { name: "David Brown", avatar: "DB" },
    { name: "Lisa Anderson", avatar: "LA" },
  ];

  const posts = [
    {
      id: 1,
      author: "Ahmed Hassan",
      avatar: "AH",
      time: "2h",
      content: "Just finished working on a new project! Excited to share it with you all soon.",
      likes: 89,
      comments: 12,
      shares: 3,
    },
    {
      id: 2,
      author: "Ahmed Hassan",
      avatar: "AH",
      time: "1 day ago",
      content: "Beautiful sunset today! Sometimes you need to take a break.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      likes: 234,
      comments: 45,
      shares: 12,
    },
  ];
  

  return (
    <Box sx={{ 
      bgcolor: theme.palette.background.default,
      minHeight: "100vh" 
    }}>
      <ProfileHeader user={user} />
      
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: 2,
              position: "sticky",
              top: 20
            }}>
              <ProfileIntro user={user} />
              <ProfilePhotos  user={user} />
              
              <ProfileFriends friends={friends} />
            </Box>
          </Grid>

          <Grid item xs={12} md={8} sx={{width:'100%'}}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 , width:'100%' }}>
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