import { useState } from "react";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../../../App/Validations/Auth";
import { register } from "../../../App/services/authServices";

const Register = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");

  const go = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(() => true);
    setError("");

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
            () => "Invalid Register Data or User With details Already Exists"
          );
        }
      } else {
        if (response.code === 201) {
          go("/auth/login");
        }
      }
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        display: "flex",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography
                variant="h2"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: "3rem", md: "4rem" },
                }}
              >
                facebook
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                Facebook helps you connect and share with the people in your
                life.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                bgcolor: theme.palette.background.paper,
              }}
            >
              <Box component="form" onSubmit={handleRegister}>
                {error && (
                  <Alert severity="error" sx={{ mb: 2.5 }}>
                    {error}
                  </Alert>
                )}

                <TextField
                  fullWidth
                  type="text"
                  placeholder="Full Name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  sx={{
                    mb: 1.5,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                      fontSize: "1.0625rem",
                      height: 52,
                    },
                  }}
                  disabled={isLoading}
                />

                <TextField
                  fullWidth
                  type="email"
                  placeholder="Email address"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  sx={{
                    mb: 1.5,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                      fontSize: "1.0625rem",
                      height: 52,
                    },
                  }}
                  disabled={isLoading}
                />

                <TextField
                  fullWidth
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                      fontSize: "1.0625rem",
                      height: 52,
                    },
                  }}
                  disabled={isLoading}
                />

                <TextField
                  fullWidth
                  type="password"
                  placeholder="Confirm Password"
                  value={data.password_confirmation}
                  onChange={(e) =>
                    setData({ ...data, password_confirmation: e.target.value })
                  }
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                      fontSize: "1.0625rem",
                      height: 52,
                    },
                  }}
                  disabled={isLoading}
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{
                    mb: 2,
                    height: 48,
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    borderRadius: 1.5,
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Log in"
                  )}
                </Button>

                <Divider sx={{ mb: 3, borderColor: theme.palette.divider }} />

                <Box sx={{ textAlign: "center" }}>
                  <Button
                    onClick={() => go("/auth/login")}
                    variant="contained"
                    color="secondary"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: "1.0625rem",
                      fontWeight: 700,
                      borderRadius: 1.5,
                    }}
                  >
                    Login To Account
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "0.875rem",
            }}
          >
            Ahmed Hassan © {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
