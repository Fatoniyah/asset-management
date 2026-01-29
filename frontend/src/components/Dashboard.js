import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../ui-core/Card';
import Table from '../ui-core/Table';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalAssets: 0, activeAssets: 0, damagedAssets: 0 });
  const [recentInspections, setRecentInspections] = useState([]);
  const [recentTransfers, setRecentTransfers] = useState([]);

  useEffect(() => {
    // Fetch asset stats
    axios.get('http://localhost:3000/api/assets')
      .then(response => {
        const assets = response.data;
        setStats({
          totalAssets: assets.length,
          activeAssets: assets.filter(a => a.assets_status === 'active').length,
          damagedAssets: assets.filter(a => a.assets_status === 'damaged').length
        });
      })
      .catch(error => console.error('Error fetching assets:', error));

    // Fetch recent inspections
    axios.get('http://localhost:3000/api/asset-inspections')
      .then(response => {
        setRecentInspections(response.data.slice(-5)); // Last 5
      })
      .catch(error => console.error('Error fetching inspections:', error));

    // Fetch recent transfers
    axios.get('http://localhost:3000/api/asset-transfers')
      .then(response => {
        setRecentTransfers(response.data.slice(-5)); // Last 5
      })
      .catch(error => console.error('Error fetching transfers:', error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard บริหารจัดการครุภัณฑ์</h1>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <Card style={{ flex: 1 }}>
          <h3>ครุภัณฑ์ทั้งหมด</h3>
          <p>{stats.totalAssets}</p>
        </Card>
        <Card style={{ flex: 1 }}>
          <h3>ครุภัณฑ์ใช้งานได้</h3>
          <p>{stats.activeAssets}</p>
        </Card>
        <Card style={{ flex: 1 }}>
          <h3>ครุภัณฑ์เสียหาย</h3>
          <p>{stats.damagedAssets}</p>
        </Card>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h3>การตรวจสอบล่าสุด</h3>
          <Table
            columns={['ครุภัณฑ์', 'วันที่', 'สถานะ']}
            rows={recentInspections.map(i => [i.asset_inspections_asset_id, i.asset_inspections_inspection_date, i.asset_inspections_status])}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h3>การโอนย้ายล่าสุด</h3>
          <Table
            columns={['ครุภัณฑ์', 'จาก', 'ไป', 'วันที่']}
            rows={recentTransfers.map(t => [t.asset_transfers_asset_id, t.asset_transfers_previous_location, t.asset_transfers_new_location, t.asset_transfers_transfer_date])}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
