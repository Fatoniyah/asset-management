import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Button from '../ui-core/Button';
import Card from '../ui-core/Card';

const DepreciationModal = ({ open, onClose, assetId }) => {
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    if (assetId && open) {
      axios.get('http://localhost:3000/api/assets')
        .then(response => {
          const foundAsset = response.data.find(a => a.assets_asset_id === assetId);
          setAsset(foundAsset);
        })
        .catch(error => console.error('Error fetching asset:', error));
    }
  }, [assetId, open]);

  const calculateDepreciation = () => {
    if (!asset) return null;
    const purchaseYear = new Date(asset.assets_purchase_date).getFullYear();
    const currentYear = new Date().getFullYear();
    const yearsUsed = currentYear - purchaseYear;
    const annualDepreciation = asset.assets_purchase_price / asset.assets_useful_life_years;
    const accumulatedDepreciation = annualDepreciation * yearsUsed;
    const remainingValue = asset.assets_purchase_price - accumulatedDepreciation;
    return {
      yearsUsed,
      annualDepreciation,
      accumulatedDepreciation,
      remainingValue,
      calculationDate: new Date().toISOString().split('T')[0]
    };
  };

  const calc = calculateDepreciation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>คำนวณค่าเสื่อมราคา - {asset?.assets_asset_code} {asset?.assets_asset_name}</DialogTitle>
      <DialogContent>
        {asset && calc && (
          <div>
            <h3>ข้อมูลครุภัณฑ์</h3>
            <p><strong>ราคาซื้อ:</strong> {asset.assets_purchase_price} บาท</p>
            <p><strong>อายุใช้งาน:</strong> {asset.assets_useful_life_years} ปี</p>
            <p><strong>สถานะ:</strong> {asset.assets_status}</p>
            <h3>ผลการคำนวณค่าเสื่อมราคา</h3>
            <p><strong>สูตรค่าเสื่อมราคาแบบเส้นตรง:</strong> ค่าเสื่อมต่อปี = ราคาซื้อ / อายุการใช้งาน</p>
            <Card style={{ marginTop: '20px' }}>
              <p><strong>วันที่คำนวณ:</strong> {calc.calculationDate}</p>
              <p><strong>ปีที่ใช้ไป:</strong> {calc.yearsUsed} ปี</p>
              <p><strong>ค่าเสื่อมต่อปี:</strong> {calc.annualDepreciation.toFixed(2)} บาท</p>
              <p><strong>ค่าเสื่อมสะสม:</strong> {calc.accumulatedDepreciation.toFixed(2)} บาท</p>
              <p><strong>มูลค่าที่เหลือ:</strong> {calc.remainingValue.toFixed(2)} บาท</p>
            </Card>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ปิด</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DepreciationModal;
