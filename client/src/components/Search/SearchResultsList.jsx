import {
  Box,
  Typography,
  Chip,
  Stack,
  Paper,
  alpha,
  useTheme,
  Container,
  Grid,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import SearchResultCard from "./SearchResultCard";

const SearchResultsList = ({ results, filter, searchQuery }) => {
  const theme = useTheme();
  const getLayoutForFilter = () => {
    switch (filter) {
      case "photos":
        return {
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(auto-fill, minmax(300px, 1fr))",
            lg: "repeat(auto-fill, minmax(280px, 1fr))",
          },
          gap: 2,
        };
      case "people":
        return {
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(auto-fill, minmax(450px, 1fr))",
          },
          gap: 2,
        };
      case "posts":
        return {
          gridTemplateColumns: { xs: "1fr" },
          gap: 2,
        };
      default:
        return {
          gridTemplateColumns: { xs: "1fr" },
          gap: 2,
        };
    }
  };

  if (results.length === 0) {
    return (
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 8 },
            textAlign: "center",
            borderRadius: 3,
            border: `1px dashed ${alpha(theme.palette.divider, 0.2)}`,
            background: alpha(theme.palette.background.paper, 0.5),
            mt: 3,
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: alpha(theme.palette.primary.main, 0.08),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <SearchIcon
              sx={{
                fontSize: 40,
                color: alpha(theme.palette.primary.main, 0.6),
              }}
            />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 1.5,
              color: theme.palette.text.primary,
            }}
          >
            No results found
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: 400, mx: "auto" }}
          >
            We couldn't find any results for "{searchQuery}". Try adjusting your
            search terms.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            justifyContent="center"
            sx={{ mt: 3 }}
          >
            <Chip
              label="Clear filters"
              variant="outlined"
              onClick={() => {}}
              sx={{
                borderColor: alpha(theme.palette.primary.main, 0.3),
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            />
            <Chip
              label="Try different keywords"
              variant="outlined"
              onClick={() => {}}
              sx={{
                borderColor: alpha(theme.palette.primary.main, 0.3),
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            />
          </Stack>
        </Paper>
      </Container>
    );
  }

  const layoutConfig = getLayoutForFilter();

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          ...layoutConfig,
        }}
      >
        {results.map((result) => {
          return (
            <Box
              key={result.id}
              sx={{
                width: "100%",
                ...(filter === "all" && {
                  gridColumn: "1 / -1",
                }),
              }}
            >
              <SearchResultCard result={result} />
            </Box>
          );
        })}
      </Box>

      {results.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: 2.5,
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            End of results for "{searchQuery}"
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={`${results.length} total`}
              size="small"
              variant="outlined"
              sx={{
                fontWeight: 500,
                borderColor: alpha(theme.palette.divider, 0.3),
              }}
            />
            <Chip
              label="Back to top"
              size="small"
              variant="outlined"
              onClick={() => root.scrollTo({ top: 0, behavior: "smooth" })}
              sx={{
                fontWeight: 500,
                borderColor: alpha(theme.palette.primary.main, 0.3),
                color: theme.palette.primary.main,
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            />
          </Stack>
        </Paper>
      )}
    </Box>
  );
};

export default SearchResultsList;
