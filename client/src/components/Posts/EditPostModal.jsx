import {
  Modal,
  Box,
  Button,
  IconButton,
  Avatar,
  Typography,
  Divider,
  Paper,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
  CircularProgress,
} from "@mui/material";
import {
  Close,
  PhotoCamera,
  PublicOutlined,
  GroupOutlined,
  LockOutlined,
  CheckCircle,
  Videocam,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../App/services/api";
import Alert from "../../App/Alert/Swal";
import { updatePost } from "../../App/services/postservices";

export default function EditPostModal({
  open,
  onClose,
  post: initialPost,
  onUpdate,
}) {
  const theme = useTheme();
  const user = useSelector((s) => s.auth.user);

  const defaultData = {
    post_type: "TXT",
    post_privacy: "PUB",
    post_content: "",
    subtext: "",
  };


  const [post, setPost] = useState(defaultData);
  const [mediaPath, setMediaPath] = useState(null);
  const [privacyAnchorEl, setPrivacyAnchorEl] = useState(null);
  const [selectedPrivacy, setSelectedPrivacy] = useState("public");
  const [loading, setLoading] = useState(false);
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);

  const imgInputRef = useRef(null);
  const videoInputRef = useRef(null);

  useEffect(() => {
    if (!initialPost) return;

    const privacyMap = {
      PUB: "public",
      FRI: "friends",
      PRIV: "private",
    };

    setPost({
      post_type: initialPost.post_type,
      post_privacy: initialPost.post_privacy,
      post_content: initialPost.post_content || "",
      subtext: initialPost.subtext || "",
    });

    setSelectedPrivacy(privacyMap[initialPost.post_privacy] || "public");

    if (initialPost.post_type === "IMG" || initialPost.post_type === "VID") {
      setMediaPath(`${api.getUri()}/../storage/${initialPost.post_content}`);
      setHasVideo(initialPost.post_type === "VID");
    } else {
      setMediaPath(null);
      setHasVideo(false);
    }
  }, [initialPost]);

  const handlePrivacyClick = (event) => setPrivacyAnchorEl(event.currentTarget);
  const handlePrivacyClose = () => setPrivacyAnchorEl(null);

  const handlePrivacySelect = (privacy) => {
    const privacies = {
      public: "PUB",
      private: "PRIV",
      friends: "FRI",
    };
    setSelectedPrivacy(privacy);
    setPost({ ...post, post_privacy: privacies[privacy] });
    handlePrivacyClose();
  };

  const getPrivacyIcon = () => {
    switch (selectedPrivacy) {
      case "public":
        return <PublicOutlined sx={{ fontSize: 16 }} />;
      case "friends":
        return <GroupOutlined sx={{ fontSize: 16 }} />;
      case "private":
        return <LockOutlined sx={{ fontSize: 16 }} />;
      default:
        return <PublicOutlined sx={{ fontSize: 16 }} />;
    }
  };

  const getPrivacyText = () => {
    switch (selectedPrivacy) {
      case "public":
        return "Public";
      case "friends":
        return "Friends";
      case "private":
        return "Only me";
      default:
        return "Public";
    }
  };

  const getPrivacyDescription = () => {
    switch (selectedPrivacy) {
      case "public":
        return "Anyone on or off the platform";
      case "friends":
        return "Your friends only";
      case "private":
        return "Only you can see this";
      default:
        return "Anyone on or off the platform";
    }
  };

  const styles = {
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(5px)",
    },
    modalContainer: {
      minWidth: "80vw",
      maxWidth: "90vw",
      maxHeight: "90vh",
      overflow: "hidden",
      outline: "none",
      boxShadow: theme.shadows[24],
      [theme.breakpoints.down("sm")]: {
        width: "95vw",
      },
    },
    modalHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: theme.spacing(2),
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,
    },
    modalTitle: {
      fontWeight: 600,
      fontSize: "1.25rem",
      color: theme.palette.text.primary,
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(2),
      gap: theme.spacing(1.5),
      backgroundColor: theme.palette.background.paper,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontWeight: 600,
      fontSize: "0.9375rem",
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(0.5),
    },
    audienceButton: {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(0.5),
      padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.grey[300]}`,
      cursor: "pointer",
      width: "fit-content",
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
    audienceText: {
      fontSize: "0.8125rem",
      fontWeight: 500,
      color: theme.palette.text.secondary,
    },
    textAreaContainer: {
      padding: theme.spacing(0, 2, 2),
      backgroundColor: theme.palette.background.paper,
    },
    textArea: {
      width: "100%",
      border: "none",
      outline: "none",
      resize: "none",
      fontSize: "1.5rem",
      fontFamily: "inherit",
      minHeight: "120px",
      color: theme.palette.text.primary,
      backgroundColor: "transparent",
      "&::placeholder": {
        color: theme.palette.text.disabled,
      },
    },
    mediaPreviewContainer: {
      margin: theme.spacing(0, 2, 2),
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      overflow: "hidden",
    },
    mediaPreview: {
      width: "100%",
      maxHeight: "300px",
      objectFit: "cover",
      backgroundColor: theme.palette.grey[100],
    },
    videoPreview: {
      width: "100%",
      maxHeight: "300px",
      backgroundColor: "#000",
    },
    removeButton: {
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(1),
      backgroundColor: alpha(theme.palette.common.black, 0.7),
      color: "white",
      "&:hover": {
        backgroundColor: theme.palette.common.black,
      },
    },
    actionButtons: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: theme.spacing(2),
      borderTop: `1px solid ${theme.palette.divider}`,
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,
    },
    actionTitle: {
      fontWeight: 500,
      fontSize: "0.9375rem",
      color: theme.palette.text.primary,
    },
    actionIcons: {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(0.5),
    },
    actionIconButton: {
      padding: theme.spacing(1),
      color: theme.palette.text.secondary,
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
    modalFooter: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
    },
    privacyInfo: {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(1),
    },
    privacyText: {
      fontSize: "0.875rem",
      color: theme.palette.text.secondary,
    },
    postButton: {
      fontWeight: 600,
      textTransform: "none",
      padding: `${theme.spacing(0.75)} ${theme.spacing(3)}`,
      fontSize: "0.9375rem",
      minWidth: "100px",
    },
    privacyMenuItem: {
      minWidth: "200px",
      padding: theme.spacing(1.5, 2),
    },
    privacyMenuIcon: {
      minWidth: "40px",
      color: theme.palette.text.secondary,
    },
    selectedPrivacyIcon: {
      color: theme.palette.primary.main,
    },
    iconColor: {
      photo: theme.palette.success.main,
      video: theme.palette.error.main,
    },
    uploadOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: alpha(theme.palette.common.black, 0.5),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    },
  };

  const profileImage = user.photo ? (
    <Avatar src={`${api.getUri()}/../storage/${user.photo}`} />
  ) : (
    <Avatar>{user.name[0]}</Avatar>
  );

  const handleImageChanged = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Alert.error("Invalid Image File", "The chosen file is not an image");
      return;
    }

    setHasVideo(false);
    setPost({
      ...post,
      post_type: "IMG",
      post_content: file,
      subtext: post.subtext || "",
    });

    const reader = new FileReader();
    reader.onload = (r) => setMediaPath(r.target.result);
    reader.readAsDataURL(file);
  };

  const handleVideoChanged = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      Alert.error("Invalid Video File", "The chosen file is not a video");
      return;
    }

    const maxSize = 40 * 1024 * 1024;
    if (file.size > maxSize) {
      Alert.error("File Too Large", "Video must be less than 40MB");
      return;
    }

    setHasVideo(true);
    setPost({
      ...post,
      post_type: "VID",
      post_content: file,
      subtext: post.subtext || "",
    });

    const reader = new FileReader();
    reader.onload = (r) => setMediaPath(r.target.result);
    reader.readAsDataURL(file);
  };

  const clearMedia = () => {
    setPost({
      ...post,
      post_type: "TXT",
      post_content: post.subtext || "",
    });
    setMediaPath(null);
    setHasVideo(false);
    if (imgInputRef.current) imgInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const submitUpdate = async () => {
    if (loading) return;

    if (
      post.post_type === "TXT" &&
      (!post.post_content || post.post_content.trim().length < 1)
    ) {
      Alert.error("Invalid Details", "Post content cannot be empty");
      return;
    }

    setLoading(true);
    setIsVideoUploading(post.post_type === "VID");

    try {
      const form = new FormData();
      form.append("post_id", initialPost.id);
      form.append("post_privacy", post.post_privacy);
      form.append("post_type", post.post_type);

      if (post.post_type === "TXT") {
        form.append("post_content", post.post_content);
      } else if (post.post_content instanceof File) {
        form.append("post_content", post.post_content);
      }

      if (post.subtext && post.subtext.trim().length > 0) {
        form.append("subtext", post.subtext);
      }

      const updated = await updatePost(initialPost.id, form);
      if (updated?.data?.data?.post) {
        onUpdate(updated.data.data.post);
        onClose();
      } else {
        Alert.error("Update Failed", "Failed to update post");
      }
    } catch (err) {
      console.error("Update error:", err);
      Alert.error("Update Failed", err.message || "Something went wrong");
    } finally {
      setLoading(false);
      setIsVideoUploading(false);
    }
  };

  return (
    initialPost && (
      <Modal open={open} onClose={onClose} sx={styles.modal}>
        <Paper sx={styles.modalContainer}>
          <Box sx={styles.modalHeader}>
            <Typography sx={styles.modalTitle}>Edit Post</Typography>
            <IconButton onClick={onClose} size="small">
              <Close />
            </IconButton>
          </Box>

          <Box sx={styles.userSection}>
            {profileImage}
            <Box sx={styles.userInfo}>
              <Typography sx={styles.userName}>{user.name}</Typography>
              <Box sx={styles.audienceButton} onClick={handlePrivacyClick}>
                {getPrivacyIcon()}
                <Typography sx={styles.audienceText}>
                  {getPrivacyText()}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Menu
            anchorEl={privacyAnchorEl}
            open={Boolean(privacyAnchorEl)}
            onClose={handlePrivacyClose}
            PaperProps={{
              sx: {
                width: 320,
                boxShadow: theme.shadows[8],
                marginTop: theme.spacing(1),
              },
            }}
            MenuListProps={{ sx: { padding: 0 } }}
          >
            <Box sx={{ padding: theme.spacing(2) }}>
              <Typography sx={{ fontWeight: 600, fontSize: "1rem", mb: 0.5 }}>
                Who can see your {hasVideo ? "video" : "post"}?
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  color: theme.palette.text.secondary,
                }}
              >
                {getPrivacyDescription()}
              </Typography>
            </Box>
            <Divider />
            <MenuItem
              onClick={() => handlePrivacySelect("public")}
              sx={styles.privacyMenuItem}
            >
              <ListItemIcon sx={styles.privacyMenuIcon}>
                <PublicOutlined />
              </ListItemIcon>
              <ListItemText
                primary="Public"
                secondary="Anyone on or off the platform"
              />
              {selectedPrivacy === "public" && (
                <CheckCircle sx={styles.selectedPrivacyIcon} />
              )}
            </MenuItem>
            <MenuItem
              onClick={() => handlePrivacySelect("friends")}
              sx={styles.privacyMenuItem}
            >
              <ListItemIcon sx={styles.privacyMenuIcon}>
                <GroupOutlined />
              </ListItemIcon>
              <ListItemText primary="Friends" secondary="Your friends only" />
              {selectedPrivacy === "friends" && (
                <CheckCircle sx={styles.selectedPrivacyIcon} />
              )}
            </MenuItem>
            <MenuItem
              onClick={() => handlePrivacySelect("private")}
              sx={styles.privacyMenuItem}
            >
              <ListItemIcon sx={styles.privacyMenuIcon}>
                <LockOutlined />
              </ListItemIcon>
              <ListItemText
                primary="Only me"
                secondary="Only you can see this"
              />
              {selectedPrivacy === "private" && (
                <CheckCircle sx={styles.selectedPrivacyIcon} />
              )}
            </MenuItem>
          </Menu>

          <Box sx={styles.textAreaContainer}>
            <textarea
              placeholder={
                hasVideo ? "Edit your caption..." : "Edit your post..."
              }
              style={styles.textArea}
              value={post.subtext || ""}
              onChange={(e) =>
                setPost({
                  ...post,
                  subtext: e.target.value,
                  post_content:
                    post.post_type === "TXT"
                      ? e.target.value.trim()
                      : post.post_content,
                })
              }
            />
          </Box>

          {(post.post_type === "IMG" || post.post_type === "VID") &&
            mediaPath && (
              <Box sx={styles.mediaPreviewContainer}>
                {isVideoUploading && (
                  <Box sx={styles.uploadOverlay}>
                    <CircularProgress color="primary" />
                    <Typography sx={{ color: "white", ml: 2 }}>
                      Updating video...
                    </Typography>
                  </Box>
                )}

                {post.post_type === "IMG" ? (
                  <Box
                    component="img"
                    src={mediaPath}
                    alt="Preview"
                    sx={styles.mediaPreview}
                  />
                ) : (
                  <Box
                    component="video"
                    src={mediaPath}
                    controls
                    sx={styles.videoPreview}
                  />
                )}

                <IconButton
                  size="small"
                  sx={styles.removeButton}
                  onClick={clearMedia}
                  disabled={isVideoUploading}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            )}

          <Box sx={styles.actionButtons}>
            <Typography sx={styles.actionTitle}>Update media</Typography>
            <Box sx={styles.actionIcons}>
              {initialPost.post_type === "IMG" && (
                <IconButton
                  sx={styles.actionIconButton}
                  onClick={() => imgInputRef.current.click()}
                  disabled={hasVideo || isVideoUploading}
                  title="Change photo"
                >
                  <PhotoCamera sx={{ color: styles.iconColor.photo }} />
                </IconButton>
              )}

              {initialPost.post_type === "VID" && (
                <IconButton
                  sx={styles.actionIconButton}
                  onClick={() => videoInputRef.current.click()}
                  disabled={post.post_type === "IMG" || isVideoUploading}
                  title="Change video"
                >
                  <Videocam sx={{ color: styles.iconColor.video }} />
                </IconButton>
              )}
            </Box>
          </Box>

          <input
            type="file"
            hidden
            accept="image/*"
            ref={imgInputRef}
            onChange={handleImageChanged}
          />
          <input
            type="file"
            hidden
            accept="video/*"
            ref={videoInputRef}
            onChange={handleVideoChanged}
          />

          <Box sx={styles.modalFooter}>
            <Box sx={styles.privacyInfo}>
              {getPrivacyIcon()}
              <Typography sx={styles.privacyText}>
                {getPrivacyText()} • {getPrivacyDescription()}
              </Typography>
            </Box>
            <Button
              variant="contained"
              disableElevation
              sx={styles.postButton}
              onClick={submitUpdate}
              disabled={loading || isVideoUploading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Save"
              )}
            </Button>
          </Box>
        </Paper>
      </Modal>
    )
  );
}
