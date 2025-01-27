import { auth } from "@/auth";
import { Container, Typography } from "@mui/material";
import ProfileWishListWidget from "../widgets/ProfileWishList/ProfileWishListWidget";

const Profile: React.FC = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <Container maxWidth="xl">
      <h1>Profile {user?.name}</h1>
      {/* <div>
        <AlternateEmailOutlinedIcon />
        <Typography variant="h6" color="grey.800">
          {user?.name}
        </Typography>
      </div> */}
      <Typography variant="h6" color="white.800">
        Your wishlists
      </Typography>
      <ProfileWishListWidget />
    </Container>
  );
};

export default Profile;
