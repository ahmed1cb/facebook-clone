import { Card, CardContent, Avatar, Typography, Box, Button, useTheme } from "@mui/material";

const SearchResultCard = ({ result, type }) => {
  const theme = useTheme();

  if (type === "people") {
    return (
      <Card sx={{ p: 2, mb: 2, borderRadius: 1, bgcolor: theme.palette.background.paper }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: theme.palette.primary.main,
              color: "white",
              fontSize: 28,
            }}
          >
            {result.name[0]}
          </Avatar>
          
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              {result.name}
            </Typography>
            
            {result.mutualFriends && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {result.mutualFriends} mutual friends
              </Typography>
            )}
            
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                sx={{ 
                  textTransform: "none", 
                  fontWeight: 600,
                  bgcolor: theme.palette.primary.main,
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                  }
                }}
              >
                Add Friend
              </Button>
              <Button
                variant="outlined"
                sx={{ 
                  textTransform: "none", 
                  fontWeight: 600,
                  borderColor: theme.palette.grey[400],
                  color: theme.palette.text.primary
                }}
              >
                Message
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    );
  }

  if (type === "posts") {
    return (
      <Card sx={{ mb: 2, borderRadius: 1, bgcolor: theme.palette.background.paper }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Avatar sx={{ width: 40, height: 40, bgcolor: theme.palette.primary.main }}>
              {result.author?.name[0]}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {result.author?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {result.time}
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="body1" sx={{ mb: 2 }}>
            {result.content}
          </Typography>
          
          {result.image && (
            <Box
              component="img"
              src={result.image}
              sx={{ 
                width: "100%", 
                borderRadius: 1,
                maxHeight: 300,
                objectFit: "cover"
              }}
            />
          )}
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default SearchResultCard;