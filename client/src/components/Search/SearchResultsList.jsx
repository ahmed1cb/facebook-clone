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
import {
  Search as SearchIcon,
  FilterList,
  Category,
  TrendingUp,
  Sort,
} from "@mui/icons-material";
import SearchResultCard from "./SearchResultCard";

const SearchResultsList = ({ results, filter, searchQuery }) => {
  const theme = useTheme();

  const getFilterLabel = (filter) => {
    const labels = {
      all: "All Results",
      people: "People",
      posts: "Posts",
      photos: "Photos",
      groups: "Groups",
    };
    return labels[filter] || filter;
  };

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
      case "groups":
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
      default: // "all"
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
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.background.paper,
            0.8,
          )} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
        }}
      >
        <Stack spacing={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SearchIcon
                  sx={{
                    fontSize: 24,
                    color: theme.palette.primary.main,
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                  }}
                >
                  {getFilterLabel(filter)}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <Category fontSize="small" />
                  Search Results
                </Typography>
              </Box>
            </Box>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mt: { xs: 1, sm: 0 } }}
            >
              <Chip
                icon={<FilterList />}
                label="Filter"
                variant="outlined"
                onClick={() => {}}
                sx={{
                  fontWeight: 500,
                  borderColor: alpha(theme.palette.divider, 0.3),
                }}
              />
              <Chip
                label={`${results.length} results`}
                color="primary"
                sx={{
                  fontWeight: 600,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                }}
              />
            </Stack>
          </Box>

          <Box
            sx={{
              p: 2,
              borderRadius: 1.5,
              bgcolor: alpha(theme.palette.primary.main, 0.03),
              borderLeft: `4px solid ${theme.palette.primary.main}`,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              <Box component="span" sx={{ fontWeight: 600 }}>
                Search query:
              </Box>{" "}
              "{searchQuery}"
              {filter !== "all" && (
                <>
                  {" "}
                  ·{" "}
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    Filtered by:
                  </Box>{" "}
                  {getFilterLabel(filter)}
                </>
              )}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Results Controls */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TrendingUp
              fontSize="small"
              sx={{ color: theme.palette.text.secondary }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
              }}
            >
              Showing {results.length} results
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <Sort fontSize="small" />
              Sort by:
            </Typography>
            <Chip
              label="Relevance"
              size="small"
              variant="outlined"
              onClick={() => {}}
              sx={{
                fontWeight: 500,
                borderColor: alpha(theme.palette.divider, 0.3),
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            />
            <Chip
              label="Most Recent"
              size="small"
              variant="outlined"
              onClick={() => {}}
              sx={{
                fontWeight: 500,
                borderColor: alpha(theme.palette.divider, 0.3),
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            />
          </Stack>
        </Box>
      </Paper>

      {/* Results Grid */}
      <Box
        sx={{
          display: "grid",
          ...layoutConfig,
        }}
      >
        {results.map((result) => (
          <Box
            key={result.id}
            sx={{
              width: "100%",
              ...(filter === "all" && {
                gridColumn: "1 / -1",
              }),
            }}
          >
            <SearchResultCard
              result={result}
              type={filter === "all" ? result.type : filter}
              searchQuery={searchQuery}
            />
          </Box>
        ))}
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
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
