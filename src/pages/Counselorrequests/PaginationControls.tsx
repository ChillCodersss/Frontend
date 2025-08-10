import React from 'react';
import { Pagination } from '@mui/material';
import { styles } from './styles';

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  isSmallScreen: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  totalPages,
  currentPage,
  handlePageChange,
  isSmallScreen,
}) => {
  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
      dir="rtl"
      size={isSmallScreen ? 'medium' : 'large'}
      sx={styles.pagination}
    />
  );
};

export default PaginationControls;