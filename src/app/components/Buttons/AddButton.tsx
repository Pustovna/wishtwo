import { IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddButtonProps {
    tipText: string;
    handleClick?: () => void | undefined;
}

const  AddButton: React.FC<AddButtonProps> = ({tipText, handleClick}) => {
  return (
    <Tooltip title={tipText} aria-label={tipText}>
      <IconButton onClick={handleClick} color="primary">
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
}

export default AddButton;