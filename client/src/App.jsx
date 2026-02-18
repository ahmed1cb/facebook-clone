import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import themes from "./App/Theme/Main";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import themeChanger from "./App/Context/ThemeChangerContext";
import Home from "./components/Home/Home";
import Videos from "./components/Videos/Videos";
import MainLayout from "./Layouts/MainLayout";
import Profile from "./components/Profile/Profile";
import SearchResults from "./components/Search/SearchResults";
import NotFound from "./components/States/404";
import Settings from "./components/Settings/Settings";
import { Provider } from "react-redux";
import { store } from "./App/Redux/Store";
import User from "./components/User/User";
import PostPage from "./components/Posts/PostPage";
import FriendRequests from "./components/FriendRequests/FriendRequests";

function App() {
  const [mode, setMode] = useState(localStorage.mode ?? "light");

  const currentTheme = themes[mode];

  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Provider store={store}>
          <themeChanger.Provider value={{ mode, setMode }}>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="videos" element={<Videos />} />
                <Route path="profile" element={<Profile />} />
                <Route path="search/:query" element={<SearchResults />} />
                <Route path="settings" element={<Settings />} />
                <Route path="user/:id" element={<User />} />
                <Route path="post/:id" element={<PostPage />} />
                <Route path="friends" element={<FriendRequests />} />
              </Route>

              <Route path="/auth">
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </themeChanger.Provider>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
