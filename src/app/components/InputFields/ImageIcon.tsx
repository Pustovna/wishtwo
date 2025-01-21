import { IconButton, Tooltip, FilledInput } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

interface ImageIconProps {
  tipText: string;
  handleClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;

}

const ImageIcon: React.FC<ImageIconProps> = ({ tipText, handleClick, id }) => {
  return (
    <Tooltip title={tipText} aria-label={tipText}>
        <FilledInput type="file" aria-label={tipText} onChange={handleClick} />
       
    </Tooltip>
  );
};

export default ImageIcon;
