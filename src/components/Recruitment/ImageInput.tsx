import { Input } from "@mui/material";

interface Probs {
    value: string;
    onChange: () => void;
}

function ImageInput({ value, onChange } : Probs) {
    return (
        <>
            <Input
                type="file"
                fullWidth
                name="StudentCardPic"
                value={value}
                onChange={onChange}
            >
            </Input>
        </>
    )
}

export default ImageInput;