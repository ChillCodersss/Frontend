import { Box } from "@mui/material";
import ImageDisplay from "./ImageDisplay";
import ImageInputButton from "./ImageInputButton";

interface Probs {
    label: string;
    isMobile: boolean;
    uploaded: boolean;
    imageName: string;
    imageSize: string;
    imageURL: string;
    inputName: string;
    inputID: string;
    handleImageDelete: (event: React.MouseEvent<SVGSVGElement>) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function ImageInput({ 
        label, isMobile, uploaded, imageName, inputName, inputID,
        imageSize, imageURL, handleImageDelete, onChange 
    } : Probs) {
    const label_sx = {
        display: "block",
        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
        fontWeight: "500",
        marginBottom: "7px",
        marginRight: "5px",
        color: "black",
        textAlign: "right",
        direction: "rtl",
    };

    return (
        <>
            <Box component="label" sx={ label_sx }>
                { label }
            </Box>
            <Box
                height={"75%"}
                maxHeight={isMobile ? "120px" : "170px"}
                boxSizing={"border-box"}
                onClick={() => {
                    document.getElementById(inputID)?.click();
                }}
                sx={{
                    cursor: "pointer",
                    borderRadius: { xs: "6px", sm: "8px", md: "8px" },
                    border: "1px dashed gray",
                    backgroundColor: "#FFFFFF80",
                    transition: "border-color 0.3s ease",
                    display: "flex",
                    padding: "10px",
                    "&:hover": {
                        // bgcolor: "white",
                        // borderColor: "rgb(204, 207, 209)",
                        borderWidth: uploaded ? "1px" : "2px",
                    },
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                { uploaded ?
                    <ImageDisplay
                        isMobile={isMobile}
                        imageName={imageName}
                        imageSize={imageSize}
                        imageSrc={imageURL}
                        clearOnClick={handleImageDelete}
                    />
                    :
                    <ImageInputButton 
                        name="آپلود عکس"
                    />
                }
            </Box>
            <input
                type="file"
                accept="image/*"
                id={inputID}
                name={inputName}
                onChange={onChange}
                hidden={true}
            />
        </>
    )
}

export default ImageInput;