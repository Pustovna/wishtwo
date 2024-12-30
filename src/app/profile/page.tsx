import CreateAcc from "./CreateAcc";
import { auth } from "@/auth";
import { Container, Typography } from "@mui/material";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";

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

      <CreateAcc />
    </Container>
  );
};

export default Profile;
