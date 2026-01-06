import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const NotFound = () => {
  const theme = useTheme();

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: theme.palette.background.default,
        p: 2,
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        {/* 404 Text */}
        <Typography
          variant="h1"
          sx={{
            fontSize: "6rem",
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 2,
          }}
        >
          404
        </Typography>

        {/* Message */}
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.text.secondary,
            mb: 4,
          }}
        >
          Page not found
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            color: theme.palette.text.secondary,
            mb: 4,
            maxWidth: 400,
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleGoHome}
            sx={{
              bgcolor: theme.palette.primary.main,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            Go Home
          </Button>
          
          <Button
            variant="outlined"
            onClick={handleGoBack}
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
            }}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;