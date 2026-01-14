import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Avatar,
  Typography,
  Box,
  Menu,
  MenuItem,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Search as SearchIcon,
  Home as HomeIcon,
  OndemandVideo as VideoIcon,
  Menu as MenuIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person,
  Settings,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import Cookie from "../../App/Cookie/Cookie";
import { useSelector } from "react-redux";
import api from "../../App/services/api";

export default () => {
  const theme = useTheme();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const menuOpen = Boolean(menuAnchor);
  const user = useSelector(s => s.auth.user)

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const menuItems = [
    {
      icon: <SettingsIcon />,
      text: "Settings",
      divider: false,
      event: () => go("/settings"),
    },
    {
      icon: <LogoutIcon />,
      text: "Log Out",
      divider: false,
      event: () => {
        Cookie.remove("authorization");
        go("auth/register");
      },
    },
  ];

  const go = useNavigate();

  const { pathname: path } = useLocation();
  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                mr: 2,
              }}
            >
              facebook
            </Typography>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                bgcolor: theme.palette.mode === "light" ? "#F0F2F5" : "#3A3B3C",
                borderRadius: 50,
                px: 2,
                py: 0.5,
                minWidth: 240,
              }}
            >
              <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />

              <InputBase
                placeholder="Search Facebook"
                sx={{
                  flex: 1,
                  color: theme.palette.text.primary,
                  "& input::placeholder": {
                    color: theme.palette.text.secondary,
                    opacity: 1,
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    go(`/search/${e.target.value}`);
                  }
                }}
              />
            </Box>
          </Box>

          {/* Center Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <IconButton
              sx={{
                borderRadius: 2,
                px: 4,
                color: theme.palette.text.secondary,
                borderBottom:
                  path === "/" ? `3px solid ${theme.palette.primary.main}` : "",
              }}
              onClick={() => go("/")}
            >
              <HomeIcon />
            </IconButton>
            <IconButton
              sx={{
                borderRadius: 2,
                px: 4,
                color: theme.palette.text.secondary,
                borderBottom:
                  path === "/videos"
                    ? `3px solid ${theme.palette.primary.main}`
                    : "",
              }}
              onClick={() => go("/videos")}
            >
              <VideoIcon />
            </IconButton>
            <IconButton
              sx={{
                borderRadius: 2,
                px: 4,
                color: theme.palette.text.secondary,
                borderBottom:
                  path === "/profile"
                    ? `3px solid ${theme.palette.primary.main}`
                    : "",
              }}
              onClick={() => go("/profile")}
            >
              <Person />
            </IconButton>
            <IconButton
              sx={{
                borderRadius: 2,
                px: 4,
                color: theme.palette.text.secondary,
                borderBottom:
                  path === "/settings"
                    ? `3px solid ${theme.palette.primary.main}`
                    : "",
              }}
              onClick={() => go("/settings")}
            >
              <Settings />
            </IconButton>
          </Box>

          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={handleMenuClick}
              sx={{
                bgcolor: theme.palette.mode === "light" ? "#E4E6EB" : "#3A3B3C",
              }}
            >
              <MenuIcon />
            </IconButton>

            <Avatar
              onClick={() => go("/profile")}
              sx={{ width: 32, height: 32, cursor: "pointer" }}
              src={`${api.getUri()}/../storage/${user.photo}`}
            >
              {user.name[0].toUpperCase()}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Menu Dropdown */}
      <Menu
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 320,
            borderRadius: 2,
            boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Menu
          </Typography>
        </Box>
        <Divider />
        {menuItems.map((item, index) => (
          <Box key={index}>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                item.event();
              }}
              sx={{
                py: 1.5,
                px: 2,
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  bgcolor:
                    theme.palette.mode === "light" ? "#E4E6EB" : "#3A3B3C",
                }}
              >
                {item.icon}
              </Box>
              <Typography variant="body1">{item.text}</Typography>
            </MenuItem>
            {item.divider && <Divider />}
          </Box>
        ))}
      </Menu>
    </>
  );
};
