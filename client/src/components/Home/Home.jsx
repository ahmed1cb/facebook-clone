import { Box, Container, Grid } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import Stories from "../Story/Stories";
import CreatePost from "../Posts/CreatePost";
import Posts from "../Posts/Posts";
import Header from "../Header/Header";
import Contacts from "../Contacts/Contacts";

const Home = () => {
  
    const posts = [
    {
      id: 1,
      author: "Jane Cooper",
      avatar: "JC",
      time: "2h",
      content:
        "Just finished an amazing hike! The views were absolutely stunning. Nature always helps clear my mind. 🏔️ #hiking #nature #adventure",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      likes: 145,
      comments: 23,
      shares: 5,
    },
    {
      id: 2,
      author: "Alex Morgan",
      avatar: "AM",
      time: "5h",
      content:
        "Excited to share that I just launched my new website! Check it out and let me know what you think. 🚀 It's been months of hard work but finally seeing it live is incredible!",
      likes: 89,
      comments: 12,
      shares: 3,
    },
    {
      id: 3,
      author: "Michael Chen",
      avatar: "MC",
      time: "8h",
      content:
        "Amazing sunset at the beach today! Sometimes you just need to take a moment and appreciate the beauty around us. 🌅",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      likes: 234,
      comments: 45,
      shares: 12,
    },
    {
      id: 4,
      author: "Sophie Turner",
      avatar: "ST",
      time: "12h",
      content:
        "Coffee and code - the perfect combination for a productive morning! ☕💻 Working on something exciting, can't wait to share it with you all soon!",
      likes: 67,
      comments: 8,
      shares: 2,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      {/* Main Content */}
      <Box
        sx={{ flex: 1, bgcolor: (theme) => theme.palette.background.default }}
      >
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Grid container spacing={2}>
            {/* Left Sidebar */}
            <Grid
              item
              xs={12}
              md={3}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Sidebar />
            </Grid>

            {/* Center Feed */}
            <Grid item xs={12} md={6}>
              <Stories />
              <CreatePost />
              <Posts posts={posts} />
            </Grid>

            {/* Right Sidebar */}
            <Grid
              item
              xs={12}
              md={3}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Contacts />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
