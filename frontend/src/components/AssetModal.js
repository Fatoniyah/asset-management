import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Button from '../ui-core/Button';
import TextField from '../ui-core/TextField';
import Select from '../ui-core/Select';

const AssetModal = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    assets_asset_name: '',
    assets_asset_code: '',
    assets_responsible_person: '',
    assets_supervisor_id: '',
    assets_location_id: '',
    assets_purchase_date: '',
    assets_purchase_price: '',
    assets_useful_life_years: ''
  });
  const [locations, setLocations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locationsRes, departmentsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/locations'),
          axios.get('http://localhost:3000/api/departments') // Assuming backend has this route
        ]);
        setLocations(locationsRes.data.map(loc => ({ value: loc.locations_location_id, label: loc.locations_name })));
        setDepartments(departmentsRes.data.map(dep => ({ value: dep.departments_department_id, label: dep.departments_name })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    // Auto-generate random unique asset code
    const generateUniqueCode = async () => {
      let newCode;
      let isUnique = false;
      const existingCodes = (await axios.get('http://localhost:3000/api/assets')).data.map(a => a.assets_asset_code);
      while (!isUnique) {
        newCode = 'AS' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        isUnique = !existingCodes.includes(newCode);
      }
      setFormData(prev => ({ ...prev, assets_asset_code: newCode }));
    };
    generateUniqueCode();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, assets_purchase_price: parseFloat(formData.assets_purchase_price), assets_useful_life_years: parseInt(formData.assets_useful_life_years), assets_supervisor_id: parseInt(formData.assets_supervisor_id), assets_status: 'active' };
    axios.post('http://localhost:3000/api/assets', data)
      .then(() => {
        setMessage('บันทึกครุภัณฑ์สำเร็จ!');
        setFormData({ assets_asset_name: '', assets_asset_code: '', assets_responsible_person: '', assets_supervisor_id: '', assets_location_id: '', assets_purchase_date: '', assets_purchase_price: '', assets_useful_life_years: '' });
        onSave();
        onClose();
      })
      .catch(error => setMessage('เกิดข้อผิดพลาด: ' + error.message));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>เพิ่มครุภัณฑ์</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField label="ชื่อครุภัณฑ์" name="assets_asset_name" value={formData.assets_asset_name} onChange={handleChange} required fullWidth margin="normal" />
          <TextField label="รหัสครุภัณฑ์" name="assets_asset_code" value={formData.assets_asset_code} InputProps={{ readOnly: true }} fullWidth margin="normal" />
          <TextField label="ผู้รับผิดชอบ" name="assets_responsible_person" value={formData.assets_responsible_person} onChange={handleChange} required fullWidth margin="normal" />
          <Select label="แผนกผู้ดูแล" name="assets_supervisor_id" value={formData.assets_supervisor_id} onChange={handleChange} options={departments} required fullWidth margin="normal" />
          <Select label="สถานที่ตั้ง" name="assets_location_id" value={formData.assets_location_id} onChange={handleChange} options={locations} required fullWidth margin="normal" />
          <TextField label="วันที่ซื้อ" name="assets_purchase_date" type="date" value={formData.assets_purchase_date} onChange={handleChange} required fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
          <TextField label="ราคาซื้อ" name="assets_purchase_price" type="number" step="0.01" value={formData.assets_purchase_price} onChange={handleChange} required fullWidth margin="normal" />
          <TextField label="อายุการใช้งาน (ปี)" name="assets_useful_life_years" type="number" value={formData.assets_useful_life_years} onChange={handleChange} required fullWidth margin="normal" />
        </form>
        {message && <p>{message}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ยกเลิก</Button>
        <Button onClick={handleSubmit}>บันทึก</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssetModal;
