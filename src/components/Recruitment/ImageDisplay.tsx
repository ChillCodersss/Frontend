import { Box, Typography, Divider } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

interface Probs {
    isMobile: boolean;
    imageName: string;
    imageSize: string;
    imageSrc: string;
    clearOnClick: (event: React.MouseEvent<SVGSVGElement>) => void;
}

function ImageDisplay({ isMobile, imageSize, imageSrc, clearOnClick }: Probs) {
    return (
        <>
            <Box
                height={"100%"}
                width={"100%"}
                sx={{
                    border: "1px dashed gray",
                    borderStyle: "solid",
                    borderRadius: { xs: "6px", sm: "8px", md: "8px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    bgcolor: "white",
                    "&:hover": {
                        borderLeftWidth: "4px"
                    }
                }}
            >
                <Box
                    sx={{
                        height: "90%",
                        overflow: "hidden",
                        padding: "5px",
                    }}
                >
                    <img
                        src={imageSrc}
                        style={{
                            maxHeight: "100%",
                            aspectRatio: "auto",
                            borderRadius: "6px",
                        }}
                    />
                </Box>
                <Divider orientation="vertical" flexItem />
                {/* <Typography color="gray" fontSize={ isMobile ? 13 : 16 } variant="caption">{imageName}</Typography>
                <Divider orientation="vertical" flexItem /> */}
                <Typography color="gray" fontSize={ isMobile ? 13 : 16 } variant="caption">{imageSize}</Typography>
                <Divider orientation="vertical" flexItem />
                <ClearIcon
                    fontSize={ isMobile ? "small" : "large" }
                    onClick={clearOnClick}
                    sx={{
                        color: "gray",
                        "&:hover": {
                            color: "black"
                        }
                    }}
                />
            </Box>
        </>
    )
}

export default ImageDisplay;