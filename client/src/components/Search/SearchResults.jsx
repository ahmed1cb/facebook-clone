import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Chip,
  Tabs,
  Tab,
  Stack,
  Button,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Search as SearchIcon,
  Person,
  Article,
  Photo,
  Groups,
  FilterList,
} from "@mui/icons-material";
import SearchResultsList from "./SearchResultsList";
import { useParams } from "react-router-dom";

const SearchResults = () => {
  const theme = useTheme();
  const [activeFilter, setActiveFilter] = useState("all");
  const [results, setResults] = useState([]);

  const { query: searchQuery } = useParams();

  const filterOptions = [
    { value: "all", label: "All Results", icon: <SearchIcon /> },
    { value: "people", label: "People", icon: <Person /> },
    { value: "posts", label: "Posts", icon: <Article /> },
    { value: "photos", label: "Photos", icon: <Photo /> },
    { value: "groups", label: "Groups", icon: <Groups /> },
  ];

  const allResults = {
    people: [
      {
        id: "p1",
        type: "people",
        name: "Nature Photographer",
        avatar: "",
        mutualFriends: 12,
        bio: "Professional landscape photographer | Nature lover 🌿📷 Capturing the beauty of our planet one shot at a time",
        verified: true,
        tags: ["Photography", "Nature", "Travel"],
      },
      {
        id: "p2",
        type: "people",
        name: "Wild Nature",
        avatar: "",
        mutualFriends: 5,
        bio: "Exploring the wilderness | Wildlife enthusiast 🦅 Conservation advocate",
        tags: ["Wildlife", "Conservation"],
      },
      {
        id: "p3",
        type: "people",
        name: "Nature Trails Guide",
        avatar: "",
        mutualFriends: 8,
        bio: "Hiking guide | Mountain lover | Adventure seeker ⛰️ Let's explore together!",
        verified: true,
        tags: ["Hiking", "Adventure", "Guide"],
      },
    ],
    posts: [
      {
        id: "po1",
        type: "posts",
        author: { name: "Jane Cooper", avatar: "" },
        time: "2h ago",
        content:
          "Just finished an amazing hike! The views were absolutely stunning. Nature always helps clear my mind. 🏔️ #hiking #nature #adventure",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        likes: 145,
        comments: 23,
      },
      {
        id: "po2",
        type: "posts",
        author: { name: "Michael Chen", avatar: "" },
        time: "5h ago",
        content:
          "Amazing sunset at the beach today! Sometimes you just need to take a moment and appreciate the beauty of nature around us. 🌅",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
        likes: 234,
        comments: 45,
      },
      {
        id: "po3",
        type: "posts",
        author: { name: "Sarah Williams", avatar: "" },
        time: "1 day ago",
        content:
          "Camping under the stars last night was magical! There's nothing quite like being surrounded by nature. ✨🏕️",
        likes: 189,
        comments: 31,
      },
    ],
    photos: [
      {
        id: "ph1",
        type: "photos",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
        title: "Mountain Landscape",
        author: { name: "Nature Lens", avatar: "" },
        time: "2 days ago",
      },
      {
        id: "ph2",
        type: "photos",
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
        title: "Forest Path",
        author: { name: "Wild Nature", avatar: "" },
        time: "3 days ago",
      },
      {
        id: "ph3",
        type: "photos",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
        title: "Ocean Sunset",
        author: { name: "Beach Views", avatar: "" },
        time: "1 week ago",
      },
      {
        id: "ph4",
        type: "photos",
        image:
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600",
        title: "Misty Mountains",
        author: { name: "Adventure Shots", avatar: "" },
        time: "1 week ago",
      },
    ],
    groups: [
      {
        id: "g1",
        type: "groups",
        name: "Nature Photography Enthusiasts",
        image: "",
        members: "45.2K",
        privacy: "Public group",
        description:
          "A community for nature photography lovers to share tips, photos, and experiences. Join us for weekly photo challenges!",
      },
      {
        id: "g2",
        type: "groups",
        name: "Hiking & Nature Trails",
        image: "",
        members: "32.8K",
        privacy: "Public group",
        description:
          "Discover the best hiking trails and connect with fellow nature enthusiasts. Share your adventures!",
      },
      {
        id: "g3",
        type: "groups",
        name: "Wildlife & Nature Conservation",
        image: "",
        members: "28.5K",
        privacy: "Public group",
        description:
          "Dedicated to protecting wildlife and preserving natural habitats. Together we can make a difference.",
      },
    ],
  };

  useEffect(() => {
    if (activeFilter === "all") {
      const combined = [
        ...allResults.people,
        ...allResults.posts,
        ...allResults.photos,
        ...allResults.groups,
      ];
      setResults(combined);
    } else {
      setResults(allResults[activeFilter] || []);
    }
  }, [activeFilter]);

  const handleFilterChange = (event, newValue) => {
    setActiveFilter(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Main Content Area */}
          <Grid item xs={12} lg={9}>
            {/* Filter Tabs */}
            <Paper
              elevation={0}
              sx={{
                mb: 3,
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  px: 2,
                  pt: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  Filter Results
                </Typography>
                <Chip
                  icon={<FilterList />}
                  label="Filters"
                  variant="outlined"
                  size="small"
                />
              </Box>
              <Tabs
                value={activeFilter}
                onChange={handleFilterChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  "& .MuiTab-root": {
                    textTransform: "none",
                    minHeight: 56,
                  },
                }}
              >
                {filterOptions.map((option) => (
                  <Tab
                    key={option.value}
                    value={option.value}
                    icon={option.icon}
                    iconPosition="start"
                    label={option.label}
                  />
                ))}
              </Tabs>
            </Paper>

            {/* Results Count */}
            <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Showing
              </Typography>
              <Chip
                label={`${results.length} results`}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Box>

            {/* Search Results Grid */}
            <SearchResultsList
              results={results}
              filter={activeFilter}
              searchQuery={searchQuery}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchResults;
