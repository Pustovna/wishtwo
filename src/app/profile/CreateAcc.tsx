"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
} from "@mui/material";
import { useSession } from "next-auth/react";
import * as React from "react";
import { TransitionProps } from "@mui/material/transitions";
import DataGridDemo from "../widgets/Wishlist/components/EditTable/EditTable";
import NewWishList from "../widgets/Wishlist/components/NewWishList/NewWishList";

interface CreateWishProps { 
  setIsNewWishes: React.Dispatch<React.SetStateAction<boolean>>;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateWish({ setIsNewWishes } : CreateWishProps) {
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();

  const wishList = {
    account: session?.user?.id || "",
    title: "",
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      {session && (
        <div>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Создать вишлист
          </Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="edit-wish-list"
          >
            <DialogContent>
              <NewWishList handleClose={handleClose} setIsNewWishes={setIsNewWishes}/>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}
