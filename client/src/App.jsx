import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import themes from "./App/Theme/Main";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import themeChanger from "./App/Context/ThemeChangerContext";
import Home from "./components/Home/Home";
function App() {
  const [mode, setMode] = useState(localStorage.mode ?? "light");

  const currentTheme = themes[mode];

  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <themeChanger.Provider value={{ mode, setMode }}>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
            </Route>

            <Route path="/auth">
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </themeChanger.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
