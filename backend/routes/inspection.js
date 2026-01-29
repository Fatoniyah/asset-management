const express = require('express');
const router = express.Router();
const AssetInspection = require('../models/assetInspection');

router.get('/', (req, res) => {
  AssetInspection.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  AssetInspection.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: results.insertId });
  });
});

module.exports = router;
