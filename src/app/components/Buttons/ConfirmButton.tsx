import { IconButton, Tooltip } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

interface ConfirmButtom {
    tipText: string;
    handleClick?: (data: any) => void | undefined;
    type?: "button" | "submit" | "reset" | undefined;
}

const  ConfirmButtom: React.FC<ConfirmButtom> = ({tipText, handleClick, type}) => {
  return (
    <Tooltip title={tipText} aria-label={tipText}>
      <IconButton type={type} onClick={handleClick} color="primary">
        <CheckIcon />
      </IconButton>
    </Tooltip>
  );
}

export default ConfirmButtom;