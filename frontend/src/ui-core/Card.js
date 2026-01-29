import React from 'react';
import { Card as MuiCard, CardContent } from '@mui/material';

const Card = ({ children, ...props }) => {
  return (
    <MuiCard {...props}>
      <CardContent>{children}</CardContent>
    </MuiCard>
  );
};

export default Card;
