import {
  Box,
  Typography,
  IconButton,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Search as SearchIcon,
  MoreHoriz as MoreHorizIcon,
} from "@mui/icons-material";
import api from "../../App/services/api";

export default ({ contacts }) => {
  return (
    <Box sx={{ position: "sticky", top: 72 }}>
      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          mb: 1,
        }}
      >
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ fontWeight: 600 }}
        >
          Contacts
        </Typography>
        <Box>
          <IconButton size="small">
            <SearchIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <List>
        {contacts.map((contact, index) => {
          contact = contact.friend;
          const contactAvatar = contact.photo ? (
            <Avatar sx={{ width: 36, height: 36 }}>
              {`${api.getUri()}/../sorage/app/public/${contact.photo}`}
            </Avatar>
          ) : (
            <Avatar sx={{ width: 36, height: 36 }}>
              {contact.name.slice(0, 2).toUpperCase()}
            </Avatar>
          );
          return (
            <ListItemButton key={index} sx={{ borderRadius: 2, mb: 0.5 }}>
              <ListItemAvatar>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  {contactAvatar}
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={contact.name}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItemButton>
          );
        })}

        {contacts.length === 0 && (
          <Typography
            variant="h5"
            color="gray"
            sx={{ textAlign: "center", margin: "auto" }}
          >
            No Contacts Yet
          </Typography>
        )}
      </List>
    </Box>
  );
};
