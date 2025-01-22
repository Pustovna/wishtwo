import ConfirmButtom from "@/app/components/Buttons/ConfirmButton";
import { Box, FilledInput, FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import { FieldError, UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";
import { ItemSchema } from "@/lib/schemas/ItemSchema";


interface NewItemProps {
    setValue: UseFormSetValue<ItemSchema>;
    register: UseFormRegister<ItemSchema>;
    errors: FieldErrors<ItemSchema>;
}

const fieldStyle = {
    color: "black",
  };

export default function NewItem({setValue, register, errors} : NewItemProps) {

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target) return;
        if (!e.target.files) return;
        const file = e.target.files[0];
        setValue("image", file);
        // setFile(URL.createObjectURL(e.target.files[0]));
      }

    return (
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
    )
}