import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  Grid,
  Paper,
  Alert,
  CircularProgress,
  useTheme,
  InputAdornment,
  IconButton,
  Fade,
  Zoom,
  alpha,
  useMediaQuery,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  ArrowForward,
  PersonAdd,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../../App/Validations/Auth";
import { login } from "../../../App/services/authServices";
import Cookie from "../../../App/Cookie/Cookie";

const Login = () => {
  const theme = useTheme();
  const go = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (Cookie.get("authorization")) {
      go("/");
    }
  }, []);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const check = loginSchema.safeParse(data);
    setIsLoading(() => true);
    if (!check.success) {
      setError(() => JSON.parse(check.error)[0].message);
      setIsLoading(() => false);
    } else {
      const response = await login(data);

      if (response.code === 200) {
        let token = response.data.data.token;
        Cookie.set("authorization", `Bearer ${token}`, 3);
        go("/");
      } else {
        if (response.code == 500) {
          setError("Something Went Wrong Try Again Later");
          return;
        }
        setError("Invalid Data or User Not exists");
      }

      setIsLoading(() => false);
    }
  };

  return (
    <Fade in timeout={500}>
      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.05,
          )}, ${alpha(theme.palette.secondary.main, 0.05)})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 2, md: 4 },
          px: { xs: 2, sm: 0 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Zoom in timeout={700} style={{ transitionDelay: "100ms" }}>
            <Grid
              container
              spacing={{ xs: 3, md: 6 }}
              alignItems="center"
              justifyContent="center"
            >
              {/* Left Side - Branding */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    pr: { md: 6 },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "center", md: "flex-start" },
                      mb: 3,
                    }}
                  >
                    <FacebookIcon
                      sx={{
                        fontSize: { xs: 48, md: 64 },
                        color: theme.palette.primary.main,
                        mr: 2,
                      }}
                    />
                    <Typography
                      variant="h1"
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 800,
                        mb: 1,
                        fontSize: {
                          xs: "2.5rem",
                          sm: "3rem",
                          md: "3.5rem",
                          lg: "4rem",
                        },
                        letterSpacing: "-0.5px",
                        background: `linear-gradient(135deg, 
                          ${theme.palette.primary.main}, 
                          ${theme.palette.secondary.main}
                        )`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      facebook
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: 400,
                      lineHeight: 1.3,
                      mb: 2,
                      fontSize: {
                        xs: "1.5rem",
                        md: "1.75rem",
                        lg: "2rem",
                      },
                    }}
                  >
                    Connect with friends and the world around you.
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: "1.1rem",
                      lineHeight: 1.6,
                      opacity: 0.8,
                      maxWidth: "90%",
                      mx: { xs: "auto", md: 0 },
                    }}
                  >
                    Facebook helps you connect and share with the people in your
                    life.
                  </Typography>
                </Box>
              </Grid>

              {/* Right Side - Login Form */}
              <Grid item xs={12} sm={10} md={6} lg={5}>
                <Zoom in timeout={800} style={{ transitionDelay: "200ms" }}>
                  <Paper
                    elevation={8}
                    sx={{
                      p: { xs: 3, sm: 4, md: 4.5 },
                      borderRadius: 4,
                      bgcolor: theme.palette.background.paper,
                      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                      boxShadow: theme.shadows[10],
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: theme.shadows[16],
                        transform: "translateY(-4px)",
                      },
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="form"
                      onSubmit={handleLogin}
                      sx={{
                        "& .MuiTextField-root": {
                          my: 1.5,
                        },
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 3,
                          fontWeight: 600,
                          textAlign: "center",
                          color: theme.palette.text.primary,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <Lock fontSize="small" />
                        Log In to Your Account
                      </Typography>

                      {error && (
                        <Fade in>
                          <Alert
                            severity="error"
                            sx={{
                              mb: 3,
                              borderRadius: 2,
                              border: `1px solid ${theme.palette.error.light}`,
                              bgcolor: alpha(theme.palette.error.main, 0.1),
                              "& .MuiAlert-icon": {
                                color: theme.palette.error.main,
                              },
                            }}
                          >
                            {error}
                          </Alert>
                        </Fade>
                      )}

                      <TextField
                        fullWidth
                        type="email"
                        name="email"
                        label="Email Address"
                        placeholder="Enter your email"
                        value={data.email}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email
                                sx={{
                                  color: theme.palette.primary.main,
                                  opacity: 0.7,
                                }}
                              />
                            </InputAdornment>
                          ),
                          sx: {
                            borderRadius: 2,
                            fontSize: "1rem",
                            height: 56,
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: theme.palette.primary.main,
                            },
                          },
                        }}
                        disabled={isLoading}
                        variant="outlined"
                      />

                      <TextField
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        value={data.password}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock
                                sx={{
                                  color: theme.palette.primary.main,
                                  opacity: 0.7,
                                }}
                              />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                size="small"
                                sx={{ color: theme.palette.text.secondary }}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                          sx: {
                            borderRadius: 2,
                            fontSize: "1rem",
                            height: 56,
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: theme.palette.primary.main,
                            },
                          },
                        }}
                        disabled={isLoading}
                        variant="outlined"
                      />

                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isLoading}
                        sx={{
                          mt: 2,
                          mb: 3,
                          height: 50,
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          borderRadius: 2,
                          textTransform: "none",
                          background: `linear-gradient(135deg, 
                            ${theme.palette.primary.main}, 
                            ${theme.palette.primary.dark}
                          )`,
                          boxShadow: theme.shadows[4],
                          "&:hover": {
                            background: `linear-gradient(135deg, 
                              ${theme.palette.primary.dark}, 
                              ${theme.palette.primary.main}
                            )`,
                            boxShadow: theme.shadows[8],
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.2s ease",
                          position: "relative",
                          overflow: "hidden",
                          "& .MuiCircularProgress-root": {
                            position: "absolute",
                          },
                        }}
                      >
                        {isLoading ? (
                          <CircularProgress size={24} sx={{ color: "white" }} />
                        ) : (
                          <>
                            Log In
                            <ArrowForward sx={{ ml: 1, fontSize: 20 }} />
                          </>
                        )}
                      </Button>

                      <Divider
                        sx={{
                          mb: 3,
                          "&::before, &::after": {
                            borderColor: alpha(theme.palette.divider, 0.3),
                          },
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.text.secondary,
                            px: 2,
                            fontWeight: 500,
                          }}
                        >
                          New to Facebook?
                        </Typography>
                      </Divider>

                      <Button
                        fullWidth
                        onClick={() => go("/auth/register")}
                        variant="outlined"
                        color="secondary"
                        size="large"
                        startIcon={<PersonAdd />}
                        sx={{
                          height: 50,
                          fontSize: "1rem",
                          fontWeight: 600,
                          borderRadius: 2,
                          textTransform: "none",
                          borderWidth: 2,
                          "&:hover": {
                            borderWidth: 2,
                            bgcolor: alpha(theme.palette.secondary.main, 0.1),
                            transform: "translateY(-2px)",
                            boxShadow: theme.shadows[4],
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        Create New Account
                      </Button>
                    </Box>
                  </Paper>
                </Zoom>
              </Grid>
            </Grid>
          </Zoom>

          {/* Footer */}
          <Fade in timeout={1000}>
            <Box
              sx={{
                mt: 6,
                pt: 4,
                borderTop: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                textAlign: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: "0.875rem",
                  opacity: 0.8,
                  "& a": {
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  },
                }}
              >
                © {new Date().getFullYear()} Ahmed Hassan •{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Privacy
                </a>{" "}
                •{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Terms
                </a>{" "}
                •{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Cookies
                </a>
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.disabled,
                  mt: 1,
                  display: "block",
                  fontSize: "0.75rem",
                }}
              >
                Facebook Clone - For Educational Purposes
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Fade>
  );
};

export default Login;
