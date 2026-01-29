import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Button from '../ui-core/Button';
import TextField from '../ui-core/TextField';
import Select from '../ui-core/Select';

const TransferModal = ({ open, onClose, asset, onSave }) => {
  const [formData, setFormData] = useState({
    new_responsible_person: asset?.assets_responsible_person || '',
    new_location_id: asset?.assets_location_id || '',
    transfer_reason: ''
  });
  const [locations, setLocations] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (asset) {
      setFormData({
        new_responsible_person: asset.assets_responsible_person,
        new_location_id: asset.assets_location_id,
        transfer_reason: ''
      });
    }
    axios.get('http://localhost:3000/api/locations')
      .then(response => {
        setLocations(response.data.map(loc => ({ value: loc.locations_location_id, label: loc.locations_name })));
      })
      .catch(error => console.error('Error fetching locations:', error));
  }, [asset]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLocationName = locations.find(l => l.value === parseInt(formData.new_location_id))?.label || formData.new_location_id;
    const previousLocationName = locations.find(l => l.value === asset.assets_location_id)?.label || asset.assets_location_id;
    // Update asset
    axios.put(`http://localhost:3000/api/assets/${asset.assets_asset_id}`, {
      assets_responsible_person: formData.new_responsible_person,
      assets_location_id: parseInt(formData.new_location_id)
    })
    .then(() => {
      // Create transfer log
      return axios.post('http://localhost:3000/api/asset-transfers', {
        asset_transfers_asset_id: asset.assets_asset_id,
        asset_transfers_previous_location: previousLocationName,
        asset_transfers_new_location: newLocationName,
        asset_transfers_transfer_date: new Date().toISOString().split('T')[0],
        asset_transfers_reason: formData.transfer_reason,
        asset_transfers_transferred_by: 'User' // Placeholder
      });
    })
    .then(() => {
      setMessage('โอนย้ายสำเร็จ!');
      onSave();
      onClose();
    })
    .catch(error => setMessage('เกิดข้อผิดพลาด: ' + error.message));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>โอนย้ายครุภัณฑ์</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField label="ผู้รับผิดชอบใหม่" name="new_responsible_person" value={formData.new_responsible_person} onChange={handleChange} required fullWidth margin="normal" />
          <Select label="สถานที่ใหม่" name="new_location_id" value={formData.new_location_id} onChange={handleChange} options={locations} required fullWidth margin="normal" />
          <TextField label="เหตุผลการโอนย้าย" name="transfer_reason" value={formData.transfer_reason} onChange={handleChange} fullWidth margin="normal" />
        </form>
        {message && <p>{message}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ยกเลิก</Button>
        <Button onClick={handleSubmit}>โอนย้าย</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransferModal;
