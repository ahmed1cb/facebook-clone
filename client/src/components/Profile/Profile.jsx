import { Box, Container, Grid, useTheme } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileIntro from "./ProfileIntro";
import ProfilePhotos from "./ProfilePhotos";
import ProfileFriends from "./ProfileFriends";
import CreatePost from "../Posts/CreatePost";
import Posts from "../Posts/Posts";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UpdateModal from "./UpdateModal";
import PostContext from "../../App/Context/PostsContext";
import Alert from "../../App/Alert/Swal";
import CreatePostModal from "../Posts/CreatePostModal";
import CommentsModal from "../Comments/Modal";
import EditPostModal from "../Posts/EditPostModal";

const Profile = () => {
  const theme = useTheme();

  const user = useSelector((s) => s.auth.user);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Alert.init(theme);
  }, []);
  useEffect(() => {
    setPosts(user.posts);
  }, [user]);

  const [activePost, setActivePost] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [open, setOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onUpload = (newPost) => {
    setPosts((prev) => {
      const postExists = prev.some((post) => post.id === newPost.id);
      if (postExists) {
        console.warn("Post already exists in feed");
        return prev;
      }

      return [newPost, ...prev];
    });
  };

  const openCommentsPlace = (post) => {
    setActivePost(() => post);
    setShowComments(() => true);
  };

  const openEditModal = (post) => {
    setActivePost(post);
    setShowEditModal(true);
  };

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      <Box
        sx={{
          bgcolor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <ProfileHeader
          user={user}
          isOwnProfile={true}
          setShowModal={setShowModal}
        />

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
                <ProfileIntro setShowModal={setShowModal} />
                <ProfilePhotos />

                <ProfileFriends />
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
                <CreatePost setOpen={setOpen} />
                <Posts
                  posts={user.posts}
                  openEditModal={openEditModal}
                  openCommentsPlace={openCommentsPlace}
                />
              </Box>
            </Grid>
            <UpdateModal
              onClose={() => {
                setShowModal(false);
              }}
              open={showModal}
              userData={user}
            />

            <CreatePostModal
              open={open}
              onClose={() => setOpen(!open)}
              onUpload={onUpload}
            />
            <CommentsModal
              open={showComments}
              onClose={() => setShowComments(false)}
              post={activePost}
            />

            <EditPostModal
              open={showEditModal}
              onClose={() => setShowEditModal(false)}
              post={activePost}
              onUpdate={(updatedPost) =>
                setPosts(
                  posts
                    .map((p) => (p.id === updatedPost.id ? updatedPost : p))
                )
              }
            />
          </Grid>
        </Container>
      </Box>
    </PostContext.Provider>
  );
};

export default Profile;
