import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../ui-core/Card';

const Depreciation = () => {
  const [depreciations, setDepreciations] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [depreciationsRes, assetsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/asset-depreciations'),
          axios.get('http://localhost:3000/api/assets')
        ]);
        setDepreciations(depreciationsRes.data);
        setAssets(assetsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const getAssetInfo = (id) => {
    const asset = assets.find(a => a.assets_asset_id === id);
    return asset ? { code: asset.assets_asset_code, name: asset.assets_asset_name, price: asset.assets_purchase_price, life: asset.assets_useful_life_years, status: asset.assets_status } : {};
  };

  return (
    <div>
      <h1>คำนวณค่าเสื่อมราคา</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {depreciations.map(d => {
          const assetInfo = getAssetInfo(d.asset_depreciation_asset_id);
          return (
            <Card key={d.asset_depreciation_depreciation_id} style={{ minWidth: '300px' }}>
              <h3>{assetInfo.code} - {assetInfo.name}</h3>
              <p><strong>ราคาซื้อ:</strong> {assetInfo.price} บาท</p>
              <p><strong>อายุใช้งาน:</strong> {assetInfo.life} ปี</p>
              <p><strong>สถานะ:</strong> {assetInfo.status}</p>
              <p><strong>วันที่คำนวณ:</strong> {d.asset_depreciation_calculation_date}</p>
              <p><strong>ค่าเสื่อมราคาประจำปี:</strong> {d.asset_depreciation_annual_depreciation} บาท</p>
              <p><strong>มูลค่าที่เหลือ:</strong> {d.asset_depreciation_remaining_value} บาท</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Depreciation;
