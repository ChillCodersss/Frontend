import { Box, TextField } from "@mui/material";
import InputBox from "../common/inputbox";

interface Probs {
    isMobile: boolean;
    gridRow: { m: string; d: string };
    gridColumn: { m: string; d: string };
    itemType: string;
    children: [
        string,     // label
        string,     // value
        string,     // name
        string,     // type
        string,     // palceholder
        string,     // direction
        string,     // height
        (event: React.ChangeEvent<HTMLInputElement>) => void
    ];
}

function FormItem({ isMobile, gridRow, gridColumn, itemType, children }: Probs) {
    const description_label_sx = {
        display: "block",
        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
        fontWeight: "500",
        marginBottom: "7px",
        marginRight: "5px",
        color: "black",
        textAlign: "right",
        direction: "rtl",
    };

    if (itemType === "i") { // itemTypes -> i: input box, d: drop down, t: text field
        return (
            <Box sx={isMobile ? { gridRow: gridRow.m, gridColumn: gridColumn.m } : { gridRow: gridRow.d, gridColumn: gridColumn.d }}>
                <InputBox
                    label={ children[0] }
                    name={ children[2] }
                    value={ children[1] }
                    onChange={ children[7] }
                    type={ children[3] }
                    placeholder={ children[4] }
                    direction={ children[5] == "ltr" ? "ltr" : "rtl" }
                    height={ children[6] }
                />
            </Box>
        )
    }
    else if (itemType === "t") {
        return (
            <Box sx={isMobile ? { gridRow: gridRow.m, gridColumn: gridColumn.m } : { gridRow: gridRow.d, gridColumn: gridColumn.d }}>
                <Box component="label" sx={ description_label_sx }>
                    { children[0] }
                </Box>
                <TextField
                    name={ children[2] }
                    value={ children[1] }
                    onChange={ children[7] }
                    multiline
                    rows={isMobile ? 4 : 6}
                    fullWidth
                    variant="outlined"
                    margin="none"
                    sx={{
                    "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                        borderRadius: { xs: "6px", sm: "8px", md: "8px" },
                        transition: "border-color 0.3s ease",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgb(204, 207, 209)",
                        borderWidth: "2px",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#1976d2",
                        borderWidth: "2.3px",
                        },
                    },
                    "& .MuiOutlinedInput-input": {
                        textAlign: "right",
                        direction: "rtl",
                    },
                    }}
                />
            </Box>
        )
    }
}

export default FormItem;