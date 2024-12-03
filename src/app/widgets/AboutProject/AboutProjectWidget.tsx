import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function AboutProjectWidget() {
  return (
    <Box sx={{marginX: 'auto', textAlign: 'center', marginTop: "10%"}}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Привет
      </Typography>
      <Typography variant="body1" component="div" sx={{ mb: 2 }}>
        Этот проект создан для того, чтобы помочь вам и вашим друзьям узнать,
        что вы хотите на подарок.
      </Typography>
      <Typography variant="body1" component="div" sx={{ mb: 2 }}>
        Вы можете создать свой вишлист и поделиться ссылкой на него с
      </Typography>
    </Box>
  );
}
