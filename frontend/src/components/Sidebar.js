import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material';

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, backgroundColor: '#1976d2', color: 'white', boxSizing: 'border-box', top: 64 } }}>
      <Toolbar />
      <List>
        <ListItem 
          component={Link} 
          to="/dashboard" 
          selected={location.pathname === '/dashboard'}
          sx={{ 
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
            color: 'white'
          }}
        >
          <ListItemText primary="Dashboard" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem 
          component={Link} 
          to="/assets" 
          selected={location.pathname === '/assets'}
          sx={{ 
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
            color: 'white'
          }}
        >
          <ListItemText primary="ครุภัณฑ์" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem 
          component={Link} 
          to="/transfer-history" 
          selected={location.pathname === '/transfer-history'}
          sx={{ 
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
            color: 'white'
          }}
        >
          <ListItemText primary="ประวัติการโอนย้าย" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem 
          component={Link} 
          to="/annual-inspection-report" 
          selected={location.pathname === '/annual-inspection-report'}
          sx={{ 
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
            color: 'white'
          }}
        >
          <ListItemText primary="รายงานการตรวจนับครุภัณฑ์ประจำปี" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem 
          component={Link} 
          to="/inspection" 
          selected={location.pathname === '/inspection'}
          sx={{ 
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
            color: 'white'
          }}
        >
          <ListItemText primary="การตรวจนับครุภัณฑ์" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem 
          component={Link} 
          to="/ai-analysis" 
          selected={location.pathname === '/ai-analysis'}
          sx={{ 
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            '&.Mui-selected': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
            color: 'white'
          }}
        >
          <ListItemText primary="AI วิเคราะห์ครุภัณฑ์" sx={{ color: 'white' }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
