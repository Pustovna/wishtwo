import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import "./Loader.scss";

export function LoaderHorse() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"40px"}
      minHeight={"200px"}
    >
      <Image
        className="loaderHorse_image"
        src={"/loader/adventure-time-horse.gif"}
        width={100}
        height={70}
        alt="Loader"
      />
      <Typography color="black">Wait... We are making a magic</Typography>
    </Box>
  );
}

export function LoaderCircle() {
  return <span className="loader_circle"></span>;
}

export function LoaderText({ text }: { text: string }) {
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <span className="loader_text">{text}</span>
    </Box>
  );
}

export default { LoaderCircle, LoaderHorse, LoaderText };
