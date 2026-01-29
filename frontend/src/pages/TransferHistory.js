import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../ui-core/Table';

const TransferHistory = () => {
  const [transfers, setTransfers] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transfersRes, locationsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/asset-transfers'),
          axios.get('http://localhost:3000/api/locations')
        ]);
        setTransfers(transfersRes.data);
        setLocations(locationsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const getLocationName = (id) => {
    const loc = locations.find(l => l.locations_location_id === id);
    return loc ? loc.locations_name : id;
  };

  return (
    <div>
      <h1>ประวัติการโอนย้ายครุภัณฑ์</h1>
      <Table
        columns={['รหัสครุภัณฑ์', 'สถานที่เดิม', 'สถานที่ใหม่', 'วันที่โอนย้าย', 'เหตุผล', 'ผู้โอนย้าย']}
        rows={transfers.map(t => [
          t.asset_transfers_asset_id,
          getLocationName(t.asset_transfers_previous_location),
          getLocationName(t.asset_transfers_new_location),
          new Date(t.asset_transfers_transfer_date).toLocaleDateString('th-TH'),
          t.asset_transfers_reason,
          t.asset_transfers_transferred_by
        ])}
      />
    </div>
  );
};

export default TransferHistory;
