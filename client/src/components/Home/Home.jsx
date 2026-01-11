import { Box, Container, Grid, useTheme } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import Stories from "../Story/Stories";
import CreatePost from "../Posts/CreatePost";
import Posts from "../Posts/Posts";
import Contacts from "../Contacts/Contacts";
import { useSelector } from "react-redux";

const Home = () => {
  const theme = useTheme();
  const user = useSelector(s => s.auth.user);
  let friends = user.friends;
  const posts = [
    {
      id: 1,
      author: "Jane Cooper",
      avatar: "JC",
      time: "2h",
      content: "Just finished an amazing hike!",
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
      content: "Excited to share that I just launched my new website!",
      likes: 89,
      comments: 12,
      shares: 3,
    },
  ];



  return (
    <Box
      sx={{
        height: "fit-content",
        bgcolor: theme.palette.background.default,
        pt: 2,
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {/* Left Sidebar - Hidden on mobile & tablet */}
          <Grid
            item
            xs={0}
            lg={3}
            sx={{ display: { xs: "none", lg: "block" } }}
          >
            <Sidebar />
          </Grid>

          {/* Main Feed - Full width on mobile & tablet, 6/12 on desktop */}
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              width: { sm: "100%", lg: "auto" },
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Stories />
            </Box>

            <Box sx={{ mb: 2}}>
              <CreatePost />
            </Box>

            <Box>
              <Posts posts={posts} />
            </Box>
          </Grid>

          {/* Right Sidebar - Hidden on mobile & tablet */}
          <Grid
            item
            xs={0}
            lg={3}
            sx={{ display: { xs: "none", lg: "block" } }}
          >
            <Contacts contacts={friends} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
