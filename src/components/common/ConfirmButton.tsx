import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import Box from '@mui/material/Box';

interface ConfirmButtonProps extends ButtonProps {
  name: string;
}

function ConfirmButton({ name, ...props }: ConfirmButtonProps) {
  return (
    <Box sx={{ width: '100%', maxWidth: { xs: "100%", sm: "500px", md: "700px", lg: "900px" }}}>
      <Button
        variant="contained"
        sx={{
          borderRadius: '12px', // Consistent border radius
          color: 'white',
          paddingLeft: "4px",
          backgroundColor: '# 057abe',
          width: '100%', // Full width of the parent container
          padding: { xs: '8px 16px', sm: '10px 20px', md: '12px 24px' }, // Responsive padding
          fontSize: { xs: '14px', sm: '16px', md: '18px' }, // Responsive font size
          height: '32px', // Responsive height
          '&:hover': {
            backgroundColor: ' #0A155C', // Darker shade for hover
          },
          '&:active': {
            backgroundColor: ' #070F3D', // Even darker shade for active state
          },
        }}
        {...props}
      >
        {name}
      </Button>
    </Box>
  );
}

export default ConfirmButton;