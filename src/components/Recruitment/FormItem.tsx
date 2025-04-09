import { Box } from "@mui/material";
import InputBox from "../common/inputbox";

interface Probs {
    isMobile: Boolean;
    gridRow: { m: string; d: string };
    gridColumn: { m: string; d: string };
    itemType: string;
    children: [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        (event: React.ChangeEvent<HTMLInputElement>) => void
    ];
}

function FormItem({ isMobile, gridRow, gridColumn, itemType, children }: Probs) {
    if (itemType === "i") {
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
}

export default FormItem;