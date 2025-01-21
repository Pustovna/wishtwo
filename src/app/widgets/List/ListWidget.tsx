"use client";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WishListWidget from "../Wishlist/WishListWidget";
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid2";
import { getWishList } from "@/app/actions/userActions";
import { useSession } from "next-auth/react";

export default function List() {
  const { data: session } = useSession();
  const [wishLists, setWishLists] = React.useState([]);

  React.useEffect(() => {
    const fetchWishList = async () => {
      try {
        if (!session?.user?.id) return;
        const wishList = await getWishList(session?.user?.id, session?.token);
        console.log(wishList);
        if (wishList.status === "success") {
          setWishLists(wishList.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchWishList();
  }, [session]);

  return (
    <Grid sx={{ marginTop: "20px" }} container spacing={2}>
      {wishLists.map((wishList) => {
        return (
          <Grid key={wishList.id} container spacing={12}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span" color="grey.600">
                  {wishList.attributes.title}                  
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <WishListWidget wishes={wishList}/>
              </AccordionDetails>
            </Accordion>
            <IconButton color="secondary">
              <ShareIcon />
            </IconButton>
            <IconButton color="secondary">
              <DeleteIcon />
            </IconButton>
          </Grid>
        );
      })}

      
    </Grid>
  );
}
