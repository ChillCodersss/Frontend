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
  // isSmallScreen,
}) => {
  return (
    <Box>
      <Tabs
        value={statusFilter}
        onChange={handleStatusFilterChange}
        centered
        variant="scrollable"
        scrollButtons="auto"
        sx={styles.tabs}
      >
        <Tab label="فعال" value="فعال" />
        <Tab label="رد شده" value="رد شده" />
        <Tab label="تایید شده" value="تایید شده" />
        <Tab label="لغو شده" value="لغو شده" />
        <Tab label="همه" value="همه" />
      </Tabs>
      <Box sx={styles.filterSection}>
        <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold', textAlign: 'right', fontSize: '0.9rem' }}>
            رشته
          </Typography>
          <ToggleButtonGroup
            value={majorFilter}
            exclusive
            onChange={handleMajorFilterChange}
            sx={styles.toggleButtonGroup}
          >
            <ToggleButton value="همه" aria-label="همه رشته‌ها">همه</ToggleButton>
            <ToggleButton value="ریاضی" aria-label="رشته ریاضی">ریاضی</ToggleButton>
            <ToggleButton value="تجربی" aria-label="رشته تجربی">تجربی</ToggleButton>
            <ToggleButton value="انسانی" aria-label="رشته انسانی">انسانی</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ width: { xs: '100%', sm: 'auto' }, mt: { xs: 2, sm: 0 } }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold', textAlign: 'right', fontSize: '0.9rem' }}>
            پایه
          </Typography>
          <ToggleButtonGroup
            value={gradeFilter}
            exclusive
            onChange={handleGradeFilterChange}
            sx={styles.toggleButtonGroup}
          >
            <ToggleButton value="همه" aria-label="همه پایه‌ها">همه</ToggleButton>
            <ToggleButton value="پایه دهم" aria-label="پایه دهم">پایه دهم</ToggleButton>
            <ToggleButton value="پایه یازدهم" aria-label="پایه یازدهم">پایه یازدهم</ToggleButton>
            <ToggleButton value="پایه دوازدهم" aria-label="پایه دوازدهم">پایه دوازدهم</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterSection;