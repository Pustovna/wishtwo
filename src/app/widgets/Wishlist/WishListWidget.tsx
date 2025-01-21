"use client";
import React from "react";
import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Typography,
  IconButton,
  Tooltip,
  Paper,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Slide,
} from "@mui/material";
import DataGridDemo from "./components/EditTable/EditTable";
import TableWish from "./components/Table";
import EditIcon from "@mui/icons-material/Edit";
import { TransitionProps } from "@mui/material/transitions";
import AddButton from "../../components/Buttons/AddButton";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WishListWidget: React.FC = ({ wishes }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <AddButton tipText={"Add new wish"} />
      <Tooltip title="Edit wish list" aria-label="edit">
        <IconButton color="primary" onClick={handleOpen}>
          <EditIcon />
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
          <DataGridDemo wishes={wishes}/>
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
