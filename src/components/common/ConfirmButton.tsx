import React, { ReactNode } from 'react';
import { Button, ButtonProps } from '@mui/material';
import Box from '@mui/material/Box';

interface ConfirmButtonProps extends ButtonProps {
  children: ReactNode;
}

function ConfirmButton({ children, ...props }: ConfirmButtonProps) {
  return (
    <Box sx={{ maxWidth: { xs: '100%', sm: '500px', md: '700px', lg: '900px' } }}>
      <Button
        variant="contained"
        sx={{
          borderRadius: { xs: '8px', sm: '10px', md: '12px' },
          color: 'white', 
          backgroundColor: '#0A155C',
          padding: 0,
          minWidth: { xs: '150px', sm: '200px', md: '250px' },
          fontSize: { xs: '12px', sm: '14px', md: '16px' },
          height: { xs: '50px', sm: '55px', md: '60px' },
          '&:hover': {
            backgroundColor: '#0A155C', // Darker shade for hover
          },
          '&:active': {
            backgroundColor: '#070F3D', // Even darker shade for active state
          },
        }}
        {...props}
      >
        {children}
      </Button>
    </Box>
  );
}

export default ConfirmButton;