"use client";
import AddButton from "@/app/components/Buttons/AddButton";
import ConfirmButtom from "@/app/components/Buttons/ConfirmButton";
import ImageIcon from "@/app/components/InputFields/ImageIcon";
import {
  Box,
  Button,
} from "@mui/material";
import * as React from "react";
import * as S from "./NewWishList.style";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ItemSchema, itemSchema } from "@/lib/schemas/ItemSchema";
import DeleteButton from "@/app/components/Buttons/DeleteButton";
import { useSession } from "next-auth/react";
import { createWishList, uploadFile } from "@/app/actions/userActions";
import { Wish, Wishlist } from "@/types";
import NewItem from "./NewItem";


interface NewWith {
  name: string;
  link: string;
  price: string;
  comment: string;
  image: string | File | undefined;
  id: number;
}

interface NewWishListProps {
  handleClose: () => void;
}

export default function NewWishList({ handleClose }: NewWishListProps) {
  const [wish, setWish] = React.useState<Wish[]>([]);
  const [openNewWish, setOpenNewWish] = React.useState(false);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    reset,
    formState: { isValid, errors, isSubmitting },
  } = useForm<ItemSchema>({
    resolver: zodResolver(itemSchema),
    mode: "onChange",
  });
  const currentValues = watch();
  const { data: session } = useSession();

  const handleAddWish = () => {
    setOpenNewWish(!openNewWish);
  };

  const handleConfirm = async () => {
    const { name, link, price, comment, image } = currentValues;

    let documentID = undefined;

    if (image && typeof image !== "string" && session?.token) {
      try {
        const response = await uploadFile(image, session?.token);
        if (response.status === "error") {
        } else {
          documentID = response.data[0]?.id;
          console.log(documentID);
        }
      } catch (error) {
        console.error(error);
      }
    }

    setWish([
      ...wish,
      {
        title: name,
        link: link,
        price: price,
        description: comment,
        image: documentID,
        id: wish.length,
        imageObject: image,
      },
    ]);

    setOpenNewWish(false);
    reset(
      { name: "", link: "", price: "", comment: "", image: "" },
      { keepValues: false }
    );
  };

  const sendData = async () => {
    if (!session || !session.user?.id) return;

    const wishList: Wishlist = {
      account: session.user.id,
      title: currentValues.title,
      wishes: wish,
    };
    try {
      const create = await createWishList(wishList, session.token);
      console.log(create);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteWish = (id: number) => {
    setWish(wish.filter((w) => w.id !== id));
  };

  const handleCancel = () => {
    setValue("title", "")
    setWish([]); 
    handleClose();
  }

  return (
    <Box minWidth={500} maxWidth={500} margin="auto">
      <form onSubmit={handleSubmit(handleConfirm)}>
        <S.TextField
          label="title"
          variant="outlined"
          fullWidth
          margin="normal"
          focused
          error={!!errors.title}
          helperText={errors.title?.message}
          {...register("title")}
        />
        <AddButton tipText={"Add new wish"} handleClick={handleAddWish} />
        {openNewWish && (
          <NewItem setValue={setValue} register={register} errors={errors} />
        )}
      </form>

      {wish.length >= 0 &&
        wish.map((w, i) => {
          return (
            <Box
              sx={{
                color: "black",
                marginBottom: "20px",
                padding: "10px 0",
                borderBottom: "1px solid black",
              }}
              key={i}
              display="flex"
              flexDirection="row"
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <p>{w.title}</p>
              <p>{w.price}</p>
              <p>{w.link}</p>
              <p>{w.description}</p>
              {w.image && typeof w.image !== "string" && (
                <S.ImageWish
                  className="wish_image"
                  src={URL.createObjectURL(w.imageObject)}
                  alt="image"
                />
              )}
              <DeleteButton
                tipText={"Delete"}
                handleDelete={() => deleteWish(w.id)}
              />
            </Box>
          );
        })}

      <Box display="flex" gap="20px">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
          onClick={sendData}

          // disabled={!isValid}
        >
          Create
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
          onClick={handleCancel}
          // disabled={!isValid}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
