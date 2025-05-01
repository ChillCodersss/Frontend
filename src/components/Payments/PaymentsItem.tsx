import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import {
  paymentsItemStyles,
  paymentsItemBoxStyles,
  paymentsItemBoxMdStyles,
  paymentsItemBoxEndStyles,
} from "./PaymentsItemStyle";

interface PaymentsItemProps {
  date: string;
  amount: number;
  payTo: string;
  description: string;
}

const PaymentsItem: React.FC<PaymentsItemProps> = ({
  date,
  amount,
  payTo,
  description,
}) => {
  return (
    <Box sx={paymentsItemStyles}>
      <Box sx={paymentsItemBoxStyles}>
        <Typography variant="h2" display="inline" color="rgb(0, 0, 0)">
          `{amount}`
        </Typography>
        <Divider sx={{ width: "80%", backgroundColor: "rgb(157, 157, 157)" }} />
        <Typography variant="h3" display="inline" color="rgb(0, 0, 0)">
          "تومان"
        </Typography>
        <Typography variant="h3" color="rgb(89, 89, 89)">
          `{date}`
        </Typography>
        <Typography variant="h3" color="rgb(89, 89, 89)">
          `در وجه:{payTo}`
        </Typography>
        <Typography variant="h4" color="rgb(89, 89, 89)">
          `{description}`
        </Typography>
      </Box>

      <Box sx={paymentsItemBoxMdStyles}>
        <Typography variant="h2" color="rgb(0, 0, 0)">
          `{amount} تومان`
        </Typography>
        <Typography variant="h3" color="rgb(89, 89, 89)">
          `در وجه:{payTo}`
        </Typography>
        <Typography variant="h4" color="rgb(89, 89, 89)">
          `{description}`
        </Typography>
      </Box>

      <Box sx={paymentsItemBoxEndStyles}>
        <Typography variant="h3" color="rgb(89, 89, 89)">
          `{date}`
        </Typography>
      </Box>
    </Box>
  );
};

export default PaymentsItem;
