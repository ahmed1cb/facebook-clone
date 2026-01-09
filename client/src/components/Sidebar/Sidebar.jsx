import {
  Box,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import { useSelector } from "react-redux";
import api from "../../App/services/api";

export default () => {
  const shortcuts = [
    { name: "Friends", icon: "👥" },
    { name: "Watch", icon: "📺" },
  ];

  const user = useSelector((s) => s.auth.user);

  let profileImage = user.photo ? (
    <Avatar
      src={`${api.getUri()}/../storage/app/public/${user.photo}`}
    ></Avatar>
  ) : (
    <Avatar>{user.name[0]}</Avatar>
  );

  return (
    <Box sx={{ position: "sticky", top: 72 }}>
      <List>
        <ListItemButton sx={{ borderRadius: 2, mb: 0.5 }}>
          <ListItemAvatar>{profileImage}</ListItemAvatar>
          <ListItemText
            primary={user.name}
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
