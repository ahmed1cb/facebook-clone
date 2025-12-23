import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  useTheme,
} from "@mui/material";
import {
  Home as HomeIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Favorite as FavoriteIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";

export default({ user, isOwnProfile = true }) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Intro
      </Typography>

      {user.bio && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, textAlign: "center" }}
        >
          {user.bio}
        </Typography>
      )}

      {isOwnProfile && !user.bio && (
        <Button
          fullWidth
          variant="contained"
          sx={{
            mb: 2,
            bgcolor: theme.palette.grey[200],
            color: theme.palette.text.primary,
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              bgcolor: theme.palette.grey[300],
            },
          }}
        >
          Add bio
        </Button>
      )}

      <List>
        {user.work && (
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText
              primary={`Works at ${user.work}`}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
        )}

        {user.education && (
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText
              primary={`Studied at ${user.education}`}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
        )}

        {user.location && (
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              primary={`Lives in ${user.location}`}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
        )}

        {user.hometown && (
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LocationIcon />
            </ListItemIcon>
            <ListItemText
              primary={`From ${user.hometown}`}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
        )}

        {user.relationship && (
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText
              primary={user.relationship}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
        )}

        {user.joinedDate && (
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <ScheduleIcon />
            </ListItemIcon>
            <ListItemText
              primary={`Joined ${user.joinedDate}`}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
        )}
      </List>

      {isOwnProfile && (
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 1,
            color: theme.palette.text.primary,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Edit details
        </Button>
      )}
    </Paper>
  );
};
