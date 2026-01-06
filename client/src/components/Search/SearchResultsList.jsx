import { Box, Typography, Chip, useTheme } from "@mui/material";
import SearchResultCard from "./SearchResultCard";

const SearchResultsList = ({ results, filter, searchQuery }) => {
  const theme = useTheme();

  if (results.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          No results found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          No results for "{searchQuery}"
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Search Results
          </Typography>
          <Chip
            label={`${results.length} results`}
            sx={{ fontWeight: 600 }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          Results for "{searchQuery}"
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {results.map((result) => (
          <SearchResultCard
            key={result.id}
            result={result}
            type={filter === "all" ? result.type : filter}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SearchResultsList;