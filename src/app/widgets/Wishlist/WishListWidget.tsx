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
import Link from "next/link";


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
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleCopy = async (wishListLink: string) => {
    try {
        await navigator.clipboard.writeText(wishListLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
};

  return (
    <div>
      <AddButton tipText={"Add new wish"} />
      <Tooltip title="Edit wish list" aria-label="edit">
        <IconButton color="primary" onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Copy link" aria-label="share">
      <Badge badgeContent={'Copied!'} color="primary" invisible={!copied}>
        <IconButton color="primary" onClick={() => handleCopy(`${process.env.NEXT_PUBLIC_DOMAIN}/wishlist/${wishes.attributes.link}`)}>
          <ShareIcon />
        </IconButton>
        </Badge>
      </Tooltip>
      <Tooltip title="Delete this wish list" aria-label="delete">
        <IconButton color="primary" onClick={() => setDeletedWishList(wishes.id)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
   

      <Dialog
        open={open}
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
      </Dialog>
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

      <TableWish wishes={wishes} />
    </div>
  );
};

export default WishListWidget;
