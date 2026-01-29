import React from 'react';
import { Select as MuiSelect, MenuItem, FormControl, InputLabel } from '@mui/material';

const Select = ({ label, options, ...props }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <MuiSelect {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
