import {
  Box,
  Container,
  Grid,
  Typography,
  useTheme,
  Fab,
  Zoom,
  useScrollTrigger,
  Chip,
  Alert as MuiAlert,
  Button,
  Drawer,
  IconButton,
} from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import CreatePost from "../Posts/CreatePost";
import Posts from "../Posts/Posts";
import Contacts from "../Contacts/Contacts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef, useCallback } from "react";
import { getPosts } from "../../App/Redux/Features/Posts/Services";
import Loader from "../Loader/Loader";
import PostContext from "../../App/Context/PostsContext";
import CreatePostModal from "../Posts/CreatePostModal";
import CommentsModal from "../Comments/Modal";
import EditPostModal from "../Posts/EditPostModal";
import {
  ArrowUpward,
  Refresh,
  Group,
  TrendingUp,
  People,
  Menu,
  Close,
  Add,
} from "@mui/icons-material";
import { setPosts } from "../../App/Redux/Features/Posts/PostsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const observerRef = useRef();

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

  const user = useSelector((s) => s.auth.user);
  const friends = user.friends;
  const { state, error } = useSelector((s) => s.posts);
  const posts = useSelector((s) => s.posts.posts || []);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [open, setOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileContactsOpen, setMobileContactsOpen] = useState(false);

  useEffect(() => {
    if (!posts || posts.length == 0) {
      dispatch(getPosts(1));
    }
  }, [posts]);

  const lastPostElementRef = useCallback(
    (node) => {
      if (state === "Loading" || isLoadingMore || !hasMore) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setIsLoadingMore(true);
            const nextPage = page + 1;
            setPage(nextPage);
            dispatch(getPosts(nextPage))
              .unwrap()
              .then((res) => {
                if (!res.data.posts || res.data.posts.length === 0) {
                  setHasMore(false);
                }
              })
              .finally(() => setIsLoadingMore(false));
          }
        },
        { threshold: 0.5, rootMargin: "100px" },
      );

      if (node) observerRef.current.observe(node);
    },
    [state, isLoadingMore, hasMore, page, dispatch],
  );

  const onUpload = (post) => {
    if (post.post_privacy === "PUB") {
      dispatch(setPosts([post, ...posts]));
    }
  };

  const openCommentsPlace = useCallback((post) => {
    setActivePost(post);
    setShowComments(true);
  }, []);

  const openEditModal = useCallback((post) => {
    setActivePost(post);
    setShowEditModal(true);
  }, []);

  const handleRefresh = () => {
    setPage(1);
    setHasMore(true);
    setPosts([]);
    setIsLoadingMore(true);
    dispatch(getPosts(1));
  };

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: theme.palette.background.default,
          width: "100%",
          pt: { xs: 1, sm: 2 },
          overflowX: "hidden",
        }}
      >
        {/* Mobile Header */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            bgcolor: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`,
            position: "sticky",
            top: 0,
            zIndex: 1100,
          }}
        >
          <IconButton onClick={() => setMobileSidebarOpen(true)}>
            <Menu />
          </IconButton>
          <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Home
          </Typography>
          <IconButton onClick={() => setMobileContactsOpen(true)}>
            <People />
          </IconButton>
        </Box>

        <Container
          maxWidth={false}
          sx={{
            width: "100%",
            maxWidth: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "1400px",
              xl: "1600px",
            },
            px: { xs: 1, sm: 2, md: 3, lg: 4 },
            mt: { xs: 0, md: 0 },
          }}
        >
          {/* Desktop Header Info Bar */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
              p: 2,
              bgcolor: theme.palette.background.paper,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: theme.shadows[1],
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Chip
                icon={<Group />}
                label={`${friends?.length || 0} Friends`}
                size="small"
                sx={{
                  bgcolor: theme.palette.primary.main + "15",
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                }}
              />
              <Chip
                icon={<TrendingUp />}
                label={`${posts.length} Posts`}
                size="small"
                sx={{
                  bgcolor: theme.palette.success.main + "15",
                  color: theme.palette.success.main,
                  fontWeight: 600,
                }}
              />
            </Box>
            <Typography
              sx={{
                fontWeight: 600,
                color: theme.palette.text.secondary,
                fontSize: "0.95rem",
              }}
            >
              Welcome back, {user.name} 👋
            </Typography>
          </Box>

          <Grid
            container
            spacing={{ xs: 0, sm: 3, md: 4 }}
            sx={{ alignItems: "flex-start" }}
          >
            {/* Desktop Sidebar */}
            <Grid
              item
              md={3}
              lg={2.5}
              xl={2}
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              <Box
                sx={{
                  position: "sticky",
                  top: 84,
                  maxHeight: "calc(100vh - 100px)",
                  overflowY: "auto",
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
                <Sidebar />
              </Box>
            </Grid>

            {/* Main Content - Full width on mobile */}
            <Grid
              item
              xs={12}
              md={6}
              lg={7}
              xl={8}
              sx={{
                px: { xs: 0, sm: 0 },
              }}
            >
              {/* Mobile stats bar */}
              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                  p: 1.5,
                  bgcolor: theme.palette.background.paper,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip
                    icon={<Group />}
                    label={`${friends?.length || 0}`}
                    size="small"
                    sx={{
                      bgcolor: theme.palette.primary.main + "15",
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    icon={<TrendingUp />}
                    label={`${posts.length}`}
                    size="small"
                    sx={{
                      bgcolor: theme.palette.success.main + "15",
                      color: theme.palette.success.main,
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.secondary,
                    fontSize: "0.85rem",
                  }}
                >
                  Hi, {user.name.split(" ")[0]}
                </Typography>
              </Box>

              <Box
                sx={{
                  position: "sticky",
                  top: { xs: 56, md: 84 },
                  zIndex: 10,
                  bgcolor: theme.palette.background.paper,
                  borderRadius: 2,
                  boxShadow: theme.shadows[2],
                  border: `1px solid ${theme.palette.divider}`,
                  overflow: "hidden",
                  mb: 3,
                }}
              >
                <CreatePost setOpen={setOpen} />
              </Box>

              {/* Error State */}
              {error && (
                <MuiAlert
                  severity="error"
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    alignItems: "center",
                  }}
                  action={
                    <Button
                      size="small"
                      onClick={handleRefresh}
                      startIcon={<Refresh />}
                      sx={{ fontWeight: 600 }}
                    >
                      Retry
                    </Button>
                  }
                >
                  Failed to load posts. Please try again.
                </MuiAlert>
              )}

              {/* Posts Section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <Posts
                  lastElementRef={lastPostElementRef}
                  openCommentsPlace={openCommentsPlace}
                  openEditModal={openEditModal}
                />
                {state !== "Loading" && posts.length == 0 ? (
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
                      <Refresh
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
                      Connect with friends or create your first post to see
                      content here
                    </Typography>
                    <Button
                      variant="contained"
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
                ) : null}

                {(state === "Loading" || isLoadingMore) && (
                  <Box sx={{ py: 4 }}>
                    <Loader />
                  </Box>
                )}

                {!hasMore && posts.length > 0 && (
                  <Box
                    sx={{
                      textAlign: "center",
                      py: 4,
                      px: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: "0.95rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                        "&::before, &::after": {
                          content: '""',
                          flex: 1,
                          height: "1px",
                          bgcolor: theme.palette.divider,
                        },
                      }}
                    >
                      You've reached the end
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>

            {/* Desktop Contacts - Hidden on mobile */}
            <Grid
              item
              md={3}
              lg={2.5}
              xl={2}
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              <Box
                sx={{
                  position: "sticky",
                  top: 84,
                  maxHeight: "calc(100vh - 100px)",
                  overflowY: "auto",
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
                }}
              >
                <Contacts contacts={friends} />
              </Box>
            </Grid>
          </Grid>

          {/* Mobile Drawers */}
          <Drawer
            anchor="left"
            open={mobileSidebarOpen}
            onClose={() => setMobileSidebarOpen(false)}
            PaperProps={{
              sx: {
                width: 280,
                maxWidth: "85vw",
                bgcolor: theme.palette.background.paper,
              },
            }}
          >
            <Box
              sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Menu
                </Typography>
                <IconButton onClick={() => setMobileSidebarOpen(false)}>
                  <Close />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ p: 2 }}>
              <Sidebar />
            </Box>
          </Drawer>

          <Drawer
            anchor="right"
            open={mobileContactsOpen}
            onClose={() => setMobileContactsOpen(false)}
            PaperProps={{
              sx: {
                width: 300,
                maxWidth: "90vw",
                bgcolor: theme.palette.background.paper,
              },
            }}
          >
            <Box
              sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Friends ({friends?.length || 0})
                </Typography>
                <IconButton onClick={() => setMobileContactsOpen(false)}>
                  <Close />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ p: 2 }}>
              <Contacts contacts={friends} />
            </Box>
          </Drawer>

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
            <Zoom in={!open}>
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
            </Zoom>
          </Box>

          {/* Modals */}
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
              dispatch(
                setPosts(
                  posts
                    .map((p) => (p.id === updatedPost.id ? updatedPost : p))
                    .filter(
                      (p) =>
                        p.post_privacy === "PUB" || p.post_privacy === "FRI",
                    ),
                ),
              )
            }
          />
        </Container>
      </Box>
    </PostContext.Provider>
  );
};

export default Home;
