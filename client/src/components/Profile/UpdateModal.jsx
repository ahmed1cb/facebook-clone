import { useRef, useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Avatar,
  Grid,
  Stack,
  Divider,
  Paper,
  Fade,
} from "@mui/material";
import { Close as CloseIcon, Person as PersonIcon } from "@mui/icons-material";
import { update } from "../../App/services/profileServices";
import api from "../../App/services/api";

const UpdateModal = ({ open, onClose, userData }) => {
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const profileFields = [
    { name: "name", label: "Full Name", gridSize: { xs: 12, sm: 6 } },
    { name: "location", label: "Location", gridSize: { xs: 12, sm: 6 } },
    { name: "state", label: "State", gridSize: { xs: 12 } },
    {
      name: "bio",
      label: "Bio",
      gridSize: { xs: 12 },
      multiline: true,
      rows: 3,
    },
  ];

  const emptyData = {
    name: "",
    location: "",
    state: "",
    bio: "",
    photo: null,
    cover: null,
  };

  const [data, setData] = useState(emptyData);
  const [displayedImage, setDisplayedImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setData({
        name: userData.name ?? "",
        location: userData.location ?? "",
        state: userData.state ?? "",
        bio: userData.bio ?? "",
        photo: null,
        cover: null,
      });

      setDisplayedImage(
        userData.photo ? `${api.getUri()}/../storage/${userData.photo}` : null
      );

      setCoverPreview(
        userData.cover ? `${api.getUri()}/../storage/${userData.cover}` : null
      );
    }
  }, [userData, open]);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfileImageChanged = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    setData((prev) => ({ ...prev, photo: file }));

    const reader = new FileReader();
    reader.onload = (ev) => setDisplayedImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleCoverChanged = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    setData((prev) => ({ ...prev, cover: file }));

    const reader = new FileReader();
    reader.onload = (ev) => setCoverPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleProfileUpdate = async () => {
    if (!data.name.trim()) {
      alert("Name must be at least 3 letters");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name.trim());
    formData.append("location", data.location.trim());
    formData.append("state", data.state.trim());
    formData.append("bio", data.bio.trim());

    if (data.photo) formData.append("photo", data.photo);
    if (data.cover) formData.append("cover", data.cover);

    setIsLoading(true);
    await update(formData);
    setIsLoading(false);

    location.reload();
    onClose();
  };

  return (
    <Modal open={open} closeAfterTransition>
      <Fade in={open}>
        <Paper
          sx={{
            width: "100%",
            maxWidth: 700,
            maxHeight: "90vh",
            overflow: "auto",
            borderRadius: 3,
            mx: "auto",
          }}
        >
          {/* Header */}
          <Box sx={{ p: 3, bgcolor: "primary.main", color: "#fff" }}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5" fontWeight="700">
                Update Profile
              </Typography>
              <IconButton onClick={onClose} sx={{ color: "#fff" }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ p: 3 }}>
            <Box
              sx={{
                height: 160,
                mb: 3,
                borderRadius: 2,
                backgroundImage: coverPreview ? `url(${coverPreview})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => coverInputRef.current?.click()}
            >
              <Typography
                sx={{
                  position: "absolute",
                  bottom: 8,
                  right: 12,
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: 12,
                }}
              >
                Change cover
              </Typography>

              <input
                type="file"
                accept="image/*"
                ref={coverInputRef}
                onChange={handleCoverChanged}
                hidden
              />
            </Box>

            {/* Avatar (unchanged) */}
            <Box textAlign="center" mb={4}>
              <Avatar
                src={displayedImage}
                sx={{ width: 140, height: 140, mx: "auto", cursor: "pointer" }}
                onClick={handleFileClick}
              >
                {!displayedImage && <PersonIcon sx={{ fontSize: 60 }} />}
              </Avatar>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleProfileImageChanged}
                hidden
              />
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Fields */}
            <Grid container spacing={2.5}>
              {profileFields.map((field) => (
                <TextField
                  key={field.name}
                  fullWidth
                  label={field.label}
                  multiline={field.multiline}
                  rows={field.rows}
                  value={data[field.name]}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      [field.name]: e.target.value,
                    }))
                  }
                />
              ))}
            </Grid>

            {/* Buttons */}
            <Stack direction="row" justifyContent="flex-end" mt={4} spacing={2}>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleProfileUpdate}
                disabled={isLoading}
              >
                Save Changes
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default UpdateModal;
