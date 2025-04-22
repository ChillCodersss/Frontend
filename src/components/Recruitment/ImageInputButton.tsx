import { Button } from "@mui/material";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

interface Probs {
    name: string;
}

function ImageInputButton({ name } : Probs) {
    return (
        <>
            <Button
                disableRipple
                disableElevation
                disableFocusRipple
                variant="outlined"
                size="large"
                endIcon={<DriveFolderUploadIcon fontSize="inherit"/>}
                sx={{
                    borderRadius: { xs: "6px", sm: "8px", md: "8px" },
                    border: "2px dashed rgb(204, 207, 209)",
                    color: "gray",
                    "&:hover, &.Mui-focusVisible": {
                        borderStyle: "solid",
                    },
                }}
            > 
                { name } 
            </Button>
        </>
    )
}

export default ImageInputButton;