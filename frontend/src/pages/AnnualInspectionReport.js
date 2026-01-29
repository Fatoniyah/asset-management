import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../ui-core/Card';
import Table from '../ui-core/Table';
import { Tabs, Tab, Box } from '@mui/material';

const AnnualInspectionReport = () => {
  const [inspections, setInspections] = useState([]);
  const [assets, setAssets] = useState([]);
  const [locations, setLocations] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inspectionsRes, assetsRes, locationsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/asset-inspections'),
          axios.get('http://localhost:3000/api/assets'),
          axios.get('http://localhost:3000/api/locations')
        ]);
        setInspections(inspectionsRes.data);
        setAssets(assetsRes.data);
        setLocations(locationsRes.data);
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

  const getLatestInspection = (assetId) => {
    const assetInspections = inspections.filter(i => i.asset_inspections_asset_id === assetId);
    return assetInspections.sort((a, b) => new Date(b.asset_inspections_created_at) - new Date(a.asset_inspections_created_at))[0];
  };

  const getStatusInThai = (status) => {
    switch (status) {
      case 'found': return 'พบ';
      case 'not_found': return 'ไม่พบ';
      case 'not_checked': return 'ชำรุด';
      default: return 'N/A';
    }
  };

  const getSummary = (assets) => {
    const summary = { found: 0, not_found: 0, damaged: 0 };
    assets.forEach(asset => {
      const latest = getLatestInspection(asset.assets_asset_id);
      if (latest) {
        if (latest.asset_inspections_status === 'found') summary.found++;
        else if (latest.asset_inspections_status === 'not_found') summary.not_found++;
        else if (latest.asset_inspections_status === 'not_checked') summary.damaged++;
      }
    });
    return summary;
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <h1>รายงานการตรวจนับครุภัณฑ์ประจำปี</h1>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="หน่วยงาน">
        {Object.keys(groupedAssets).map((locationName, index) => (
          <Tab key={locationName} label={locationName} />
        ))}
      </Tabs>
      {Object.keys(groupedAssets).map((locationName, index) => (
        <TabPanel key={locationName} value={tabValue} index={index}>
          <div>
            <h3>สรุปสถานะการตรวจนับ</h3>
            {(() => {
              const summary = getSummary(groupedAssets[locationName]);
              return (
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                  <div style={{ background: '#e3f2fd', padding: '10px', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
                    <strong>พบ</strong><br />{summary.found}
                  </div>
                  <div style={{ background: '#ffebee', padding: '10px', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
                    <strong>ไม่พบ</strong><br />{summary.not_found}
                  </div>
                  <div style={{ background: '#fff3e0', padding: '10px', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
                    <strong>ชำรุด</strong><br />{summary.damaged}
                  </div>
                </div>
              );
            })()}
            <Table
              columns={['รหัสครุภัณฑ์', 'ชื่อครุภัณฑ์', 'วันที่ตรวจล่าสุด', 'สถานะล่าสุด', 'ผู้ตรวจ', 'หมายเหตุ']}
              rows={groupedAssets[locationName].map(asset => {
                const latest = getLatestInspection(asset.assets_asset_id);
                return [
                  asset.assets_asset_code,
                  asset.assets_asset_name,
                  latest ? new Date(latest.asset_inspections_inspection_date).toLocaleDateString('th-TH') : 'ยังไม่ได้ตรวจ',
                  latest ? getStatusInThai(latest.asset_inspections_status) : 'N/A',
                  latest ? latest.asset_inspections_inspector_name : 'N/A',
                  latest ? latest.asset_inspections_notes : 'N/A'
                ];
              })}
            />
          </div>
        </TabPanel>
      ))}
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

export default AnnualInspectionReport;
