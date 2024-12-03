import { styled } from "@mui/material/styles";
import theme from "@/theme";

export const text = styled("span")<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? theme.palette.primary.main : theme.palette.text.secondary)};
`;
