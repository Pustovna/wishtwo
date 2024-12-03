import { Suspense } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import AboutProjectWidget from "@/app/widgets/AboutProject/AboutProjectWidget";
import { Button } from "@mui/material";


export default async function Home() {
  let data = await fetch("http://localhost:1337/api/goods/1");
  let posts = await data.json();


  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AboutProjectWidget />


        <Link href="/about" color="secondary" component={NextLink}>
          <Button variant="contained" color="primary">
            Создать свой вишлист
          </Button>
        </Link>

        <Suspense fallback={<div>Loading...</div>}>
          {!data.ok ? (
            <div>Failed to load</div>
          ) : (
            <ul>
              <li key={posts.id}>{posts.title}</li>
            </ul>
          )}
        </Suspense>
        {/* <ProTip /> */}
        {/* <Copyright /> */}
      </Box>
    </Container>
  );
}
