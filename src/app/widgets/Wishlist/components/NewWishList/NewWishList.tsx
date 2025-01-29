"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWishList } from "@/app/actions/userActions";

import { Wish, Wishlist } from "@/types";
import { wishListSchema, WishListSchema } from "@/lib/schemas/WishListSchema";

import NewItem from "./NewItem";
import AddButton from "@/app/components/Buttons/AddButton";
import { Box, Button } from "@mui/material";
import * as S from "./NewWishList.style";
import DeleteButton from "@/app/components/Buttons/DeleteButton";
import { LoaderText } from "@/app/components/Loader/Loader";
import { toast } from "react-toastify";

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
  setIsNewWishes: React.Dispatch<React.SetStateAction<boolean>>;
}

export const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 15);
};
 
export default function NewWishList({ handleClose, setIsNewWishes }: NewWishListProps ) {
  const [wish, setWish] = React.useState<Wish[]>([]);
  const [openNewWish, setOpenNewWish] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const { data: session } = useSession();
  const {
    register,
    reset,
    watch,
    setValue,
    formState: { isValid, errors },
  } = useForm<WishListSchema>({
    resolver: zodResolver(wishListSchema),
    mode: "onChange",
  });

  const currentValues = watch();

  const handleAddWish = () => {
    setOpenNewWish(!openNewWish);
    console.log(wish);
  };

  const sendData = async () => {
    if (!session || !session.user?.id) return;
    setLoader(true);

    const wishList: Wishlist = {
      account: session.user.id,
      title: currentValues.title,
      wishes: wish,
      link: generateRandomId(),
    };
    try {
      const create = await createWishList(wishList, session.token);
      if (create.status === "success") {
        setIsNewWishes(true);
        setLoader(false);
        setWish([]);
        reset({ title: "" }, { keepValues: false });
        handleClose();
      } else {
        setLoader(false);
        toast.error(create.error as string);
      }
    } catch (error) {
      setLoader(false);
      console.error(error);
      toast.error(error as string);
    }
  };

  const deleteWish = (id: number) => {
    setWish(wish.filter((w) => w.id !== id));
  };

  const handleCancel = () => {
    setWish([]);
    reset({ title: "" }, { keepValues: false });
    handleClose();
  };

  return (
    <Box minWidth={500} maxWidth={500} margin="auto">
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
      {loader ? (
        <LoaderText text="Wait, we are making magic"></LoaderText>
      ) : (
        <>
          <AddButton tipText={"Add new wish"} handleClick={handleAddWish} />
          {openNewWish && (
            <NewItem
              setWish={setWish}

              setOpenNewWish={setOpenNewWish}
              session={session}
            />
          )}

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
        </>
      )}

      <Box display="flex" gap="20px">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
          onClick={sendData}
          disabled={!isValid}
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
