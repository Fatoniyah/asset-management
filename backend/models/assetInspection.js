const db = require('../db');

class AssetInspection {
  static getAll(callback) {
    db.query('SELECT * FROM AssetInspections', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM AssetInspections WHERE asset_inspections_inspection_id = ?', [id], callback);
  }

  static create(data, callback) {
    db.query('INSERT INTO AssetInspections SET ?', data, callback);
  }

  static update(id, data, callback) {
    db.query('UPDATE AssetInspections SET ? WHERE asset_inspections_inspection_id = ?', [data, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM AssetInspections WHERE asset_inspections_inspection_id = ?', [id], callback);
  }
}

module.exports = AssetInspection;
