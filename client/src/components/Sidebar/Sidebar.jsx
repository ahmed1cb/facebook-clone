import {
  Box,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import api from "../../App/services/api";
import { useNavigate } from "react-router-dom";
import { Group, Movie, Person, Settings } from "@mui/icons-material";

export default () => {
  const user = useSelector((s) => s.auth.user);
  const go = useNavigate();

  const shortcuts = [
    { name: "Profile", icon: <Person />, uri: "/profile" },
    { name: "Watch", icon: <Movie />, uri: "/videos" },
    { name: "Friends", icon: <Group />, uri: "/friends" },
    { name: "Settings", icon: <Settings />, uri: "/settings" },
  ];

  let profileImage = user.photo ? (
    <Avatar src={`${api.getUri()}/../storage/${user.photo}`}></Avatar>
  ) : (
    <Avatar>{user.name[0]}</Avatar>
  );

  return (
    <Box
      sx={{ position: "sticky", top: 0, display: { md: "none", lg: "block" } }}
    >
      <List>
        <ListItemButton
          sx={{ borderRadius: 2, mb: 1 }}
          onClick={() => go("/profile")}
        >
          <ListItemAvatar>{profileImage}</ListItemAvatar>
          <ListItemText
            primary={user.name}
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItemButton>
        {shortcuts.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{ borderRadius: 2, mb: 0.5 }}
            onClick={() => {
              go(item.uri);
            }}
          >
            <Button
              startIcon={item.icon}
              color="text.primary"
              sx={{ fontWeight: 800 }}
            >
              {item.name}
            </Button>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
