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

  const user = useSelector((s) => s.auth.user);

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <ProfileHeader user={user} isOwnProfile={true} />

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                position: "sticky",
                width: "100%",

                top: 20,
              }}
            >
              <ProfileIntro user={user} />
              <ProfilePhotos user={user} />

              <ProfileFriends friends={user.friends} />
            </Box>
          </Grid>

          <Grid item xs={12} md={8} sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
              }}
            >
              <CreatePost />
              <Posts posts={user.posts} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
