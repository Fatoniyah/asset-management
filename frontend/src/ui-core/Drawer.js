import React from 'react';
import { Drawer as MuiDrawer, List, ListItem, ListItemText } from '@mui/material';

const Drawer = ({ open, onClose, children }) => {
  return (
    <MuiDrawer open={open} onClose={onClose}>
      <List>
        {children}
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
