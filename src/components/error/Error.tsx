import { Box, Typography } from "@mui/material";

export default function Error() {
  return (
    <Box className="flex justify-center items-center align-middle h-screen">
          <Typography variant="h4">
              404 | <span className="text-base">This page couldn't be found.</span>
      </Typography>
    </Box>
  );
}