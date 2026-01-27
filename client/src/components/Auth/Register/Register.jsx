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
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  ArrowForward,
  Login as LoginIcon,
  CheckCircle,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../../../App/Validations/Auth";
import { register } from "../../../App/services/authServices";
import Cookie from "../../../App/Cookie/Cookie";

const Register = () => {
  const theme = useTheme();
  const go = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (Cookie.get("authorization")) {
      go("/");
    }
  }, []);

  useEffect(() => {
    const strength = calculatePasswordStrength(data.password);
    setPasswordStrength(strength);
  }, [data.password]);

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    return Math.min(score, 100);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(() => true);
    setError("");
    setSuccess("");

    let check = registerSchema.safeParse(data);

    if (!check.success) {
      setError(JSON.parse(check.error)[0].message);
      setIsLoading(() => false);
    } else {
      setError("");

      let response = await register(data);

      if (response.message !== "Success") {
        if (response.code == 500) {
          setError(() => "Something Went Wrong Try Again Later");
        } else {
          setError(
            () => "Invalid Register Data or User With details Already Exists",
          );
        }
      } else {
        if (response.code === 201) {
          setSuccess("Registration successful! Redirecting to login...");
          setTimeout(() => {
            go("/auth/login");
          }, 1500);
        }
      }
      setIsLoading(false);
    }
  };

  const getStrengthColor = (strength) => {
    if (strength < 25) return theme.palette.error.main;
    if (strength < 50) return theme.palette.warning.main;
    if (strength < 75) return theme.palette.info.main;
    return theme.palette.success.main;
  };

  const handleInputChange = (field) => (e) => {
    setData({ ...data, [field]: e.target.value });
    if (error) setError("");
  };

  return (
    <Fade in timeout={500}>
      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.05,
          )}, ${alpha(theme.palette.success.main, 0.05)})`,
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
                          ${theme.palette.success.main}
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
                    Join Facebook and connect with the world.
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
                    Sign up to connect with friends, family, and communities of
                    people who share your interests.
                  </Typography>
                  <Box sx={{ mt: 4, display: { xs: "none", md: "block" } }}>
                    <Typography
                      variant="h6"
                      sx={{ mb: 2, color: theme.palette.text.primary }}
                    >
                      Why join Facebook?
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                      }}
                    >
                      {[
                        "Connect with friends and family",
                        "Share photos and videos",
                        "Stay updated with news and events",
                      ].map((item, index) => (
                        <Box
                          key={index}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <CheckCircle
                            sx={{
                              color: theme.palette.success.main,
                              mr: 1.5,
                              fontSize: 20,
                            }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Right Side - Register Form */}
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
                      onSubmit={handleRegister}
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
                        <Person fontSize="small" />
                        Create New Account
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

                      {success && (
                        <Fade in>
                          <Alert
                            severity="success"
                            sx={{
                              mb: 3,
                              borderRadius: 2,
                              border: `1px solid ${theme.palette.success.light}`,
                              bgcolor: alpha(theme.palette.success.main, 0.1),
                            }}
                          >
                            {success}
                          </Alert>
                        </Fade>
                      )}

                      <TextField
                        fullWidth
                        type="text"
                        label="Full Name"
                        placeholder="Enter your full name"
                        value={data.name}
                        onChange={handleInputChange("name")}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person
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
                        type="email"
                        label="Email Address"
                        placeholder="Enter your email"
                        value={data.email}
                        onChange={handleInputChange("email")}
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

                      <Box>
                        <TextField
                          fullWidth
                          type={showPassword ? "text" : "password"}
                          label="Password"
                          placeholder="Create a password"
                          value={data.password}
                          onChange={handleInputChange("password")}
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
                        {data.password && (
                          <Box sx={{ mt: 1, mb: 0.5 }}>
                            <Box
                              sx={{
                                height: 4,
                                width: "100%",
                                bgcolor: alpha(theme.palette.grey[300], 0.5),
                                borderRadius: 2,
                                overflow: "hidden",
                              }}
                            >
                              <Box
                                sx={{
                                  height: "100%",
                                  width: `${passwordStrength}%`,
                                  bgcolor: getStrengthColor(passwordStrength),
                                  borderRadius: 2,
                                  transition: "width 0.3s ease",
                                }}
                              />
                            </Box>
                            <Typography
                              variant="caption"
                              sx={{
                                color: getStrengthColor(passwordStrength),
                                fontSize: "0.75rem",
                                mt: 0.5,
                                display: "block",
                              }}
                            >
                              Password strength: {passwordStrength}%
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      <TextField
                        fullWidth
                        type={showConfirmPassword ? "text" : "password"}
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        value={data.password_confirmation}
                        onChange={handleInputChange("password_confirmation")}
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
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                edge="end"
                                size="small"
                                sx={{ color: theme.palette.text.secondary }}
                              >
                                {showConfirmPassword ? (
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
                            ${theme.palette.success.main}, 
                            ${theme.palette.success.dark}
                          )`,
                          boxShadow: theme.shadows[4],
                          "&:hover": {
                            background: `linear-gradient(135deg, 
                              ${theme.palette.success.dark}, 
                              ${theme.palette.success.main}
                            )`,
                            boxShadow: theme.shadows[8],
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        {isLoading ? (
                          <CircularProgress size={24} sx={{ color: "white" }} />
                        ) : (
                          <>
                            Sign Up
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
                          Already have an account?
                        </Typography>
                      </Divider>

                      <Button
                        fullWidth
                        onClick={() => go("/auth/login")}
                        variant="outlined"
                        color="primary"
                        size="large"
                        startIcon={<LoginIcon />}
                        sx={{
                          height: 50,
                          fontSize: "1rem",
                          fontWeight: 600,
                          borderRadius: 2,
                          textTransform: "none",
                          borderWidth: 2,
                          "&:hover": {
                            borderWidth: 2,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            transform: "translateY(-2px)",
                            boxShadow: theme.shadows[4],
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        Login To Your Account
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

export default Register;
