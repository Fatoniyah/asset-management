import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../ui-core/Button';
import TextField from '../ui-core/TextField';
import Select from '../ui-core/Select';

const AssetForm = () => {
  const [formData, setFormData] = useState({
    assets_asset_name: '',
    assets_asset_code: '',
    assets_responsible_person: '',
    assets_location_id: '',
    assets_purchase_date: '',
    assets_purchase_price: '',
    assets_useful_life_years: ''
  });
  const [locations, setLocations] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/locations')
      .then(response => {
        setLocations(response.data.map(loc => ({ value: loc.locations_location_id, label: loc.locations_name })));
      })
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, assets_purchase_price: parseFloat(formData.assets_purchase_price), assets_useful_life_years: parseInt(formData.assets_useful_life_years), assets_supervisor_id: null, assets_status: 'active' };
    axios.post('http://localhost:3000/api/assets', data)
      .then(() => {
        setMessage('บันทึกครุภัณฑ์สำเร็จ!');
        setFormData({ assets_asset_name: '', assets_asset_code: '', assets_responsible_person: '', assets_location_id: '', assets_purchase_date: '', assets_purchase_price: '', assets_useful_life_years: '' });
      })
      .catch(error => setMessage('เกิดข้อผิดพลาด: ' + error.message));
  };

  return (
    <div>
      <h1>บันทึกครุภัณฑ์</h1>
      <form onSubmit={handleSubmit}>
        <TextField label="ชื่อครุภัณฑ์" name="assets_asset_name" value={formData.assets_asset_name} onChange={handleChange} required />
        <TextField label="รหัสครุภัณฑ์" name="assets_asset_code" value={formData.assets_asset_code} onChange={handleChange} required />
        <TextField label="ผู้รับผิดชอบ" name="assets_responsible_person" value={formData.assets_responsible_person} onChange={handleChange} required />
        <Select label="สถานที่ตั้ง" name="assets_location_id" value={formData.assets_location_id} onChange={handleChange} options={locations} required />
        <TextField label="วันที่ซื้อ" name="assets_purchase_date" type="date" value={formData.assets_purchase_date} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
        <TextField label="ราคาซื้อ" name="assets_purchase_price" type="number" step="0.01" value={formData.assets_purchase_price} onChange={handleChange} required />
        <TextField label="อายุการใช้งาน (ปี)" name="assets_useful_life_years" type="number" value={formData.assets_useful_life_years} onChange={handleChange} required />
        <Button type="submit">บันทึก</Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AssetForm;
