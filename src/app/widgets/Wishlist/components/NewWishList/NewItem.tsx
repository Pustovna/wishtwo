import ConfirmButtom from "@/app/components/Buttons/ConfirmButton";
import {
  Box,
  FilledInput,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import { ItemSchema, itemSchema } from "@/lib/schemas/ItemSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadFile } from "@/app/actions/userActions";
import { Wish } from "@/types";
import { Session } from "next-auth";
import { Dispatch, SetStateAction, useState } from "react";
import { LoaderCircle } from "@/app/components/Loader/Loader";

interface NewItemProps {
  setWish: Dispatch<SetStateAction<Wish[]>>;
  wish: Wish[];
  setOpenNewWish: (option: boolean) => void;
  session: Session | null;
}

const fieldStyle = {
  color: "black",
};

export default function NewItem({
  setWish,
  wish,
  setOpenNewWish,
  session,
}: NewItemProps) {
  const [loader, setLoader] = useState(false);
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target) return;
    if (!e.target.files) return;
    const file = e.target.files[0];
    setValue("image", file);
    // setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleConfirm = async () => {
    const { name, link, price, comment, image } = currentValues;

    let documentID = undefined;
    setLoader(true);

    if (image && typeof image !== "string" && session?.token) {
      try {
        const response = await uploadFile(image, session?.token);
        if (response.status === "error") {
        } else {
          documentID = response.data[0]?.id;
          console.log(documentID);
        }
      } catch (error) {
        setLoader(false);
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
    setLoader(false);
    setOpenNewWish(false);
    reset(
      { name: "", link: "", price: "", comment: "", image: "" },
      { keepValues: false }
    );
  };

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      <form onSubmit={handleSubmit(handleConfirm)}>
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
          <FormHelperText id="link">{errors?.link?.message}</FormHelperText>
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
          <FormHelperText id="price">{errors.price?.message}</FormHelperText>
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
          <FormHelperText id="image">{errors.image?.message}</FormHelperText>
        </FormControl>

        {loader ? (
          <LoaderCircle />
        ) : (
          <ConfirmButtom
            type={"submit"}
            tipText={"Confirm"}
            //   handleClick={handleConfirm}
          />
        )}

        {/* <ConfirmButtom tipText={"Confirm"} handleClick={handleConfirm} /> */}
      </form>
    </Box>
  );
}
