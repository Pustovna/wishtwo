"use client";
import React from "react";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  Badge,
} from "@mui/material";
import DataGridDemo from "./components/EditTable/EditTable";
import TableWish from "./components/Table";
import EditIcon from "@mui/icons-material/Edit";
import { TransitionProps } from "@mui/material/transitions";
import AddButton from "../../components/Buttons/AddButton";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import NewItem from "./components/NewWishList/NewItem";
import { Wish } from "@/types";
import { updateWishList } from "@/app/actions/userActions";
import { useSession } from "next-auth/react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface WishListWidgetProps {
  wishes: any[];
  setDeletedWishList: React.Dispatch<React.SetStateAction<string | null>>;
}

const WishListWidget: React.FC<WishListWidgetProps> = ({
  wishes,
  setDeletedWishList,
}) => {
  // const [open, setOpen] = React.useState(false);
  // const [copied, setCopied] = React.useState(false);
  // const [deleting, setDeleting] = React.useState(false);
  const [states, setStates] = React.useState({
    open: false,
    copied: false,
    addNewItem: false,
  });
  const [newWish, setNewWish] = React.useState<Wish[]>([]);
  const { data: session } = useSession();
  // const handleOpen = () => setStates((prev) => ({...prev, open: !prev.open}));
  // const handleClose = () => setStates((prev) => ({...prev, open: false}));

  const handleCopy = async (wishListLink: string) => {
    try {
      await navigator.clipboard.writeText(wishListLink);
      setStates((prev) => ({ ...prev, copied: true }));
      setTimeout(() => setStates((prev) => ({ ...prev, copied: false })), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const sendWish = async () => {
    const allWishes = [...wishes.attributes.wishes, ...newWish];
    const response = await updateWishList(wishes.id, session?.token, allWishes); // Replace arg1, arg2, arg3 with the actual arguments you need to pass to the function.
    console.log(response);
    return response;
  };

  React.useEffect(() => {
    if (newWish.some((wish) => wish.title?.length > 2)) {
      const handleSendWish = async () => {
        try {
          const response = await sendWish();
          if (response && response.status === "success") {
            console.log(response.data);
            setStates((prev) => ({ ...prev, addNewItem: false }));
          } else {
            console.log(response.error);
          }
        } catch (error) {
          console.log(error);
        }
      };
      setNewWish([]); // Сбросить newWish после обработки

      handleSendWish();
    }
  }, [newWish]);

  const handleAdd = () => {
    setStates((prev) => ({ ...prev, addNewItem: !states.addNewItem }));
  };

  return (
    <div>
      <AddButton tipText={"Add new wish"} handleClick={handleAdd} />
      {/* <Tooltip title="Edit wish list" aria-label="edit">
        <IconButton color="primary" onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip> */}
      <Tooltip title="Copy link" aria-label="share">
        <Badge
          badgeContent={"Copied!"}
          color="primary"
          invisible={!states.copied}
        >
          <IconButton
            color="primary"
            onClick={() =>
              handleCopy(
                `${process.env.NEXT_PUBLIC_DOMAIN}/wishlist/${wishes.attributes.link}`
              )
            }
          >
            <ShareIcon />
          </IconButton>
        </Badge>
      </Tooltip>
      <Tooltip title="Delete this wish list" aria-label="delete">
        <IconButton
          color="primary"
          onClick={() => setDeletedWishList(wishes.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      {/* <Dialog
        open={states.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="edit-wish-list"
      >
        <DialogContent>
          <DataGridDemo wishes={wishes} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog> */}
      {/* <Modal
      
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box>
           
          </Box>
        </Fade>
      </Modal> */}
      {states.addNewItem && (
        <NewItem setOpenNewWish={handleAdd} setWish={setNewWish}></NewItem>
      )}
      <TableWish wishes={wishes} />
    </div>
  );
};

export default WishListWidget;
