import {
  Box,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";

export default  () => {
  const shortcuts = [
    { name: "Friends", icon: "👥" },
    { name: "Groups", icon: "👨‍👩‍👧‍👦" },
    { name: "Marketplace", icon: "🛒" },
    { name: "Watch", icon: "📺" },
    { name: "Memories", icon: "⏰" },
    { name: "Saved", icon: "🔖" },
    { name: "Pages", icon: "📄" },
    { name: "Events", icon: "📅" },
    { name: "Gaming", icon: "🎮" },
  ];

  return (
    <Box sx={{ position: "sticky", top: 72 }}>
      <List>
        <ListItemButton sx={{ borderRadius: 2, mb: 0.5 }}>
          <ListItemAvatar>
            <Avatar>U</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Your Name"
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItemButton>
        {shortcuts.map((item, index) => (
          <ListItemButton key={index} sx={{ borderRadius: 2, mb: 0.5 }}>
            <Box sx={{ fontSize: "1.5rem", mr: 2 }}>{item.icon}</Box>
            <ListItemText
              primary={item.name}
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
