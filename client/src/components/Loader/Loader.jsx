import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <CircularProgress
        size={36}
        thickness={4}
        sx={{
          color: "#1877f2", 
        }}
      />
    </Box>
  );
}
