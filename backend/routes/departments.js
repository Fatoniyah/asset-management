const express = require('express');
const router = express.Router();
const Department = require('../models/department');

router.get('/', (req, res) => {
  Department.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  Department.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  Department.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: results.insertId });
  });
});

router.put('/:id', (req, res) => {
  Department.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Updated' });
  });
});

router.delete('/:id', (req, res) => {
  Department.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Deleted' });
  });
});

module.exports = router;
