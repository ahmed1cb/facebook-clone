import { Box, Container, useTheme } from "@mui/material";
import VideosList from "./VideosList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getVideos } from "../../App/Redux/Features/Posts/Services";
import CommentsModal from "../Comments/Modal";
import { setVideos } from "../../App/Redux/Features/Posts/PostsSlice";

const Videos = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const videos = useSelector((s) => s.posts.videos);
  useEffect(() => {
    if (!videos) {
      dispatch(getVideos(1));
    }
  }, [videos]);

  const [openComments, setOpenComments] = useState(false);
  const [activePost, setActivePost] = useState(null);

  return (
    videos && (
      <Box
        sx={{
          minHeight: "95vh",
          bgcolor: theme.palette.background.default,
          pt: 2,
        }}
      >
        <Container maxWidth="lg">
          <VideosList
            videos={videos}
            setOpen={setOpenComments}
            setActivePost={setActivePost}
          />
        </Container>

        {activePost && (
          <CommentsModal
            open={openComments}
            onClose={() => setOpenComments(false)}
            post={activePost}
            onComment={(comment) =>
              setVideos((videos) =>
                videos.map((v) =>
                  v.id === activePost.id
                    ? {
                        ...v,
                        comments: [...v.comments, comment],
                      }
                    : v,
                ),
              )
            }
            onDelete={(id) => {
              setVideos((videos) =>
                videos.map((v) =>
                  v.id === activePost.id
                    ? {
                        ...v,
                        comments: v.comments.filter((c) => c.id !== id),
                      }
                    : v,
                ),
              );
            }}
          />
        )}
      </Box>
    )
  );
};

export default Videos;
