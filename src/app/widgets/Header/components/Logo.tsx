'use client';
import theme from "@/theme";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Logo() {
  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      <Box component="span" sx={{ color: theme.palette.primary.main }}>
        Wish
      </Box>
      List
    </Typography>
  );
}
