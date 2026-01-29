import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../ui-core/Button';
import { FormControlLabel, RadioGroup, Radio, Typography, Tabs, Tab, Box, List, ListItem } from '@mui/material';

const Inspection = () => {
  const [assets, setAssets] = useState([]);
  const [locations, setLocations] = useState([]);
  const [inspectionData, setInspectionData] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [inspections, setInspections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assetsRes, locationsRes, inspectionsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/assets'),
          axios.get('http://localhost:3000/api/locations'),
          axios.get('http://localhost:3000/api/asset-inspections')
        ]);
        setAssets(assetsRes.data);
        setLocations(locationsRes.data);
        setInspections(inspectionsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const groupedAssets = locations.reduce((acc, loc) => {
    acc[loc.locations_name] = assets.filter(a => a.assets_location_id === loc.locations_location_id);
    return acc;
  }, {});

  const getLatestStatus = (assetId) => {
    const assetInspections = inspections.filter(i => i.asset_inspections_asset_id === assetId);
    const latest = assetInspections.sort((a, b) => new Date(b.asset_inspections_created_at) - new Date(a.asset_inspections_created_at))[0];
    return latest ? latest.asset_inspections_status : '';
  };

  const handleInspectionChange = (assetId, status) => {
    setInspectionData(prev => ({ ...prev, [assetId]: status }));
  };

  const handleSubmitInspection = async () => {
    try {
      const today = new Date();
      const currentDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
      const inspectionsToSubmit = Object.keys(inspectionData).map(assetId => {
        const asset = assets.find(a => a.assets_asset_id === parseInt(assetId));
        const location = locations.find(l => l.locations_location_id === asset?.assets_location_id);
        return {
          asset_inspections_asset_id: parseInt(assetId),
          asset_inspections_department: location?.locations_name || 'ไม่ระบุ',
          asset_inspections_department_id: location?.locations_location_id || 0,
          asset_inspections_inspection_date: currentDate,
          asset_inspections_status: inspectionData[assetId],
          asset_inspections_inspector_name: 'ผู้ตรวจ',
          asset_inspections_notes: ''
        };
      });
      console.log('Submitting inspections:', inspectionsToSubmit);
      for (const inspection of inspectionsToSubmit) {
        try {
          await axios.post('http://localhost:3000/api/asset-inspections', inspection);
        } catch (postError) {
          console.error('Error posting inspection:', inspection, postError);
          throw postError;
        }
      }
      alert('บันทึกการตรวจนับสำเร็จ');
      // setInspectionData({}); // Remove this to keep latest status
      // Refresh inspections
      const response = await axios.get('http://localhost:3000/api/asset-inspections');
      setInspections(response.data);
    } catch (error) {
      console.error('Error submitting inspections:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
      alert('เกิดข้อผิดพลาดในการบันทึก: ' + errorMsg);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <h1>การตรวจนับครุภัณฑ์</h1>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="หน่วยงาน">
        {Object.keys(groupedAssets).map((locationName, index) => (
          <Tab key={locationName} label={locationName} />
        ))}
      </Tabs>
      {Object.keys(groupedAssets).map((locationName, index) => (
        <TabPanel key={locationName} value={tabValue} index={index}>
          <Typography variant="h5">{locationName}</Typography>
          <List>
            {groupedAssets[locationName].map(asset => (
              <ListItem key={asset.assets_asset_id} style={{ borderBottom: '1px solid #ccc' }}>
                <div style={{ flex: 1 }}>
                  <Typography><strong>{asset.assets_asset_code} - {asset.assets_asset_name}</strong></Typography>
                </div>
                <RadioGroup
                  row
                  value={inspectionData[asset.assets_asset_id] || getLatestStatus(asset.assets_asset_id)}
                  onChange={(e) => handleInspectionChange(asset.assets_asset_id, e.target.value)}
                >
                  <FormControlLabel value="found" control={<Radio />} label="พบ" />
                  <FormControlLabel value="not_found" control={<Radio />} label="ไม่พบ" />
                  <FormControlLabel value="not_checked" control={<Radio />} label="ชำรุด" />
                </RadioGroup>
              </ListItem>
            ))}
          </List>
        </TabPanel>
      ))}
      <Button onClick={handleSubmitInspection} color="primary" style={{ marginTop: '20px' }}>บันทึกการตรวจนับ</Button>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default Inspection;
