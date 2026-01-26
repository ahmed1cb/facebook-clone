import {
  Box,
  Container,
  Grid,
  useTheme,
  Fab,
  Zoom,
  useScrollTrigger,
  Typography,
  Button,
} from "@mui/material";
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
import { Add, Edit, ArrowUpward } from "@mui/icons-material";

const Profile = ({ userData }) => {
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const authUser = useSelector((s) => s.auth.user);

  const [posts, setPosts] = useState([]);

  // Scroll to top functionality
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    Alert.init(theme);
  }, []);

  useEffect(() => {
    if (!user) {
      if (userData) {
        setUser(userData);
      } else {
        setUser(authUser);
      }
    }
    if (user) {
      setPosts(user.posts);
    }
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
    user && (
      <PostContext.Provider value={{ posts, setPosts }}>
        <Box
          sx={{
            bgcolor: theme.palette.background.default,
            minHeight: "100vh",
            position: "relative",
          }}
        >
          {/* Profile Header */}
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
            }}
          >
            <ProfileHeader
              user={user}
              isOwnProfile={!userData}
              setShowModal={setShowModal}
            />
          </Box>

          {/* Main Content */}
          <Container
            maxWidth="xl"
            sx={{
              py: { xs: 2, md: 3 },
              position: "relative",
            }}
          >
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {/* Left Sidebar */}
              <Grid
                item
                xs={12}
                md={4}
                lg={3.5}
                sx={{
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    position: { md: "sticky" },
                    width: "100%",
                    top: { md: 84 },
                    maxHeight: { md: "calc(100vh - 100px)" },
                    overflowY: { md: "auto" },
                    "&::-webkit-scrollbar": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: theme.palette.background.paper,
                      borderRadius: "3px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: theme.palette.divider,
                      borderRadius: "3px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      background: theme.palette.action.hover,
                    },
                  }}
                >
                  <ProfileIntro
                    setShowModal={setShowModal}
                    isOwnProfile={!userData}
                    user={user}
                  />
                  <ProfilePhotos user={user} />
                  <ProfileFriends user={user} />
                </Box>
              </Grid>

              {/* Main Feed */}
              <Grid
                item
                xs={12}
                md={8}
                lg={8.5}
                sx={{
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    width: "100%",
                  }}
                >
                  {/* Create Post Card */}
                  <Box
                    sx={{
                      position: "sticky",
                      top: { xs: 56, md: 84 },
                      zIndex: 10,
                      bgcolor: theme.palette.background.paper,
                      borderRadius: 2,
                      boxShadow: theme.shadows[1],
                      border: `1px solid ${theme.palette.divider}`,
                      overflow: "hidden",
                    }}
                  >
                    {!userData && <CreatePost setOpen={setOpen} />}
                  </Box>

                  {/* Posts Feed */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                    }}
                  >
                    {user?.posts?.length > 0 ? (
                      <Posts
                        user={user}
                        openEditModal={openEditModal}
                        openCommentsPlace={openCommentsPlace}
                      />
                    ) : (
                      (!userData && (
                        <Box
                          sx={{
                            textAlign: "center",
                            py: 8,
                            px: 2,
                            bgcolor: theme.palette.background.paper,
                            borderRadius: 2,
                            border: `1px dashed ${theme.palette.divider}`,
                          }}
                        >
                          <Box
                            sx={{
                              width: 80,
                              height: 80,
                              borderRadius: "50%",
                              bgcolor: theme.palette.action.hover,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              mx: "auto",
                              mb: 2,
                            }}
                          >
                            <Edit
                              sx={{
                                fontSize: 32,
                                color: theme.palette.text.secondary,
                              }}
                            />
                          </Box>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "1.25rem",
                              color: theme.palette.text.primary,
                              mb: 1,
                            }}
                          >
                            No posts yet
                          </Typography>
                          <Typography
                            sx={{
                              color: theme.palette.text.secondary,
                              mb: 3,
                              maxWidth: 400,
                              mx: "auto",
                            }}
                          >
                            Share your thoughts, photos, or videos with your
                            friends
                          </Typography>
                          <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => setOpen(true)}
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              fontWeight: 600,
                              px: 3,
                              py: 1,
                            }}
                          >
                            Create your first post
                          </Button>
                        </Box>
                      )) || (
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "1.25rem",
                            textAlign: "center",
                            color: theme.palette.text.primary,
                            mb: 1,
                          }}
                        >
                          No posts yet
                        </Typography>
                      )
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>

          {/* Floating Action Buttons */}
          <Box
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              zIndex: 1000,
            }}
          >
            {/* Scroll to top FAB */}
            <Zoom in={trigger}>
              <Fab
                size="medium"
                onClick={scrollToTop}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                  boxShadow: theme.shadows[4],
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <ArrowUpward />
              </Fab>
            </Zoom>

            {/* Create Post FAB for mobile */}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <Fab
                color="primary"
                onClick={() => setOpen(true)}
                sx={{
                  boxShadow: theme.shadows[4],
                  "&:hover": {
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <Add />
              </Fab>
            </Box>
          </Box>

          {/* Modals */}
          <UpdateModal
            onClose={() => setShowModal(false)}
            open={showModal}
            userData={user}
          />

          <CreatePostModal
            open={open}
            onClose={() => setOpen(false)}
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
                posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)),
              )
            }
          />
        </Box>
      </PostContext.Provider>
    )
  );
};

export default Profile;
