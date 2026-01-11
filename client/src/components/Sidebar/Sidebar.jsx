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
import { useNavigate } from "react-router-dom";

export default () => {
  const user = useSelector((s) => s.auth.user);
  const go = useNavigate()


  const shortcuts = [
    { name: "Friends", icon: "👥" },
    { name: "Watch", icon: "📺" },
  ];

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
        <ListItemButton
          sx={{ borderRadius: 2, mb: 0.5 }}
          onClick={() => go("/profile")}
        >
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
