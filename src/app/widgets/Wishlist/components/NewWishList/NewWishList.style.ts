import { styled, TextField as _TextField } from "@mui/material";

import theme from "@/theme";

export const TextField = styled(_TextField)`
  .MuiInputBase-root {
    color: ${theme.palette.text.secondary};
  }
 
  .MuiOutlinedInput-notchedOutline {
    border-color: ${theme.palette.text.primary};
    color: ${theme.palette.text.secondary};
  }
  .MuiFormHelperText-root {
    color: ${theme.palette.text.secondary};
  }
`

export const ImageWish = styled("img")`
  height: 100%;
  max-height: 100px;
  max-width: auto;
  object-fit: cover;
  border-radius: 10px;
`