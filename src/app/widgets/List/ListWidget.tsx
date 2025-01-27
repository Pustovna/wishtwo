"use client";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WishListWidget from "../Wishlist/WishListWidget";

import Grid from "@mui/material/Grid2";
import { deleteWishList, getWishList } from "@/app/actions/userActions";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { ActionResult } from "@/types";

interface ListProps {
  isNewWishes: boolean;
  setIsNewWishes: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function List({ isNewWishes, setIsNewWishes }: ListProps) {
  const { data: session } = useSession();
  const [wishLists, setWishLists] = React.useState([] as any[]);
  const [deletedWishList, setDeletedWishList] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    const fetchWishList = async () => {
      try {
        if (!session?.user?.id) return;
        const wishListData: ActionResult<{ data: any[] }> = await getWishList(
          session?.user?.id,
          session?.token
        );

        if (wishListData && wishListData.status === "success") {
          console.log(wishListData);
          setWishLists(wishListData.data.data);
        } else {
          toast.error(wishListData.error as string);
        }
      } catch (error) {
        toast.error(error as string);
        console.error(error);
      }
    };

    fetchWishList();
    return () => {
      setIsNewWishes(false);
    };
  }, [isNewWishes]);

  React.useEffect(() => {
    if (deletedWishList !== null && session) {
      const handleDeleteWishlist = async () => {
        try {
          const deleteWishes = await deleteWishList(
            deletedWishList,
            session.token
          );

          if (deleteWishes && deleteWishes.status === "success") {
            const newList = wishLists.filter(
              (wish) => String(wish.id) !== String(deletedWishList)
            );

            setWishLists(newList);
          }
          if (deleteWishes && deleteWishes.status === "error") {
            console.log("error from fetch");
            toast.error(String(deleteWishes.error));
          }
        } catch (error) {
          toast.error(error as string);
        }
      };

      handleDeleteWishlist();
      return () => {
        setDeletedWishList(null);
      };
    }
  }, [deletedWishList]);

  return (
    <Grid sx={{ marginTop: "20px" }} container spacing={2}>
      {wishLists.map((wishList) => {
        return (
          <Grid key={wishList.id} size={{ xs: 12 }}>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h4" component="span" color="grey.600">
                  {wishList.attributes.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <WishListWidget
                  wishes={wishList}
                  setDeletedWishList={setDeletedWishList}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
        );
      })}
    </Grid>
  );
}
