import {
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
  Work as WorkIcon,
  School as SchoolIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

export default ({ isOwnProfile = true, setShowModal }) => {
  const theme = useTheme();
  const user = useSelector((s) => s.auth.user);

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

      {
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, textAlign: "center" }}
        >
          {user.bio || "No Bio"}
        </Typography>
      }

      <List>
        {
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText
              primary={`Location: ${user.location || "Not Shared"}`}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
        }

        {
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText
              primary={`State ${user.state || "Not Shared"}`}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
        }

        {
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <ScheduleIcon />
            </ListItemIcon>
            <ListItemText
              primary={`Joined At: ${
                user.joined_at ||
                user.created_at.slice(0, user.created_at.indexOf("T"))
              }`}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
        }
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
          onClick={() => setShowModal((e) => !e)}
        >
          Edit details
        </Button>
      )}
    </Paper>
  );
};
