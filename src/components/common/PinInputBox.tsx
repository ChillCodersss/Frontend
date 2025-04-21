import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface PinInputProps {
  length?: number;
  inputSize?: number;
  boxGap?: string;
  onChange?: (pin: string) => void;
}

const PinInput: React.FC<PinInputProps> = ({
  length = 6,
  inputSize = 56,
  boxGap = "2px",
  onChange,
}) => {
  const [pins, setPins] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // update parent component whenever pins change
  useEffect(() => {
    onChange?.(pins.join(""));
  }, [pins, onChange]);

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]*$/.test(value)) {
      // only allow numbers
      const newPins = [...pins];
      newPins[index] = value;
      setPins(newPins);

      // auto-focus next input if a number was entered
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      // if current field is empty, move to previous field on backspace
      if (!pins[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").replace(/\D/g, ""); // get only numbers
    const newPins = [...pins];

    const startIndex = inputRefs.current.findIndex(
      (ref) => ref === e.currentTarget
    );
    if (startIndex === -1) return;

    for (let i = 0; i < pasteData.length && startIndex + i < length; i++) {
      newPins[startIndex + i] = pasteData[i];
    }

    setPins(newPins);

    const lastFilledIndex = Math.min(
      startIndex + pasteData.length - 1,
      length - 1
    );
    inputRefs.current[lastFilledIndex]?.focus();
  };

  return (
    <Box display="flex" gap={boxGap}>
      {pins.map((pin, index) => (
        <TextField
          key={index}
          inputRef={(el) => (inputRefs.current[index] = el)}
          value={pin}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          inputProps={{
            maxLength: 1,
            style: { textAlign: "center", fontSize: `${inputSize * 0.35}px` },
          }}
          variant="outlined"
          sx={{ width: `${inputSize}px`, height: `${inputSize}px` }}
        />
      ))}
    </Box>
  );
};

export default PinInput;
