import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

const TextField = (props) => {
  return <MuiTextField variant="outlined" fullWidth {...props} />;
};

export default TextField;
