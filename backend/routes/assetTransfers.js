const express = require('express');
const router = express.Router();
const AssetTransfer = require('../models/assetTransfer');

router.get('/', (req, res) => {
  AssetTransfer.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  AssetTransfer.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  AssetTransfer.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: results.insertId });
  });
});

router.put('/:id', (req, res) => {
  AssetTransfer.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Updated' });
  });
});

router.delete('/:id', (req, res) => {
  AssetTransfer.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Deleted' });
  });
});

module.exports = router;
