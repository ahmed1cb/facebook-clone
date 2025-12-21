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

export default  () => {
  const theme = useTheme();

  const contacts = [
    { name: "John Doe", avatar: "JD", online: true },
    { name: "Sarah Smith", avatar: "SS", online: true },
    { name: "Mike Johnson", avatar: "MJ", online: false },
    { name: "Emma Wilson", avatar: "EW", online: true },
    { name: "David Brown", avatar: "DB", online: false },
    { name: "Lisa Anderson", avatar: "LA", online: true },
    { name: "Tom Harris", avatar: "TH", online: false },
    { name: "Amy Martinez", avatar: "AM", online: true },
  ];

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
        {contacts.map((contact, index) => (
          <ListItemButton key={index} sx={{ borderRadius: 2, mb: 0.5 }}>
            <ListItemAvatar>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                sx={{
                  "& .MuiBadge-badge": {
                    bgcolor: contact.online ? "#31A24C" : "transparent",
                    border: `2px solid ${theme.palette.background.paper}`,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                  },
                }}
              >
                <Avatar sx={{ width: 36, height: 36 }}>{contact.avatar}</Avatar>
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={contact.name}
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
