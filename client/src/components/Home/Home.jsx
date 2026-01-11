import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import CreatePost from "../Posts/CreatePost";
import Posts from "../Posts/Posts";
import Contacts from "../Contacts/Contacts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef, useCallback } from "react";
import { getPosts } from "../../App/Redux/Features/Posts/Services";
import Loader from "../Loader/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const observerRef = useRef();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [combinedPosts, setCombinedPosts] = useState([]);

  const user = useSelector((s) => s.auth.user);
  const friends = user.friends;
  const { posts, state } = useSelector((s) => s.posts);

  useEffect(() => {
    if (!posts || posts.length === 0) {
      dispatch(getPosts(1));
    } else if (combinedPosts.length === 0) {
      setCombinedPosts(posts);
    }
  }, [dispatch, posts]);

  useEffect(() => {
    if (posts && posts.length > 0) {
      if (isLoadingMore) {
        setCombinedPosts((prev) => {
          const newPosts = posts.filter(
            (newPost) =>
              !prev.some((existingPost) => existingPost.id === newPost.id)
          );
          return [...prev, ...newPosts];
        });
        setIsLoadingMore(false);

        if (posts.length === 0) {
          setHasMore(false);
        }
      } else if (combinedPosts.length === 0 && posts.length > 0) {
        setCombinedPosts(posts);
      }
    }
  }, [posts, isLoadingMore]);

  const lastPostElementRef = useCallback(
    (node) => {
      if (state === "Loading" || isLoadingMore || !hasMore) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setIsLoadingMore(true);
            const nextPage = page + 1;
            setPage(nextPage);
            dispatch(getPosts(nextPage));
          }
        },
        {
          threshold: 0.5,
          rootMargin: "100px",
        }
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [state, isLoadingMore, hasMore, page, dispatch]
  );

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
          <Grid
            item
            xs={0}
            lg={3}
            sx={{ display: { xs: "none", lg: "block" } }}
          >
            <Sidebar />
          </Grid>

          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              width: { sm: "100%", lg: "80%" },
            }}
          >
            <Box sx={{ mb: 2 }}>
              <CreatePost />
            </Box>

            <Box>
              {combinedPosts.length > 0 ? (
                combinedPosts.map((post, index) => {
                  if (combinedPosts.length === index + 1) {
                    return (
                      <div ref={lastPostElementRef} key={post.id || index}>
                        <Posts posts={[post]} />
                      </div>
                    );
                  }
                  return <Posts posts={[post]} key={post.id || index} />;
                })
              ) : state !== "Loading" ? (
                <Typography
                  sx={{
                    margin: "80px auto",
                    width: "fit-content",
                    color: "gray",
                    textAlign: "center",
                  }}
                  variant="h4"
                >
                  No posts available
                </Typography>
              ) : null}

              {(state === "Loading" || isLoadingMore) && <Loader />}

              {!hasMore && combinedPosts.length > 0 && (
                <Typography
                  sx={{
                    margin: "40px auto",
                    width: "fit-content",
                    color: "gray",
                    textAlign: "center",
                  }}
                  variant="body1"
                >
                  No more posts to show
                </Typography>
              )}
            </Box>
          </Grid>

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
