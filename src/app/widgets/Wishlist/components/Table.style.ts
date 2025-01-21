import { styled, TableCell  } from "@mui/material";

import theme from "@/theme";

export const Cell = styled(TableCell)`
  margin-top: ${theme.spacing(2)};
  color: ${theme.palette.text.secondary};
`;