import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../ui-core/Button';
import Table from '../ui-core/Table';
import AssetModal from '../components/AssetModal';
import TransferModal from '../components/TransferModal';
import DepreciationModal from '../components/DepreciationModal';
import { Select, MenuItem, FormControlLabel, RadioGroup, Radio, Card, CardContent, Typography } from '@mui/material';

const AssetsList = () => {
  const [assets, setAssets] = useState([]);
  const [locations, setLocations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [depreciationModalOpen, setDepreciationModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [inspectionMode, setInspectionMode] = useState(false);
  const [inspectionData, setInspectionData] = useState({});

  const fetchAssets = () => {
    axios.get('http://localhost:3000/api/assets')
      .then(response => setAssets(response.data))
      .catch(error => console.error('Error fetching assets:', error));
  };

  const fetchLocations = () => {
    axios.get('http://localhost:3000/api/locations')
      .then(response => setLocations(response.data))
      .catch(error => console.error('Error fetching locations:', error));
  };

  const fetchDepartments = () => {
    axios.get('http://localhost:3000/api/departments')
      .then(response => setDepartments(response.data))
      .catch(error => console.error('Error fetching departments:', error));
  };

  useEffect(() => {
    fetchAssets();
    fetchLocations();
    fetchDepartments();
  }, []);

  const handleAddAsset = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleTransfer = (asset) => {
    setSelectedAsset(asset);
    setTransferModalOpen(true);
  };

  const handleTransferModalClose = () => {
    setTransferModalOpen(false);
    setSelectedAsset(null);
  };

  const handleDepreciation = (assetId) => {
    setSelectedAsset({ assets_asset_id: assetId });
    setDepreciationModalOpen(true);
  };

  const handleDepreciationModalClose = () => {
    setDepreciationModalOpen(false);
    setSelectedAsset(null);
  };

  const handleSave = () => {
    fetchAssets(); // Refresh list
  };

  const handleDelete = (id) => {
    if (window.confirm('ต้องการลบครุภัณฑ์นี้หรือไม่?')) {
      axios.delete(`http://localhost:3000/api/assets/${id}`)
        .then(() => fetchAssets())
        .catch(error => console.error('Error deleting asset:', error));
    }
  };

  const handleStatusToggle = (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'disposed' : 'active';
    axios.put(`http://localhost:3000/api/assets/${id}`, { assets_status: newStatus })
      .then(() => fetchAssets())
      .catch(error => console.error('Error updating status:', error));
  };

  const handleInspectionChange = (assetId, status) => {
    setInspectionData(prev => ({ ...prev, [assetId]: status }));
  };

  const handleSubmitInspection = () => {
    const inspections = Object.keys(inspectionData).map(assetId => ({
      asset_inspections_asset_id: parseInt(assetId),
      asset_inspections_department: 'หน่วยงานทั่วไป', // Placeholder
      asset_inspections_inspection_date: new Date().toISOString().split('T')[0],
      asset_inspections_status: inspectionData[assetId],
      asset_inspections_inspector_name: 'ผู้ตรวจ', // Placeholder
      asset_inspections_notes: ''
    }));
    Promise.all(inspections.map(i => axios.post('http://localhost:3000/api/asset-inspections', i)))
      .then(() => {
        alert('บันทึกการตรวจนับสำเร็จ');
        setInspectionMode(false);
        setInspectionData({});
      })
      .catch(error => console.error('Error submitting inspections:', error));
  };

  const groupedAssets = locations.reduce((acc, loc) => {
    acc[loc.locations_name] = assets.filter(a => a.assets_location_id === loc.locations_location_id);
    return acc;
  }, {});

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>รายการครุภัณฑ์</h1>
        <div>
          <Button onClick={() => setInspectionMode(!inspectionMode)} color="primary" style={{ marginRight: '10px' }}>
            {inspectionMode ? 'ยกเลิกการตรวจนับ' : 'เริ่มการตรวจนับ'}
          </Button>
          <Button onClick={handleAddAsset} color="success">เพิ่มครุภัณฑ์</Button>
        </div>
      </div>
      {inspectionMode ? (
        <div>
          <h2>การตรวจนับครุภัณฑ์</h2>
          {Object.keys(groupedAssets).map(locationName => (
            <Card key={locationName} style={{ marginBottom: '20px' }}>
              <CardContent>
                <Typography variant="h5">{locationName}</Typography>
                {groupedAssets[locationName].map(asset => (
                  <div key={asset.assets_asset_id} style={{ marginBottom: '10px' }}>
                    <Typography>{asset.assets_asset_code} - {asset.assets_asset_name}</Typography>
                    <RadioGroup
                      row
                      value={inspectionData[asset.assets_asset_id] || ''}
                      onChange={(e) => handleInspectionChange(asset.assets_asset_id, e.target.value)}
                    >
                      <FormControlLabel value="found" control={<Radio />} label="พบ" />
                      <FormControlLabel value="not_found" control={<Radio />} label="ไม่พบ" />
                      <FormControlLabel value="not_checked" control={<Radio />} label="ชำรุด" />
                    </RadioGroup>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
          <Button onClick={handleSubmitInspection} color="primary">บันทึกการตรวจนับ</Button>
        </div>
      ) : (
        <Table
          columns={['รหัส', 'ชื่อ', 'ผู้รับผิดชอบ', 'หน่วยงาน', 'สถานที่', 'วันที่ซื้อ', 'ราคา', 'อายุใช้งาน', 'สถานะ', 'เปลี่ยนสถานะ', 'โอนย้าย', 'คำนวณค่าเสื่อมราคา', 'การดำเนินการ']}
          rows={assets.map(a => [
            a.assets_asset_code, 
            a.assets_asset_name, 
            a.assets_responsible_person, 
            departments.find(d => d.departments_department_id === a.assets_supervisor_id)?.departments_name || a.assets_supervisor_id,
            locations.find(l => l.locations_location_id === a.assets_location_id)?.locations_name || a.assets_location_id, 
            a.assets_purchase_date ? new Date(a.assets_purchase_date).toLocaleDateString('th-TH') : '',
            a.assets_purchase_price, 
            a.assets_useful_life_years, 
            a.assets_status,
            <Button key={`status-${a.assets_asset_id}`} onClick={() => handleStatusToggle(a.assets_asset_id, a.assets_status)} color={a.assets_status === 'active' ? 'success' : 'error'} size="small" sx={{ borderRadius: '20px', minWidth: '80px' }}>
              {a.assets_status === 'active' ? 'ปิดใช้งาน' : 'เปิดใช้งาน'}
            </Button>,
            <Button key={`transfer-${a.assets_asset_id}`} onClick={() => handleTransfer(a)} size="small" sx={{ borderRadius: '20px', minWidth: '60px' }}>โอนย้าย</Button>,
            <Button key={`depreciation-${a.assets_asset_id}`} onClick={() => handleDepreciation(a.assets_asset_id)}>คำนวณค่าเสื่อมราคา</Button>,
            <Button key={`delete-${a.assets_asset_id}`} onClick={() => handleDelete(a.assets_asset_id)} color="error">ลบ</Button>
          ])}
        />
      )}
      <AssetModal open={modalOpen} onClose={handleModalClose} onSave={handleSave} />
      <TransferModal open={transferModalOpen} onClose={handleTransferModalClose} asset={selectedAsset} onSave={handleSave} />
      <DepreciationModal open={depreciationModalOpen} onClose={handleDepreciationModalClose} assetId={selectedAsset?.assets_asset_id} />
    </div>
  );
};

export default AssetsList;
