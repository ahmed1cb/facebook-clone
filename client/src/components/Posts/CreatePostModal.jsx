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
} from "@mui/material";
import {
  Close,
  PhotoCamera,
  PublicOutlined,
  GroupOutlined,
  LockOutlined,
  CheckCircle,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../App/services/api";
import Alert from "../../App/Alert/Swal";
import { upload } from "../../App/services/postservices";

export default ({ open, onClose , onUpload }) => {
  const theme = useTheme();

  let defaultData = {
    post_type: "TXT",
    post_privacy: "PUB",
    post_content: "",
    subtext: "",
  };
  const [post, setPost] = useState(defaultData);
  let [mediaPath, setMediaPath] = useState(null);
  const [privacyAnchorEl, setPrivacyAnchorEl] = useState(null);
  const [selectedPrivacy, setSelectedPrivacy] = useState("public");
  const [loading, setLoading] = useState(false);
  const handlePrivacyClick = (event) => {
    setPrivacyAnchorEl(event.currentTarget);
  };

  const handlePrivacyClose = () => {
    setPrivacyAnchorEl(null);
  };

  const handlePrivacySelect = (privacy) => {
    setSelectedPrivacy(privacy);

    let privacies = {
      public: "PUB",
      private: "PRIV",
      friends: "FRI",
    };

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
    },
    mediaPreview: {
      width: "100%",
      maxHeight: "300px",
      objectFit: "cover",
      backgroundColor: theme.palette.grey[100],
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
    },
  };

  const user = useSelector((s) => s.auth.user);

  let profileImage = user.photo ? (
    <Avatar src={`${api.getUri()}/../storage/${user.photo}`}></Avatar>
  ) : (
    <Avatar>{user.name[0]}</Avatar>
  );

  const imgInputRef = useRef(null);
  const videoInputRed = useRef(null);

  const handleImageChanged = (e) => {

    let file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      Alert.error("Invalid Image File", "The Chosen File is Not an Image File");
      return;
    }
    setPost({ ...post, post_type: "IMG", post_content: file });

    const reader = new FileReader();

    reader.onload = (r) => {
      setMediaPath(r.target.result);
    };

    reader.readAsDataURL(file);
  };

  const uploadPost = async () => {
    if (loading) {
      return;
    }
    setLoading(() => true);
    let form = new FormData();

    form.append("post_privacy", post.post_privacy);
    form.append("post_content", post.post_content);
    form.append("post_type", post.post_type);
    if (post.subtext) {
      form.append("subtext", post.subtext);
    }

    if (post.post_type == "TXT" && post.post_content?.trim().length < 1) {
      Alert.error("Invalid Details", "Post Content Cannot Be Empty");
      return;
    }

    let uploaded = await upload(form);
    uploaded = uploaded?.data?.data?.post;
    onUpload(uploaded);
    onClose();
    setLoading(() => false);
  };

  return (
    <Modal open={open} onClose={onClose} sx={styles.modal}>
      <Paper sx={styles.modalContainer}>
        <Box sx={styles.modalHeader}>
          <Typography sx={styles.modalTitle}>Create New Post</Typography>
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
              borderRadius: theme.shape.borderRadius / 2,
              boxShadow: theme.shadows[8],
              marginTop: theme.spacing(1),
            },
          }}
          MenuListProps={{
            sx: { padding: 0 },
          }}
        >
          <Box sx={{ padding: theme.spacing(2) }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "1rem",
                color: theme.palette.text.primary,
                marginBottom: theme.spacing(0.5),
              }}
            >
              Who can see your video?
            </Typography>
            <Typography
              sx={{
                fontSize: "0.875rem",
                color: theme.palette.text.secondary,
                lineHeight: 1.4,
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
            <ListItemText primary="Only me" secondary="Only you can see this" />
            {selectedPrivacy === "private" && (
              <CheckCircle sx={styles.selectedPrivacyIcon} />
            )}
          </MenuItem>
        </Menu>

        <Box sx={styles.textAreaContainer}>
          <textarea
            placeholder="What's on your mind"
            style={styles.textArea}
            onChange={(e) =>
              setPost({
                ...post,
                post_content:
                  post.post_type === "TXT"
                    ? e.target.value.trim()
                    : post.post_content,
                subtext: e.target.value.trim(),
              })
            }
          />
        </Box>
        {post.post_type === "IMG" && (
          <Box sx={styles.mediaPreviewContainer}>
            <Box
              component="img"
              src={mediaPath}
              alt="Preview"
              sx={styles.mediaPreview}
            />
            <IconButton size="small" sx={styles.removeButton}>
              <Close
                fontSize="small"
                onClick={() => {
                  setPost({ ...post, post_content: "", post_type: "TXT" });
                  setMediaPath(null);
                }}
              />
            </IconButton>
          </Box>
        )}

        <Box sx={styles.actionButtons}>
          <Typography sx={styles.actionTitle}>Add to your post</Typography>
          <Box sx={styles.actionIcons}>
            <IconButton
              sx={styles.actionIconButton}
              onClick={() => imgInputRef.current.click()}
            >
              <PhotoCamera sx={{ color: styles.iconColor.photo }} />
            </IconButton>
          </Box>
        </Box>

        <input
          type="file"
          hidden
          accept="image/*"
          ref={imgInputRef}
          onChange={handleImageChanged}
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
            onClick={uploadPost}
            disabled={loading}
          >
            Post
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};
