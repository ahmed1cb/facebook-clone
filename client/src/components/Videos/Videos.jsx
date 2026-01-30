import { Box, Container, useTheme } from "@mui/material";
import VideosList from "./VideosList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback, useRef } from "react";
import { getVideos } from "../../App/Redux/Features/Posts/Services";
import CommentsModal from "../Comments/Modal";
import Loader from "../Loader/Loader";
import { setVideos } from "../../App/Redux/Features/Posts/PostsSlice";

const Videos = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const videos = useSelector((s) => s.posts.videos) || [];

  const [openComments, setOpenComments] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const { state, hasMore } = useSelector((s) => s.posts);
  const [page, setPage] = useState(1);

  const isFetchingRef = useRef(false);
  useEffect(() => {
    if (videos.length === 0 && hasMore && state != "Loading") {
      dispatch(getVideos(1));
    }
  }, [dispatch, videos]);

  const loadMoreVideos = useCallback(
    async (currentIndex) => {
      if (!hasMore || isFetchingRef.current) return;
      if (currentIndex < videos.length - 1) return;
      if (state === "Loading") return;
      isFetchingRef.current = true;
      const nextPage = page + 1;

      dispatch(getVideos(nextPage));

      setPage(nextPage);

      isFetchingRef.current = false;
    },
    [dispatch, page, hasMore, videos],
  );

  const handleComment = useCallback(
    (comment) => {
      if (!activePost) return;

      let newVideos = videos.map((v) =>
        v.id === activePost.id
          ? { ...v, comment: [...v.comments, comment] }
          : v,
      );

      dispatch(setVideos(newVideos));
    },
    [activePost],
  );

  const handleDelete = useCallback(
    (id) => {
      if (!activePost) return;
      dispatch(
        setVideos((prev) =>
          prev.map((v) =>
            v.id === activePost.id
              ? { ...v, comments: v.comments.filter((c) => c.id !== id) }
              : v,
          ),
        ),
      );
    },
    [activePost],
  );

  return (
    (videos?.length === 0 && state === "Loading" && <Loader />) || (
      <Box
        sx={{
          height: "calc(100vh - 64px) !important",
          bgcolor: theme.palette.background.default,
          pt: 2,
        }}
      >
        <Container maxWidth="lg" sx={{ height: "100%" }}>
          <VideosList
            videos={videos}
            setOpen={setOpenComments}
            setActivePost={setActivePost}
            onEndReached={loadMoreVideos}
          />
        </Container>

        {activePost && (
          <CommentsModal
            open={openComments}
            onClose={() => setOpenComments(false)}
            post={activePost}
            onComment={handleComment}
            onDelete={handleDelete}
          />
        )}
      </Box>
    )
  );
};

export default Videos;
