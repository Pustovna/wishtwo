"use client";
import AddButton from "@/app/components/Buttons/AddButton";
import ConfirmButtom from "@/app/components/Buttons/ConfirmButton";
import ImageIcon from "@/app/components/InputFields/ImageIcon";
import {
  Box,
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import * as React from "react";
import { set } from "zod";
import * as S from "./NewWishList.style";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ItemSchema, itemSchema } from "@/lib/schemas/ItemSchema";
import DeleteButton from "@/app/components/Buttons/DeleteButton";
import { useSession } from "next-auth/react";
import { createWishList, uploadFile} from "@/app/actions/userActions";
import { Wish, Wishlist } from "@/types";
import { stat } from "fs";

interface NewWith {
  name: string;
  link: string;
  price: string;
  comment: string;
  image: string | File | undefined;
  id: number;
}

const fieldStyle = {
  color: "black",
};

export default function NewWishList() {
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target) return;
    if (!e.target.files) return;
    const file = e.target.files[0];
    setValue("image", file);
    // setFile(URL.createObjectURL(e.target.files[0]));
  }

  const onSubmit = (data: ItemSchema) => {
    console.log(data);
  };
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
          <Box display="flex" flexDirection="row" flexWrap="wrap">
            <FormControl
              //    error={!!errors.email}
              variant="outlined"
            >
              <InputLabel htmlFor="name">Item</InputLabel>
              <Input
                id="name"
                aria-describedby="name"
                sx={fieldStyle}
                {...register("name")}
              />
              <FormHelperText id="name">{errors.name?.message}</FormHelperText>
            </FormControl>
            <FormControl
              //    error={!!errors.email}
              variant="outlined"
            >
              <InputLabel htmlFor="link">Link</InputLabel>
              <Input
                id="link"
                aria-describedby="link"
                sx={fieldStyle}
                {...register("link")}
              />
              <FormHelperText id="link">{errors.link?.message}</FormHelperText>
            </FormControl>
            <FormControl
              //    error={!!errors.email}
              variant="outlined"
            >
              <InputLabel htmlFor="price">Price</InputLabel>
              <Input
                id="price"
                aria-describedby="price"
                sx={fieldStyle}
                {...register("price")}
              />
              <FormHelperText id="price">
                {errors.price?.message}
              </FormHelperText>
            </FormControl>
            <FormControl
              //    error={!!errors.email}
              variant="outlined"
            >
              <InputLabel htmlFor="comment">Comment</InputLabel>
              <Input
                id="comment"
                aria-describedby="comment"
                sx={fieldStyle}
                {...register("comment")}
              />
              <FormHelperText id="comment">
                {errors.comment?.message}
              </FormHelperText>
            </FormControl>
            <FormControl
              //    error={!!errors.email}
              variant="outlined"
            >
              <FilledInput
                type="file"
                aria-label="Add image"
                id="image"
                onChange={handleChange}
                // {...register("image")}
              />
              <FormHelperText id="image">
                {errors.image?.message}
              </FormHelperText>
            </FormControl>

            <ConfirmButtom
              type={"submit"}
              tipText={"Confirm"}
              //   handleClick={handleConfirm}
            />

            {/* <ConfirmButtom tipText={"Confirm"} handleClick={handleConfirm} /> */}
          </Box>
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
    </Box>
  );
}
