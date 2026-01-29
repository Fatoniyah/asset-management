import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../ui-core/Table';
import Button from '../ui-core/Button';

const AiAnalysis = () => {
  const [assets, setAssets] = useState([]);
  const [analyses, setAnalyses] = useState({});
  const [loadingIds, setLoadingIds] = useState({}); // ใช้ฟีดแบกตอนกำลังเรียก AI

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/assets')
      .then((response) => setAssets(response.data))
      .catch((error) => console.error('Error fetching assets:', error));
  }, []);

  const handleAnalyze = async (assetId) => {
    const asset = assets.find((a) => a.assets_asset_id === assetId);
    if (!asset) return;

    // set loading
    setLoadingIds((prev) => ({ ...prev, [assetId]: true }));

    try {
      // Mock AI analysis in frontend
      let mockAnalysis = `ครุภัณฑ์ ${asset.assets_asset_name} มีอายุ ${asset.assets_useful_life_years} ปี และราคาซื้อ ${asset.assets_purchase_price} บาท.`;
      if (asset.assets_useful_life_years > 5) {
        mockAnalysis += ' แนะนำให้พิจารณาเปลี่ยนใหม่.';
      } else {
        mockAnalysis += ' สามารถใช้งานต่อได้.';
      }

      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setAnalyses((prev) => ({ ...prev, [assetId]: mockAnalysis }));
    } catch (error) {
      console.error('Error analyzing:', error);
      setAnalyses((prev) => ({
        ...prev,
        [assetId]: 'ไม่สามารถวิเคราะห์ได้',
      }));
    } finally {
      setLoadingIds((prev) => ({ ...prev, [assetId]: false }));
    }
  };

  return (
    <div>
      <h1>AI วิเคราะห์ครุภัณฑ์</h1>
      <Table
        columns={[
          'รหัส',
          'ชื่อ',
          'อายุการใช้งาน (ปี)',
          'ราคาซื้อ',
          'สถานะ',
          'วิเคราะห์ AI',
          'คำแนะนำ AI',
        ]}
        rows={assets.map((asset) => [
          asset.assets_asset_code,
          asset.assets_asset_name,
          asset.assets_useful_life_years,
          asset.assets_purchase_price,
          asset.assets_status,
          <Button
            key={asset.assets_asset_id}
            onClick={() => handleAnalyze(asset.assets_asset_id)}
            size="small"
            disabled={!!loadingIds[asset.assets_asset_id]}
          >
            {loadingIds[asset.assets_asset_id] ? 'กำลังวิเคราะห์...' : 'วิเคราะห์'}
          </Button>,
          analyses[asset.assets_asset_id] || 'ยังไม่ได้วิเคราะห์',
        ])}
      />
    </div>
  );
};

export default AiAnalysis;
