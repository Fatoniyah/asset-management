const express = require('express');
const router = express.Router();
const AssetRecommendation = require('../models/assetRecommendation');

router.get('/', (req, res) => {
  AssetRecommendation.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  AssetRecommendation.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  AssetRecommendation.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: results.insertId });
  });
});

router.put('/:id', (req, res) => {
  AssetRecommendation.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Updated' });
  });
});

router.delete('/:id', (req, res) => {
  AssetRecommendation.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Deleted' });
  });
});

module.exports = router;
