import { Autocomplete, TextField, Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";

interface Probs {
    label: string;
    palceholder: string;
    value: string;
    inputValue: string;
    options: string[];
    optionsLoading: boolean;
    changeHandler: (input: string | null) => void;
    inputHandler: (input: string) => void;
};

function DropDown({ label, palceholder, value, inputValue, options, optionsLoading, changeHandler, inputHandler }: Probs) {
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
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    changeHandler(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    inputHandler(newInputValue);
                }}
                options={options}
                loading={optionsLoading}
                freeSolo
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        variant="outlined"
                        placeholder={palceholder}
                        sx={{
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "white",
                            borderRadius: "8px",
                            height: "43px",
                            padding: "8px 40px 8px 14px !important",
                            "& .MuiOutlinedInput-input": {
                            textAlign: "right",
                            direction: "rtl",
                            height: "19px",
                            "&::placeholder": {
                                opacity: 0,
                                transition: "opacity 0.2s ease-in-out",
                            },
                            },
                            "&:hover .MuiOutlinedInput-input::placeholder": {
                            opacity: 0.5,
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgb(204, 207, 209)",
                            borderWidth: "2px",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                                borderColor: "#1976d2",
                                borderWidth: "2.3px",
                            },
                        },
                        }}
                    />
                )}
                popupIcon={<ArrowDropDownIcon />}
                clearIcon={<CloseIcon />}
                forcePopupIcon={true}
                sx={{
                    "& .MuiAutocomplete-endAdornment": {
                        left: 0,
                        right: "auto",
                        display: "flex",
                        flexDirection: "row",
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        height: "100%",
                        alignItems: "center",
                    },
                    "& .MuiAutocomplete-clearIndicator": {
                        position: "absolute",
                        right: "0px",
                        padding: "2px",
                        paddingLeft: "0px",
                    },
                    "& .MuiAutocomplete-popupIndicator": {
                        position: "absolute",
                        left: "8px",
                        padding: "2px",
                    },
                }}
                slotProps={{
                    popper: {
                        sx: {
                            "& .MuiPaper-root": {
                                direction: "rtl",
                                textAlign: "right",
                            },
                            "& .MuiAutocomplete-listbox": {
                                direction: "rtl",
                                textAlign: "right",
                            },
                            "& .MuiAutocomplete-option": {
                                direction: "rtl",
                                textAlign: "right",
                                padding: "8px 16px",
                            },
                        },
                    },
                }}
            />
        </>
    )
}

export default DropDown;