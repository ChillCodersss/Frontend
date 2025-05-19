import React from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton, Tabs, Tab } from '@mui/material';
import { styles } from './styles';

interface FilterSectionProps {
  statusFilter: string;
  majorFilter: string;
  gradeFilter: string;
  handleStatusFilterChange: (event: React.SyntheticEvent, newFilter: string) => void;
  handleMajorFilterChange: (event: React.MouseEvent<HTMLElement>, newFilter: string) => void;
  handleGradeFilterChange: (event: React.MouseEvent<HTMLElement>, newFilter: string) => void;
  isSmallScreen: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  statusFilter,
  majorFilter,
  gradeFilter,
  handleStatusFilterChange,
  handleMajorFilterChange,
  handleGradeFilterChange,
  isSmallScreen,
}) => {
  return (
    <Box>
      <Tabs
        value={statusFilter}
        onChange={handleStatusFilterChange}
        centered
        sx={styles.tabs}
      >
        <Tab label="همه" value="همه" />
        <Tab label="فعال" value="فعال" />
        <Tab label="رد شده" value="رد شده" />
        <Tab label="تایید شده" value="تایید شده" />
        <Tab label="لغو شده" value="لغو شده" />
      </Tabs>
      <Box sx={styles.filterSection}>
        <Box>
          <Typography
            variant="body1"
            sx={{
              mb: 1,
              fontWeight: 'bold',
              textAlign: isSmallScreen ? 'center' : 'right',
            }}
          >
            رشته
          </Typography>
          <ToggleButtonGroup
            value={majorFilter}
            exclusive
            onChange={handleMajorFilterChange}
            sx={styles.toggleButtonGroup}
          >
            <ToggleButton value="همه">همه</ToggleButton>
            <ToggleButton value="ریاضی">ریاضی</ToggleButton>
            <ToggleButton value="تجربی">تجربی</ToggleButton>
            <ToggleButton value="انسانی">انسانی</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box>
          <Typography
            variant="body1"
            sx={{
              mb: 1,
              fontWeight: 'bold',
              textAlign: isSmallScreen ? 'center' : 'right',
            }}
          >
            پایه
          </Typography>
          <ToggleButtonGroup
            value={gradeFilter}
            exclusive
            onChange={handleGradeFilterChange}
            sx={styles.toggleButtonGroup}
          >
            <ToggleButton value="همه">همه</ToggleButton>
            <ToggleButton value="پایه دهم">پایه دهم</ToggleButton>
            <ToggleButton value="پایه یازدهم">پایه یازدهم</ToggleButton>
            <ToggleButton value="پایه دوازدهم">پایه دوازدهم</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterSection;