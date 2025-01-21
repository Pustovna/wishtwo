import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteButtonProps {
  tipText: string;
  handleDelete: (data?: any) => void | undefined;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ tipText, handleDelete }) => {
  return (
    <Tooltip title={tipText} aria-label="delete">
      <IconButton onClick={(data) => handleDelete(data)}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteButton;
